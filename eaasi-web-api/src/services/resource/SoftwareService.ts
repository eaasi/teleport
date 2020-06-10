import { ISoftwareDescription, ISoftwareDescriptionList, ISoftwareObject, ISoftwarePackage } from '@/types/emil/EmilSoftwareData';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import { resourceTypes } from '@/utils/constants';


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
		return await Promise.all(descriptions.map(x => {
			return this.getSoftwarePackageFromDescription(x);
		}));
	}

	async getSoftwarePackageFromDescription(description: ISoftwareDescription): Promise<ISoftwarePackage> {
		if (!description || !description.id) return null;
		let pkg = await this.getSoftwarePackage(description.id);
		pkg.resourceType = resourceTypes.SOFTWARE;
		return {...description, ...pkg};
	}

	async getSoftwareDescriptionList(): Promise<ISoftwareDescriptionList> {
		let res = await this._softwareRepoService.get('descriptions');
		let list = await res.json() as ISoftwareDescriptionList;
		list.descriptions.forEach(x => x.resourceType = resourceTypes.SOFTWARE);
		return list;
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
