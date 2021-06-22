import { ISoftwareDescription, ISoftwareDescriptionList, ISoftwareObject, ISoftwarePackage, ISoftwarePackageList } from '@/types/emil/EmilSoftwareData';
import { resourceTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import {getUserIdFromToken} from '../../utils/token'


export default class SoftwareService extends BaseService {

	private readonly _softwareRepoService: EmilBaseService;
	private readonly CACHE_KEYS = {
		ALL_SOFTWARE: 'all-software'
	}

	constructor(
		softwareRepoService: EmilBaseService = new EmilBaseService('software-repository'),
	) {
		super();
		this._softwareRepoService = softwareRepoService;
	}

	async getAll(token?: string): Promise<ISoftwarePackage[]> {
		let userId = getUserIdFromToken(token);
		let results = this._cache.get<ISoftwarePackage[]>(`${this.CACHE_KEYS.ALL_SOFTWARE}/${userId}`)
		if(results) return results;
		const packageList = await this.getSoftwarePackageList(token);
		const packages = packageList.packages;
		if (packages.length) this._cache.add(`${this.CACHE_KEYS.ALL_SOFTWARE}/${userId}`, packages);
		return packages;
	}

	/**
	 * Gets a Software Package
	 * @param id: string softwareId
	 */
	async getSoftwarePackage(id: string, token?: string): Promise<ISoftwarePackage> {
		let res = await this._softwareRepoService.get(`packages/${id}`, token);
		let software = await res.json() as ISoftwarePackage;
		software.resourceType = resourceTypes.SOFTWARE;
		return software;
	}

	/**
	 * Gets a description of a software package by id
	 * @param id: string softwareId
	 */
	async getSoftwareDescription(id: string, token?: string): Promise<ISoftwareDescription> {
		let res = await this._softwareRepoService.get(`descriptions/${id}`, token);
		let software = await res.json();
		software.resourceType = resourceTypes.SOFTWARE;
		return software;
	}

	private _mergeDescriptionsWithPackages(descriptionList: ISoftwareDescriptionList, packageList: ISoftwarePackageList): ISoftwarePackage[] {
		return descriptionList.descriptions.map(description => {
			let descriptionPackage = packageList.packages.find(p => description.id === p.id);
			return {...description, ...descriptionPackage, resourceType: resourceTypes.SOFTWARE};
		})
	}

	private async getSoftwareDescriptionList(token: string): Promise<ISoftwareDescriptionList> {
		let res = await this._softwareRepoService.get('descriptions', token);
		return await res.json() as ISoftwareDescriptionList;
	}

	private async getSoftwarePackageList(token: string): Promise<ISoftwarePackageList> {
		let res = await this._softwareRepoService.get('packages', token);
		return await res.json() as ISoftwarePackageList;
	}

	getSoftwareObjects(ids: string[]) {
		throw new Error('Method not implemented.');
	}

	/**
	 * Saves software object
	 * @param softwareObject: ISoftwareObject with req.body
	 */
	async saveSoftwareObject(softwareObject: ISoftwareObject, token?: string) {
		let res = await this._softwareRepoService.post('packages', softwareObject, token);
		if(res.ok) this.clearCache(getUserIdFromToken(token));
		return await res.json();
	}

	/*============================================================
	 == Cache
	/============================================================*/

	clearCache(userId: string) {
		this._cache.delete(`${this.CACHE_KEYS.ALL_SOFTWARE}/${userId}`);
	}

}
