import _ from 'lodash';
import { Emulator } from '@/data_access/models/app/Emulator';
import EmilBaseService from '@/services/base/EmilBaseService';
import { TaskState } from '@/types/emil/Emil';
import { IEmulatorImportRequest } from '@/types/emil/EmilContainerData';
import BaseService from '../base/BaseService';
import CrudService from '../base/CrudService';
import ICrudService from '../interfaces/ICrudService';
import { IEmulatorMetaData, IEmulatorViewModel } from '@/types/admin/Emulator';

/**
 * Handles business logic related to working with Emulator (Administration) data
 */
export default class EmulatorAdminService extends BaseService {

	private readonly _emulatorAdminCrudService: ICrudService<Emulator>;
	private readonly _emilContService: EmilBaseService;
	private readonly _emulatorRepository: EmilBaseService;

	constructor(
		emulatorAdminCrudSvc: ICrudService<Emulator> = new CrudService<Emulator>(Emulator),
		emilContService: EmilBaseService = new EmilBaseService('EmilContainerData'),
		emulatorRepository: EmilBaseService = new EmilBaseService('emulator-repository'),
	) {
		super();
		this._emulatorAdminCrudService = emulatorAdminCrudSvc;
		this._emilContService = emilContService;
		this._emulatorRepository = emulatorRepository;
	}

	/**
	 * Gets a list of emulator view models
	 */
	async getEmulators(token?: string): Promise<IEmulatorViewModel[]> {
		const res = await this._emulatorRepository.get('emulators', token);
		const emulators = await res.json();
		return this._createEmulatorViewModels(emulators);
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
	 * @param id - The entry (image) to set as the default
	 * @param token
	 */
	async setDefaultVersion(id: string, token: string) {
		let response = await this._emulatorRepository.post(`emulators/${id}/default`, null, token);
		return response.ok;

	}

	/**
	 * Creates emulator view models. Group emulator entries by name
	 * @param {IEmulatorMetaData[]} emulators - The list of emulators received from emil
	 */
	private _createEmulatorViewModels(emulators: IEmulatorMetaData[]): IEmulatorViewModel[] {
		return _.chain(emulators).groupBy('name').values().map(entries => {
			const name = entries[0].name;
			const latestEntry = entries.find(entry => entry.provenance.tag === 'latest');
			const latestVersion = latestEntry ? latestEntry.version : null;
			return {
				name,
				entries,
				latestVersion
			};
		}).value();
	}


}
