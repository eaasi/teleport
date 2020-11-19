import EmulatorService from '@/services/rest-api/EmulatorService';
import BaseCrudController from '@/controllers/base/BaseCrudController';
import { Emulator } from '@/data_access/models/app';

class EmulatorController extends BaseCrudController<Emulator> {
	constructor() {
		super(new EmulatorService());
	}
}

module.exports = EmulatorController;