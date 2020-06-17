import BaseCrudController from '@/controllers/base/BaseCrudController';
import { EmulationProject } from '@/data_access/models/app';
import EmulationProjectService from '@/services/rest-api/EmulationProjectService';

class EmulationProjectController extends BaseCrudController<EmulationProject> {
	constructor() {
		super(new EmulationProjectService());
	}
}

module.exports = EmulationProjectController;