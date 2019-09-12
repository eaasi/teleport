import EaasiRoleService from '@/services/rest-api/EaasiRoleService';
import BaseCrudController from '@/controllers/base/BaseCrudController';

class EaasiRoleController extends BaseCrudController {
	constructor() {
		super(new EaasiRoleService());
	}
}

module.exports = EaasiRoleController;
