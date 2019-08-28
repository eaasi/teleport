import EaasiUserService from '../services/EaasiUserService';
import BaseCrudController from './BaseCrudController';

class EaasiUserController extends BaseCrudController {
	constructor() {
		super(new EaasiUserService());
	}
}

module.exports = EaasiUserController;
