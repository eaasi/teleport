import ApiService from "./base/api-service";

const {EaasiRole} = require('../data_access/models');

export default class EaasiRoleService extends ApiService {
	constructor() {
		super(EaasiRole);
	}
}
