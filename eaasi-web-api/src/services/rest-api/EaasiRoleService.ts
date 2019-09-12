import CrudService from '../base/CrudService';

const { EaasiRole } = require('@/data_access/models');

/**
 * Handles CRUD operations for EaasIRole domain
 */
export default class EaasiRoleService extends CrudService {
	constructor() {
		super(EaasiRole);
	}
}
