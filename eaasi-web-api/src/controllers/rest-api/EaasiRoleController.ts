import EaasiRoleService from '@/services/rest-api/EaasiRoleService';
import BaseCrudController from '@/controllers/base/BaseCrudController';
import { EaasiRole } from '@/data_access/models/app';

class EaasiRoleController extends BaseCrudController<EaasiRole> {
	constructor() {
		super(new EaasiRoleService());
	}
}

module.exports = EaasiRoleController;
