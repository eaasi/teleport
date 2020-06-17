import BaseCrudController from '@/controllers/base/BaseCrudController';
import { EmulationProjectResource } from '@/data_access/models/app';
import EmulationProjectResourceService from '@/services/rest-api/EmulationProjectResourceService';

class EmulationProjectResourceController extends BaseCrudController<EmulationProjectResource> {
	constructor() {
		super(new EmulationProjectResourceService());
	}
}

module.exports = EmulationProjectResourceController;