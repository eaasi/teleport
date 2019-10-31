import EaasiRoleService from '@/services/rest-api/EaasiRoleService';
import BaseCrudController from '@/controllers/base/BaseCrudController';

class ComputingEnvironmentController extends BaseCrudController {
	constructor() {
		super(new EaasiRoleService());
	}
}

module.exports = ComputingEnvironmentController;
