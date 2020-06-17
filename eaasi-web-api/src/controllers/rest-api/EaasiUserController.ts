import EaasiUserService from '@/services/rest-api/EaasiUserService';
import BaseCrudController from '@/controllers/base/BaseCrudController';
import { EaasiUser } from '@/data_access/models/app';

class EaasiUserController extends BaseCrudController<EaasiUser> {
	constructor() {
		super(new EaasiUserService());
	}
}

module.exports = EaasiUserController;
