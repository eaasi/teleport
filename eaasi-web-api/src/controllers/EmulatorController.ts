import EmulatorService from '../services/EmulatorService';
import BaseCrudController from './BaseCrudController';

class EmulatorController extends BaseCrudController {
	constructor() {
		super(new EmulatorService());
	}
}

module.exports = EmulatorController;
