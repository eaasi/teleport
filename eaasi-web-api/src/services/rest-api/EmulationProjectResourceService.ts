
import CrudService from '../base/CrudService';
import { EmulationProjectResource } from '@/data_access/models/app';
import ResourceAdminService from '../resource/ResourceAdminService';
import { resourceTypes } from '@/utils/constants';
import { IEaasiResource } from '@/types/resource/Resource';

/**
 * Handles CRUD operations for EaasIUser domain
 */
export default class EmulationProjectResourceService extends CrudService<EmulationProjectResource> {

	private _resourceSvc: ResourceAdminService;

	constructor(resourceService: ResourceAdminService = new ResourceAdminService()) {
		super(EmulationProjectResource);
		this._resourceSvc = resourceService;
	}

	/**
	 * Gets emil resources using emulationProjectResource map table
	 * @param emulationProjectId
	 */
	async getEaasiResources(emulationProjectId: number): Promise<IEaasiResource[]> {
		let response = await this.getAllWhere({ emulationProjectId });
		if(response.hasError) throw(response.error);
		if(!response.result.length) return [];
		let resources = await this._resourceSvc.getAllResources();

		// Match emil resources to db
		return resources.filter(x => response.result.find(y => {
			return y.resourceType === resourceTypes.ENVIRONMENT && y.resourceId === x.envId
				|| y.resourceType !== resourceTypes.ENVIRONMENT && y.resourceId === x.id
		}));
	}

}
