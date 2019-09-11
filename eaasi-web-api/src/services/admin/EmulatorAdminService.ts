import EmilBaseService from '@/services/emil/EmilBaseService';
import ICrudService from '../interfaces/ICrudService';
import CrudService from '../base/CrudService';
const { Emulator } = require('@/data_access/models');
import CrudQuery from '../base/CrudQuery';
import BaseService from '../base/BaseService';


/**
 * Handles business logic related to working with Emulator (Administration) data
 */
export default class EmulatorAdminService extends BaseService {

	private readonly _emulatorAdminCrudService: ICrudService;
	private readonly _emilService: EmilBaseService;

	constructor(
		emulatorAdminCrudSvc: ICrudService = new CrudService(Emulator),
		emilService: EmilBaseService = new EmilBaseService('EmilEnvironmentData')
	) {
		super();
		this._emulatorAdminCrudService = emulatorAdminCrudSvc;
		this._emilService = emilService;
	}

	/* EmulatorAdmins
	============================================*/

	/**
	 * Gets Emulator data
	 */
	async getEmulators() {
		let query = new CrudQuery()

		query.limit = 200;

		let result = await this._emulatorAdminCrudService.getAll(query);

		if (result.hasError) {
			throw result.error;
		}

		// Returns with properties aliases and entries
		let response = await this._emilService.get('getNameIndexes');

		if (response.ok) {
			let { aliases, entries } = await response.json();
			console.log(entries.entry.map((res: any) => res));
		}

		return result.result;
	}

	async updateEmulator(id: number) {
		return await '';
	}
}
