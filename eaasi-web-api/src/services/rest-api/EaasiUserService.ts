import { EaasiUser } from '@/data_access/models/app/EaasiUser';
import CrudService from '../base/CrudService';

/**
 * Handles CRUD operations for EaasIUser domain
 */
export default class EaasiUserService extends CrudService<EaasiUser> {
	constructor() {
		super(EaasiUser);
	}
}
