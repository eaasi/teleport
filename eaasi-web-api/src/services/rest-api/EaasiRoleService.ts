import { EaasiRole } from '@/data_access/models/app/EaasiRole';
import CrudService from '../base/CrudService';

/**
 * Handles CRUD operations for EaasIRole domain
 */
export default class EaasiRoleService extends CrudService<EaasiRole> {
	constructor() {
		super(EaasiRole);
	}
}
