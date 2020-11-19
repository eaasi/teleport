
import { TempEnvironment } from '@/data_access/models/app/TempEnvironment';
import CrudService from '../base/CrudService';

/**
 * Handles CRUD operations for EaasIUser domain
 */
export default class TempEnvironmentService extends CrudService<TempEnvironment> {
	constructor() {
		super(TempEnvironment);
	};

}
