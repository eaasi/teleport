import { Emulator } from '@/data_access/models/app/Emulator';
import EmilBaseService from '@/services/eaas/emil/EmilBaseService';
import { IEmulator, IEmulatorViewModel } from '@/types/admin/Emulator';
import { TaskState } from '@/types/emil/Emil';
import { IEmulatorImportRequest } from '@/types/emil/EmilContainerData';
import { AliasEntry, EmulatorEntry, EmulatorNamedIndexes } from '@/types/emil/EmilEnvironmentData';
import BaseService from '../base/BaseService';
import CrudQuery from '../base/CrudQuery';
import CrudService from '../base/CrudService';
import ICrudService from '../interfaces/ICrudService';

/**
 * Handles business logic related to working with Emulator (Administration) data
 */
export default class EmulatorAdminService extends BaseService {

	private readonly _emulatorAdminCrudService: ICrudService<Emulator>;
	private readonly _emilContService: EmilBaseService;
	private readonly _emilEnvService: EmilBaseService;

	constructor(
		emulatorAdminCrudSvc: ICrudService<Emulator> = new CrudService<Emulator>(Emulator),
		emilEnvService: EmilBaseService = new EmilBaseService('EmilEnvironmentData'),
		emilContService: EmilBaseService = new EmilBaseService('EmilContainerData')
	) {
		super();
		this._emulatorAdminCrudService = emulatorAdminCrudSvc;
		this._emilEnvService = emilEnvService;
		this._emilContService = emilContService;
	}

	/**
	 * Gets a list of emulator view models
	 */
	async getEmulators(): Promise<IEmulatorViewModel[]> {

		// Get full emulators list from the database
		let query = new CrudQuery()
		query.limit = 10000;
		let result = await this._emulatorAdminCrudService.getAll(query, true);
		if (result.hasError) { throw result.error; }

		// Get named indexes from Emil
		let dbList = result.result.result as IEmulator[];
		let response = await this._emilEnvService.get('getNameIndexes');

		if (response.ok) {
			let indexes = await response.json() as EmulatorNamedIndexes;
			return this._createEmulatorViewModels(dbList, indexes);
		} else {
			throw 'Could not get named emulator indexes from emil';
		}
	}

	/**
	 * Requests emil to import a new emulator from a docker image
	 * @param {IEmulatorImportRequest} importReq -- The import request
	 */
	async importEmulator(importReq: IEmulatorImportRequest): Promise<TaskState | null> {
		let response = await this._emilContService.post('importEmulator', importReq);
		if(response.ok) {
			return await response.json() as TaskState;
		}
		return null;
	}

	/**
	 * Requests emil to set a specific emulator entry as the default version
	 * @param {EmulatorEntry} entry The entry (image) to set as the default
	 */
	async setDefaultVersion(entry: EmulatorEntry) {
		let response = await this._emilContService.post('updateLatestEmulator', {
			emulatorName: entry.name,
			version: entry.version
		});
		if(response.ok) return true;
		return false;
	}

	/*============================================================
	 == Private methods
	/============================================================*/

	/**
	 * Creates emulator view models by matching index response from emil with
	 * emulators from the pg database
	 * @param {IEmulator[]} dbList - The list of emulators from the pg database
	 * @param {EmulatorNamedIndexes} indexes - The named indexes response data from emil
	 */
	private _createEmulatorViewModels(dbList: IEmulator[], indexes: EmulatorNamedIndexes) {
		let emulators: IEmulatorViewModel[] = [];
		let aliases = indexes.aliases.entry.map(x => x.value);
		dbList.forEach(em => {
			let latestVersion = this._getLatestVersion(em.name, aliases);
			let entries = indexes.entries.entry.filter(x => x.key.indexOf(em.name) > -1).map(x => x.value);
			emulators.push({
				id: em.id,
				name: em.name,
				entries,
				latestVersion
			});
		});
		return emulators;
	}

	/**
	 * Given an emulator name and a list of alias entries, attempts to find the version number
	 * that corresponds to the 'latest' alias
	 * @param {string} emulatorName - The emulator name
	 * @param aliasList - The full list of emulator aliases
	 */
	private _getLatestVersion(emulatorName: string, aliasList: AliasEntry[]): string | null {
		let aliasEntry = aliasList.find(x => x.name.indexOf(emulatorName) > -1 && x.alias === 'latest');
		if(!aliasEntry) return null;
		return aliasEntry.version;
	}

}
