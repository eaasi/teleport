import { ISoftwareDescription, ISoftwareDescriptionList, ISoftwareObject, ISoftwarePackage } from '@/types/emil/EmilSoftwareData';
import BaseService from '../base/BaseService';
import EmilBaseService from '../eaas/emil/EmilBaseService';


export default class SoftwareService extends BaseService {

	private readonly _softwareRepoService: EmilBaseService;

	constructor(
		softwareRepoService: EmilBaseService = new EmilBaseService('software-repository'),
	) {
		super();
		this._softwareRepoService = softwareRepoService;
	}
	
	async getAll(): Promise<ISoftwarePackage[]> {
		const result = await this.getSoftwareDescriptionList();
		return this.getSoftwarePackages(result.descriptions);
	}

	async getSoftwarePackages(descriptions: ISoftwareDescription[]): Promise<ISoftwarePackage[]> {
		let packages: ISoftwarePackage[] = [];
		for(let i = 0; i < descriptions.length; i++) {
			if (!descriptions[i] || !descriptions[i].id) continue;
			let softwarePackage: ISoftwarePackage = await this.getSoftwarePackage(descriptions[i].id);
			packages.push({...descriptions[i], ...softwarePackage});
		}
		return packages;
	}

	async getSoftwareDescriptionList(): Promise<ISoftwareDescriptionList> {
		let res = await this._softwareRepoService.get('descriptions');
		return await res.json() as ISoftwareDescriptionList;
	}

	/**
	 * Gets a Software Package
	 * @param id: string softwareId
	 */
	async getSoftwarePackage(id: string): Promise<ISoftwarePackage> {
		let res = await this._softwareRepoService.get(`packages/${id}`);
		return await res.json() as ISoftwarePackage;
	}

	/**
	 * Gets a description of a software package by id
	 * @param id: string softwareId
	 */
	async getSoftwareDescription(id: string): Promise<ISoftwareDescription> {
		let res = await this._softwareRepoService.get(`descriptions/${id}`);
		return await res.json();
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