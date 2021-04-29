import {IEnvironment} from '@/types/Resource';
import faker from 'faker';
import {IEaasiRole, IEaasiUser} from 'eaasi-admin';
import User from '@/models/admin/User';
import { resourceTypes, archiveTypes } from '@/utils/constants';

export function generateFakeUsers(userCount: number) : User[] {
	let users = [];
	for (let i = 1; i <= userCount; i++) {
		users.push({
			id: faker.random.number(),
			firstName: faker.name.firstName(),
			username: faker.hacker.adjective() + '_' + faker.hacker.noun(),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
			lastLogin: faker.date.recent()
		});
	}

	return users;
}

export function generateFakeUser(): IEaasiUser {
	return generateFakeUsers(1)[0];
}

export function generateFakeRoles(roleCount: number) : IEaasiRole[] {
	let roles = [];
	for (let i = 1; i <= roleCount; i++) {
		roles.push({
			id: faker.random.number(),
			roleName: faker.hacker.noun(),
			roleDescription: faker.random.words(),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent()
		});
	}
	return roles;
}

export function generateFakeRole(): IEaasiRole {
	return generateFakeRoles(1)[0];
}


export function generateFakeEnvironments(numberEnvs: number, envType?: string): IEnvironment[] {
	let envs = [];
	for (let i = 1; i <= numberEnvs; i++) {
		envs.push(
			{
				archive: archiveTypes.DEFAULT,
				author: faker.name.firstName(),
				branches: [],
				canProcessAdditionalFiles: false,
				childrenEnvIds: [],
				connectEnvs: false,
				containerName:faker.hacker.noun(),
				containerVersion: faker.system.semver(),
				description: faker.hacker.adjective(),
				drives: [],
				emulator: 'fakeEmu',
				enableInternet: false,
				enablePrinting: false,
				enableRelativeMouse: false,
				enableSocks: false,
				envId: faker.random.uuid(),
				envType: envType ? envType : faker.hacker.noun(),
				gwPrivateIp: undefined,
				gwPrivateMask: undefined,
				helpText: faker.hacker.verb(),
				id: undefined,
				installedSoftwareIds: [],
				isPublic: false,
				localServerMode: false,
				nativeConfig: '',
				networking: undefined,
				os: 'fakeOS',
				owner: 'fakeOwner',
				parentEnvId: faker.random.uuid(),
				permissions: undefined,
				resourceType: resourceTypes.ENVIRONMENT,
				revisions: [],
				serverIp: undefined,
				serverMode: false,
				serverPort: undefined,
				shutdownByOs: false,
				timeContext: undefined,
				timestamp: undefined,
				title: 'fakeTitle',
				type: '',
				useXpra: false,
				userTag: '',
				version: faker.system.semver(),
				visible: false,
				xpraEncoding: undefined
			});
	}
	return envs;
}