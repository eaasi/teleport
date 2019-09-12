import EmulatorService from '@/services/rest-api/EmulatorService';
import BaseCrudController from '@/controllers/base/BaseCrudController';

class EmulatorController extends BaseCrudController {
	constructor() {
		super(new EmulatorService());
	}
}

module.exports = EmulatorController;