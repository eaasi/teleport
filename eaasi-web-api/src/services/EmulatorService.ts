import CrudService from './base/CrudService';

const { Emulator } = require('../data_access/models');

/**
 * Handles CRUD operations for Emulator domain
 */
export default class EaasiRoleService extends CrudService {
	constructor() {
		super(Emulator);
	}
}