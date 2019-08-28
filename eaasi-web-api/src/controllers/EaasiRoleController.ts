import EaasiRoleService from '../services/EaasiRoleService';
import BaseCrudController from './BaseCrudController';

class EaasiRoleController extends BaseCrudController {
	constructor() {
		super(new EaasiRoleService());
	}
}

module.exports = EaasiRoleController;
