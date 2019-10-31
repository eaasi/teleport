import CrudService from '../base/CrudService';
const { EaasiUser } = require('@/data_access/models/metadata');

/**
 * Handles CRUD operations for EaasIUser domain
 */
export default class EaasiUserService extends CrudService {
	constructor() {
		super(EaasiUser);
	}
}
