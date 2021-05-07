
import { EmulationProjectResource } from '@/data_access/models/app';
import { IEmulationProjectResource } from '@/types/emulation-porject/EmulationProject';
import { IEaasiResource } from '@/types/resource/Resource';
import CrudService from '../base/CrudService';
import ResourceAdminService from '../resource/ResourceAdminService';

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
	 * @param token - user JWT token
	 */
	async getEaasiResources(emulationProjectId: number, token: string): Promise<IEaasiResource[]> {
		const response = await this.getAllWhere({ emulationProjectId });
		if (response.hasError && response.error) {
			throw(response.error);
		};
		if (!response.result.length) {
			return [];
		};
		const emulationProjectResources = response.result.map(res => res.get({ plain: true })) as IEmulationProjectResource[];
		const resources = await this._resourceSvc.getAllResources(token);
		if (!resources || !resources.length) {
			return [];
		};
		
		return emulationProjectResources
			.map(res => resources.find(resource => 
				resource.id === res.resourceId || resource.envId === res.resourceId)
			)
			.filter(resource => resource);
	}

}
