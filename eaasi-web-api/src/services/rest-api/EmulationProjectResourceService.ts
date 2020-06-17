
import CrudService from '../base/CrudService';
import { EmulationProjectResource } from '@/data_access/models/app';

/**
 * Handles CRUD operations for EaasIUser domain
 */
export default class EmulationProjectResourceService extends CrudService<EmulationProjectResource> {
	constructor() {
		super(EmulationProjectResource);
	}
}
