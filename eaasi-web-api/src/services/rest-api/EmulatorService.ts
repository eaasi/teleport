import { Emulator } from '@/data_access/models/app/Emulator';
import CrudService from '../base/CrudService';


/**
 * Handles CRUD operations for Emulator domain
 */
export default class EmulatorService extends CrudService<Emulator> {
	constructor() {
		super(Emulator);
	}
}