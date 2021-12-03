import HttpResponseCode from '@/classes/HttpResponseCode';
import KeycloakUserQuery from '@/classes/KeycloakUserQuery';
import { KEYCLOAK_CLIENT_ID } from '@/config/keycloak-config';
import AdminController from '@/controllers/AdminController';
import KeycloakService from '@/services/keycloak/KeycloakService';
import { INewGroup, INewUser } from '@/types/admin/User';
import { Response } from 'node-fetch';
import { promises as fs } from 'fs';
import { MigrationConfigManager } from './utils/config';

const EXPORTED_USERS_FILE_NAME = '/tmp/keycloak-users.csv';
const MIGRATION_NAME = 'import-legacy-users';
const USER_TABLE_NAME = 'eaasi_user';
const USER_ID_COLUMN_NAME = 'userId';

const TABLES_TO_UPDATE = [
	'bookmark',
	'user_imported_content',
	'user_imported_software',
	'user_imported_environment',
	'user_imported_image',
];

const TABLES_TO_REMOVE = [
	'eaasi_user_hash',
	USER_TABLE_NAME,
];

interface OrganizationConfig {
	tenant_id: string;
	orgname: string;
}

interface MigrationConfig {
	name: string;
	args: OrganizationConfig;
}

async function getLegacyUsers(queryInterface, table: string): Promise<any[]> {
	const sql = 'SELECT * FROM ' + table + ';';
	const { 0: users } = await queryInterface.sequelize.query(sql);
	return users.sort((a, b) => a.id - b.id);
}

// Response handler required by KeycloakService's interface
async function handler(response: Response): Promise<Response> {
	const emptycodes = [
		HttpResponseCode.CREATED,
		HttpResponseCode.NO_CONTENT,
		HttpResponseCode.NOT_FOUND
	];

	if (emptycodes.includes(response.status)) {
		return null;
	}

	if (!response.ok) {
		const error = await response.json();
		throw new Error(response.status + ': ' + error.errorMessage);
	}

	return await response.json();
}

async function getAccessToken(keycloak: KeycloakService): Promise<string> {
	const KEYCLOAK_ADMIN_USERNAME = process.env.KEYCLOAK_ADMIN_USERNAME;
	const KEYCLOAK_ADMIN_PASSWORD = process.env.KEYCLOAK_ADMIN_PASSWORD;
	if (!KEYCLOAK_ADMIN_USERNAME || !KEYCLOAK_ADMIN_PASSWORD) {
		throw new Error('Admin credentials for Keycloak are not configured!');
	}

	console.info('Fetching access-token for "' + KEYCLOAK_ADMIN_USERNAME + '"...');
	for (let attempt = 0; attempt < 24; ++attempt) {
		try {
			const tokens = await keycloak.getUserTokens(KEYCLOAK_ADMIN_USERNAME, KEYCLOAK_ADMIN_PASSWORD);
			console.info('Fetched access-token will expire in ' + tokens.expires_in + ' second(s)');
			return tokens.access_token;
		}
		catch (error) {
			// Keycloak server may not be ready yet, simply wait and retry again!
			console.warn(error.name + ': ' + error.message);
			console.warn('Fetching access-token failed! Retrying...');
			await new Promise(resolver => setTimeout(resolver, 5000));
		}
	}

	throw new Error('Fetching access-token failed after multiple attempts!');
}

async function getOrCreateGroup(keycloak: KeycloakService, token: string, config: OrganizationConfig) {
	let group = await keycloak.getGroup(config.tenant_id, token, handler);
	if (!group) {
		const payload: INewGroup = {
			name: config.tenant_id,
			attributes: {
				tid: [config.tenant_id],
				orgname: [config.orgname]
			},
		};

		await keycloak.createGroup(payload, token, handler);
		group = await keycloak.getGroup(config.tenant_id, token, handler);
		console.info('Group created: ' + group.name + ' (' + config.orgname + ')');
	}
	else {
		console.info('Group already exists: ' + group.name + ' (' + config.orgname + ')');
	}

	return group;
}

async function assignClientRole(keycloak: KeycloakService, token: string, uid: string, rolename: string) {
	const client = await keycloak.getClient(KEYCLOAK_CLIENT_ID, token, handler);
	const roles = await keycloak.getClientRoles(client.id, token, handler);
	const role = roles.find(role => role.name === rolename);
	await keycloak.assignClientRoles(client.id, uid, [role], token, handler);
}

async function assignRealmRole(keycloak: KeycloakService, token: string, uid: string, rolename: string) {
	const roles = await keycloak.getRealmRoles(token, handler);
	const role = roles.find(role => role.name === rolename);
	await keycloak.assignRealmRoles(uid, [role], token, handler);
}

async function getOrCreateUser(keycloak: KeycloakService, token: string, olduser: any, group: any) {
	const query = new KeycloakUserQuery();
	query.username = olduser.username;

	// Look up existing or create new user...
	let newuser = (await keycloak.findUsers(query, token, handler))
			.find(entry => entry.username == olduser.username);

	const password = AdminController.generatePassword();
	if (!newuser) {
		const payload: INewUser = {
			enabled: true,
			username: olduser.username,
			firstName: olduser.firstName,
			lastName: olduser.lastName,
			email: olduser.email,
			credentials: [{
				type: 'password',
				value: password,
				temporary: true,
			}],
		};

		await keycloak.createUser(payload, token, handler);
		newuser = (await keycloak.findUsers(query, token, handler))[0];
		if (!newuser) {
			throw new Error('Creating user "' + olduser.username + '" failed!');
		}

		console.info('--> User created: ' + olduser.id + ' -> ' + newuser.id);
	}
	else {
		await keycloak.resetUserPassword(newuser.id, password, token, handler);
		console.info('--> User exists:  ' + olduser.id + ' -> ' + newuser.id);
	}

	newuser.password = password;

	// Assign realm- and client-roles...
	const role = (olduser.roleId == 1) ? 'eaas-admin' : 'eaas-user';
	await assignClientRole(keycloak, token, newuser.id, role);
	if (role == 'eaas-admin') {
		await assignRealmRole(keycloak, token, newuser.id, 'admin');
	}

	// Add user to organization...
	await keycloak.addUserToGroup(newuser.id, group.id, token, handler);

	return newuser;
}

async function updateUserIdsInTable(queryInterface, txn, table: string, uids: Map<string, string>) {
	console.info('Updating user-ids in table "' + table + '"...');
	const { 0: records } = await queryInterface.sequelize.query('SELECT * FROM ' + table + ';');
	if (!records || records.length == 0) {
		console.info('--> No records found! Nothing to update.')
		return;
	}

	let numUpdatedIds = 0, numSkippedIds = 0;

	// Remap old to new IDs first...
	for (const record of records) {
		const newid = uids.get(record.userId.toString());
		if (newid) {
			record.userId = newid;
			++numUpdatedIds;
		}
		else {
			++numSkippedIds;
		}
	}

	const options = {
		transaction: txn,
		upsertKeys: [
			'id',
		],
		updateOnDuplicate: [
			USER_ID_COLUMN_NAME,
		],
	};

	// Update table's records...
	await queryInterface.bulkInsert(table, records, options);
	console.info('--> Updated ' + numUpdatedIds + ' user-id(s), skipped ' + numSkippedIds);
}

async function exportUsersToFile(users: any[], filename: string) {
	console.info('Exporting created users to: ' + filename);
	const output = await fs.open(filename, 'w');
	try {
		await output.write('username,email,password\n');
		users.forEach(async (u) => await output.write(`${u.username},${u.email},${u.password}\n`));
	}
	finally {
		await output.close();
	}
}


export default {
	up: async (queryInterface, Sequelize) => {
		const tables = await queryInterface.showAllTables();
		if (!tables.includes(USER_TABLE_NAME)) {
			console.info('No legacy table "' + USER_TABLE_NAME + '" found! Nothing to migrate.');
			return;
		}

		const oldusers = await getLegacyUsers(queryInterface, USER_TABLE_NAME);
		if (oldusers.length == 0) {
			console.info('No legacy users found! Nothing to migrate.');
			console.info('Dropping table "' + USER_TABLE_NAME + '"...');
			return await queryInterface.dropTable(USER_TABLE_NAME);
		}

		console.info('Found ' + oldusers.length + ' legacy users! Preparing migration...');

		const migration: MigrationConfig = await MigrationConfigManager.load(MIGRATION_NAME);
		if (!migration || !migration.args) {
			throw new Error('Config is missing or invalid!');
		}

		const DataTypes = Sequelize.DataTypes;
		const keycloak = new KeycloakService();
		const config: OrganizationConfig = migration.args;
		const token = 'Bearer ' + await getAccessToken(keycloak);
		const group = await getOrCreateGroup(keycloak, token, config);

		return queryInterface.sequelize.transaction(async (txn) => {
			const uids = new Map<string, string>();  // old-uid -> new-uid
			const newusers = [];

			console.info('Importing legacy users into Keycloak...');
			for (const olduser of oldusers) {
				const newuser = await getOrCreateUser(keycloak, token, olduser, group);
				uids.set(olduser.id.toString(), newuser.id);
				newusers.push(newuser);
			}

			console.info('Imported ' + newusers.length + ' legacy user(s)');

			const options = {
				transaction: txn,
			};

			// Update all other tables with new user IDs...
			for (const table of TABLES_TO_UPDATE) {
				if (!tables.includes(table)) {
					console.info('Table "' + table + '" not found! Skipping it.');
					continue;
				}

				await queryInterface.changeColumn(table, USER_ID_COLUMN_NAME, DataTypes.STRING(50));
				await updateUserIdsInTable(queryInterface, txn, table, uids);
			}

			// Remove legacy tables...
			for (const table of TABLES_TO_REMOVE) {
				console.info('Dropping legacy table "' + table + '"...');
				await queryInterface.dropTable(table, options);
			}

			// Export re-created users and new passwords...
			await exportUsersToFile(newusers, EXPORTED_USERS_FILE_NAME);
		});
	},
	down: async () => {
		throw new Error('Reverting is currently not supported!');
	}
};
