import { ISoftwareDescription, ISoftwareDescriptionList, ISoftwareObject, ISoftwarePackage, ISoftwarePackageList } from '@/types/emil/EmilSoftwareData';
import { resourceTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import { getFromCache, addToCache, deleteFromCache } from '@/utils/cache.util';


export default class SoftwareService extends BaseService {

	private readonly _softwareRepoService: EmilBaseService;
	private readonly CACHE_KEYS = {
		ALL_SOFTWARE: 'all-software',
		PACKAGES: 'software-packages',
		DESCRIPTIONS: 'software-descriptions'
	}

	constructor(
		softwareRepoService: EmilBaseService = new EmilBaseService('software-repository'),
	) {
		super();
		this._softwareRepoService = softwareRepoService;
	}

	async getAll(bypassCache: boolean = false): Promise<ISoftwarePackage[]> {
		if(!bypassCache) {
			let results = getFromCache<ISoftwarePackage[]>(this.CACHE_KEYS.ALL_SOFTWARE)
			if(results) return results;
		}
		const descriptionList = await this.getSoftwareDescriptionList();
		const packageList = await this.getSoftwarePackageList();
		const packages = this._mergeDescriptionsWithPackages(descriptionList, packageList);
		addToCache(this.CACHE_KEYS.ALL_SOFTWARE, packages);
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

	private async getSoftwareDescriptionList(bypassCache: boolean = false): Promise<ISoftwareDescriptionList> {
		if(!bypassCache) {
			let results = getFromCache<ISoftwareDescriptionList>(this.CACHE_KEYS.DESCRIPTIONS)
			if(results) return results;
		}
		let res = await this._softwareRepoService.get('descriptions');
		return await res.json() as ISoftwareDescriptionList;
	}

	private async getSoftwarePackageList(bypassCache: boolean = false): Promise<ISoftwarePackageList> {
		if(!bypassCache) {
			let results = getFromCache<ISoftwarePackageList>(this.CACHE_KEYS.PACKAGES)
			if(results) return results;
		}
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
		if(res.ok) this.clearCache();
		return await res.json();
	}

	/*============================================================
	 == Cache
	/============================================================*/

	clearCache() {
		Object.values(this.CACHE_KEYS).forEach(key => {
			deleteFromCache(key);
		})
	}

}
