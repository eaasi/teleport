import { Emulator } from '@/data_access/models/app/Emulator';
import EmilBaseService from '@/services/base/EmilBaseService';
import { TaskState } from '@/types/emil/Emil';
import { IEmulatorImportRequest } from '@/types/emil/EmilContainerData';
import { EmulatorEntry, EmulatorNamedIndexes } from '@/types/emil/EmilEnvironmentData';
import BaseService from '../base/BaseService';
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
	async getEmulators(): Promise<EmulatorNamedIndexes> {
		// Get named indexes from Emil
		let response = await this._emilEnvService.get('getNameIndexes');
		if (response.ok) {
			return await response.json() as EmulatorNamedIndexes;
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

}
