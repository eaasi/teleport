
import CrudService from '../base/CrudService';
import { EmulationProject } from '@/data_access/models/app';

/**
 * Handles CRUD operations for EaasIUser domain
 */
export default class EmulationProjectService extends CrudService<EmulationProject> {
	constructor() {
		super(EmulationProject);
	}
}
