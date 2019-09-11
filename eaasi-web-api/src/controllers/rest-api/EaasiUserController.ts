import EaasiUserService from '@/services/rest-api/EaasiUserService';
import BaseCrudController from '@/controllers/base/BaseCrudController';

class EaasiUserController extends BaseCrudController {
	constructor() {
		super(new EaasiUserService());
	}
}

module.exports = EaasiUserController;
