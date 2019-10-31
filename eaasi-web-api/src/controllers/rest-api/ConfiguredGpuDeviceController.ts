import EaasiRoleService from '@/services/rest-api/EaasiRoleService';
import BaseCrudController from '@/controllers/base/BaseCrudController';

class ConfiguredGpuController extends BaseCrudController {
	constructor() {
		super(new EaasiRoleService());
	}
}

module.exports = ConfiguredGpuController;
