import { ISoftwareDescription, ISoftwareDescriptionList, ISoftwareObject, ISoftwarePackage, ISoftwarePackageList } from '@/types/emil/EmilSoftwareData';
import { resourceTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import { getFromCache, addToCache } from '@/utils/cache.utility';


export default class SoftwareService extends BaseService {

	private readonly _softwareRepoService: EmilBaseService;

	constructor(
		softwareRepoService: EmilBaseService = new EmilBaseService('software-repository'),
	) {
		super();
		this._softwareRepoService = softwareRepoService;
	}

	async getAll(bypassCache: boolean = false): Promise<ISoftwarePackage[]> {
		const CACHE_KEY = 'all-software-packages';
		if(!bypassCache) {
			let results = getFromCache<ISoftwarePackage[]>(CACHE_KEY)
			if(results) return results;
		}
		const descriptionList = await this.getSoftwareDescriptionList();
		const packageList = await this.getSoftwarePackageList();
		const packages = this._mergeDescriptionsWithPackages(descriptionList, packageList);
		addToCache(CACHE_KEY, packages);
		return packages;
	}

	/**
	 * Gets a Software Package
	 * @param id: string softwareId
	 */
	async getSoftwarePackage(id: string): Promise<ISoftwarePackage> {
		let res = await this._softwareRepoService.get(`packages/${id}`);
		let software = await res.json() as ISoftwarePackage;
		software.resourceType = resourceTypes.SOFTWARE;
		return software;
	}

	/**
	 * Gets a description of a software package by id
	 * @param id: string softwareId
	 */
	async getSoftwareDescription(id: string): Promise<ISoftwareDescription> {
		let res = await this._softwareRepoService.get(`descriptions/${id}`);
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

	private async getSoftwareDescriptionList(): Promise<ISoftwareDescriptionList> {
		let res = await this._softwareRepoService.get('descriptions');
		return await res.json() as ISoftwareDescriptionList;
	}

	private async getSoftwarePackageList(): Promise<ISoftwarePackageList> {
		let res = await this._softwareRepoService.get('packages');
		return await res.json() as ISoftwarePackageList;
	}

	getSoftwareObjects(ids: string[]) {
		throw new Error('Method not implemented.');
	}

	/**
	 * Saves software object
	 * @param softwareObject: ISoftwareObject with req.body
	 */
	async saveSoftwareObject(softwareObject: ISoftwareObject) {
		let res = await this._softwareRepoService.post('packages', softwareObject);
		return await res.json();
	}

}
