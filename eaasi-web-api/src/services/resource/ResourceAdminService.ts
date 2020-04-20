import ReplicateEnvironmentRequest from '@/models/resource/ReplicateEnvironmentRequest';
import { ResourceSearchResponse } from '@/models/resource/ResourceSearchResponse';
import IHttpService from '@/services/interfaces/IHttpService';
import { IContentItem } from '@/types/emil/EmilContentData';
import { IEnvironment } from '@/types/emil/EmilEnvironmentData';
import { ISoftwareObject, ISoftwarePackageDescription, ISoftwarePackageDescriptionsList } from '@/types/emil/EmilSoftwareData';
import { IBookmark } from '@/types/resource/Bookmark';
import { IContentRequest, IEaasiResource, IEaasiSearchQuery, IEaasiSearchResponse, IOverrideContentRequest, IResourceSearchFacet, IResourceSearchQuery, IResourceSearchResponse, ISaveEnvironmentResponse, ISnapshotRequest, ISnapshotResponse, ResourceType } from '@/types/resource/Resource';
import IResourceImportResult from '@/types/resource/ResourceImportResult';
import { archiveTypes, resourceTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import HttpJSONService from '../base/HttpJSONService';
import EmilBaseService from '../eaas/emil/EmilBaseService';
import EaasiBookmarkService from '../rest-api/EaasiBookmarkService';
import ResourceImportService from '../rest-api/ResourceImportService';

const EMIL_SERVICE_ENDPOINT = process.env.EMIL_SERVICE_ENDPOINT;

export default class ResourceAdminService extends BaseService {

	private readonly _emilEnvSvc: EmilBaseService;
	private readonly _emilSofSvc: EmilBaseService;
	private readonly _emilContentSvc: EmilBaseService;
	private readonly _emilClassificationService: EmilBaseService;
	private readonly _bookmarkService: EaasiBookmarkService;
	private readonly _resourceImportService: ResourceImportService;

	constructor(
		emilEnvService: EmilBaseService = new EmilBaseService('EmilEnvironmentData'),
		emilSofService: EmilBaseService = new EmilBaseService('EmilSoftwareData'),
		emilContentService: EmilBaseService = new EmilBaseService('objects'),
		emilClassificationService: EmilBaseService = new EmilBaseService('classification'),
		bookmarkService: EaasiBookmarkService = new EaasiBookmarkService(),
		resourceImportService: ResourceImportService = new ResourceImportService()
	) {
		super();
		this._emilEnvSvc = emilEnvService;
		this._emilSofSvc = emilSofService;
		this._emilContentSvc = emilContentService;
		this._emilClassificationService = emilClassificationService;
		this._bookmarkService = bookmarkService;
		this._resourceImportService = resourceImportService;
	}

	/**
	 * Searches Environment, Software, and Content Resources using the  provided IResourceSearchQuery
	 * @param query
	 */
	async searchResources(query: IResourceSearchQuery): Promise<IResourceSearchResponse> {
		// TODO: Refactor
		let result = new ResourceSearchResponse();

		const allEnvironments = await this.getAllEnvironments();
		const allSoftware = await this.getAllSoftware();
		const allContent = await this.getAllContent();

		let environmentResult = {
			result: allEnvironments,
			totalResults: allEnvironments.length
		};
		let softwareResult = {
			result: allSoftware,
			totalResults: allSoftware.length
		};
		let contentResult = {
			result: allContent,
			totalResults: allContent.length
		};

		if (query.archives && query.archives.length > 0) {
			environmentResult.result = allEnvironments.filter(env => query.archives.includes(env.archive));
			environmentResult.totalResults = environmentResult.result.length;

			softwareResult.result = allSoftware.filter(sw => query.archives.includes(sw.archive || sw.archiveId));
			softwareResult.totalResults = softwareResult.result.length;

			// Note: This double check because in the case of Content Archive, it appears to be referenced as archiveId
			contentResult.result = allContent.filter(content => query.archives.includes(content.archive || content.archiveId));
			contentResult.totalResults = contentResult.result.length;
		}

		const bookmarkResponse = await this._bookmarkService.getByUserID(query.userId);
		if (bookmarkResponse.result) result.bookmarks = bookmarkResponse.result.map(b => b.toJSON()) as IBookmark[];

		if (query.userId) {
			if (query.onlyBookmarks) {
				contentResult.result = allContent.filter(r => result.bookmarks.some(b => b.resourceID === r.id));
				softwareResult.result = allSoftware.filter(r => result.bookmarks.some(b => b.resourceID === r.id));
				environmentResult.result = allEnvironments.filter(r => result.bookmarks.some(b => b.resourceID === r.envId));
			} else if(query.onlyImportedResources) {
				const userImportedResources: IResourceImportResult = await this._resourceImportService.getByUserID(query.userId);
				contentResult.result = allContent.filter(r => userImportedResources.userImportedContent.result.some(ir => ir.eaasiID === r.id));
				contentResult.totalResults = contentResult.result.length;

				softwareResult.result = allSoftware.filter(r => userImportedResources.userImportedSoftware.result.some(ir => ir.eaasiID === r.id));
				softwareResult.totalResults = softwareResult.result.length;
				
				environmentResult.result = allEnvironments.filter(r => userImportedResources.userImportedEnvironments.result.some(ir => ir.eaasiID === r.envId));
				environmentResult.totalResults = environmentResult.result.length;
			}
		}

		contentResult.result = this._filterResults<IContentItem>(query, contentResult.result);
		softwareResult.result = this._filterResults<ISoftwarePackageDescription>(query, softwareResult.result);
		environmentResult.result = this._filterResults<IEnvironment>(query, environmentResult.result);

		result.facets = this.populateFacets(environmentResult, softwareResult, contentResult);

		environmentResult.result = this.paginate<IEnvironment>(query, environmentResult.result);
		softwareResult.result = this.paginate<ISoftwarePackageDescription>(query, softwareResult.result);
		contentResult.result = this.paginate<IContentItem>(query, contentResult.result);

		result.content = contentResult;
		result.software = softwareResult;

		// get metadata for paginated envs
		environmentResult.result = await this.getEnvironmentsMetadata(environmentResult.result);
		result.environments = environmentResult;

		this.preselectResultFacets(result, query);

		return result;
	}

	/*============================================================
	 == Environments
	/============================================================*/

	/**
	 * Gets an Environment by ID
	 * @param id: string environmentId
	 */
	async getEnvironment(id: string): Promise<IEnvironment> {
		let res = await this._emilEnvSvc.get(id);
		return await res.json() as IEnvironment;
	}

	/**
	 * Replicate an Environment to local storage
	 * @param replicateRequest: ReplicateEnvironmentRequest {
	 *   destArchive: ArchiveType;
	 *   replicateList: string[];
	 * }
	 */
	async replicateEnvironment(replicateRequest: ReplicateEnvironmentRequest): Promise<ISaveEnvironmentResponse | null> {
	    // The endpoint currently takes a POST request payload containing a list of ids and a source destination.
		// 'public' source destination makes the environment available locally to the requesting Node.
		// TODO: Handle error responses from Emil API -- there are several cases to handle
		// TODO: See https://gitlab.com/eaasi/eaas-server/blob/eaasi-release-2019.07/src/emil/src/main/java/de/bwl/bwfla/emil/EmilEnvironmentData.java#L772
		let response = await this._emilEnvSvc.post('replicateImage', replicateRequest)
		return response.json()
	}

	/**
	 * Delete an Environment from local storage
	 * @param id: environmentId
	 */
	async deleteEnvironment(id: string) {
		let environmentToDelete = {
			'envId': id,
			'deleteMetaData': true,
			'deleteImage': true,
			'force': true
		};
		let res = await this._emilEnvSvc.post('delete', environmentToDelete);
		return await res.json();
	}

	async saveNewEnvironment(newEnvRequest: any) {

		let snapshotRequest = {
			type: 'saveImport',
			envId: newEnvRequest.envId,
			relativeMouse: false,
			isRelativeMouse: false,
			message: newEnvRequest.description,
			title: newEnvRequest.title,
			objectId: null,
			softwareId: null,
			userId: null,
			networking: {
			}
		};

		let httpSvc: IHttpService = new HttpJSONService();
		let url = `${EMIL_SERVICE_ENDPOINT}/components/${newEnvRequest.componentId}/snapshot`;
		let res = await httpSvc.post(url, snapshotRequest);
		return await res.json();
	}

	async saveNewObjectEnvironment(newEnvRequest: any): Promise<ISnapshotResponse> {

		let snapshotRequest: ISnapshotRequest = {
			archive: archiveTypes.DEFAULT,
			envId: newEnvRequest.envId,
			isRelativeMouse: false,
			relativeMouse: false,
			message: newEnvRequest.description,
			title: newEnvRequest.title,
			objectId: newEnvRequest.objectId,
			softwareId: null,
			type: 'objectEnvironment',
			userId: null
		};

		let httpSvc: IHttpService = new HttpJSONService();
		let url = `${EMIL_SERVICE_ENDPOINT}/components/${newEnvRequest.componentId}/snapshot`;

		let res = await httpSvc.post(url, snapshotRequest);

		return await res.json();
	}

	/**
	 * Searches  for all environments using the provided IEaasiSearchQuery
	 * @param query
	 * @private
	 */
	private async getAllEnvironments(): Promise<IEnvironment[]> {
		let res = await this._emilEnvSvc.get('');
		const result = await res.json() as IEnvironment[];
		result.forEach(env => env.resourceType = resourceTypes.ENVIRONMENT);
		return result;
	}

	private async getEnvironmentsMetadata(envs: IEnvironment[]): Promise<IEnvironment[]> {
		const metadataEnvs = [];
		for(let i = 0; i < envs.length; i++) {
			let envMetadata = await this.getEnvironment(envs[i].envId);
			envMetadata.resourceType = resourceTypes.ENVIRONMENT;
			if (envMetadata.hasOwnProperty('error')) {
				metadataEnvs.push({...envs[i], error: envMetadata['error'] });
			} else {
				metadataEnvs.push(envMetadata);
			}
		}
		return metadataEnvs;
	}

	/*============================================================
	 == Software
	/============================================================*/
	/**
	 * Saves software object
	 * @param softwareObject: ISoftwareObject with req.body
	 */
	async saveSoftwareObject(softwareObject: ISoftwareObject) {
		let res = await this._emilSofSvc.post('saveSoftwareObject', softwareObject);
		return await res.json();
	}

	/**
	 * Gets a Software Object by ID
	 * @param id: string softwareId
	 */
	async getSoftwareObject(id: string): Promise<any> {
		let res = await this._emilSofSvc.get(`getSoftwareObject?softwareId=${id}`);
		return await res.json();
	}

	/**
	 * Posts Object Import Request data
	 * @param archiveId
	 * @param objectId
	 */
	async getSoftwareMetadata(archiveId: string, objectId: string) {
		let httpSvc: IHttpService = new HttpJSONService();
		let url = `${EMIL_SERVICE_ENDPOINT}/objects/${archiveId}/${objectId}`;
		let res = await httpSvc.get(url);
		return await res.json();
	}

	/**
	 * Gets a description of a software package by id
	 * @param id: string softwareId
	 */
	async getSoftwarePackageDescription(id: string): Promise<IEnvironment> {
		let res = await this._emilSofSvc.get(`getSoftwarePackageDescription?softwareId=${id}`);
		return await res.json();
	}

	/**
	 * Searches for all software using the provided IEaasiSearchQuery
	 * @private
	 */
	private async getAllSoftware(): Promise<ISoftwarePackageDescription[]> {
		let res = await this._emilSofSvc.get('getSoftwarePackageDescriptions');
		let list = await res.json() as ISoftwarePackageDescriptionsList;
		let software = list.descriptions;
		// TODO: we need to ensure all responses adhere to IEaasiResource
		software.forEach(x => {
			x.title = x.label;
			x.resourceType = resourceTypes.SOFTWARE;
		});
		return software;
	}

	/*============================================================
	 == Content
	/============================================================*/

	/**
	 * Searches for all content using the provided IEaasiSearchQuery
	 * @private
	 */
	private async getAllContent(): Promise<IContentItem[]> {
		// TODO: do not hard code 'zero conf'
		let res = await this._emilContentSvc.get('zero%20conf');
		const result = await res.json() as IContentItem[];
		result.forEach(content => {
			content.resourceType = resourceTypes.CONTENT;
		});
		return result;
	}

	async getObjectArchive() {
		let res = await this._emilContentSvc.get('archives');
		return res.json();
	}

	async getObjectArchiveItems(archiveId: string) {
		let res = await this._emilContentSvc.get(archiveId);
		return res.json();
	}

	async getContentMetadata(contentRequest: IContentRequest) {
		let res = await this._emilContentSvc.get(`${contentRequest.archiveName}/${contentRequest.contentId}`);
		return res.json();
	}

	/**
	 * Deletes content using provided IContentRequest
	 * @param contentRequest: {
	 *   archiveName: string;
	 *   contentId: string;
	 * }
	 */
	async deleteContent(contentRequest: IContentRequest) {
		let url = `${EMIL_SERVICE_ENDPOINT}/objects/${contentRequest.archiveName}/${contentRequest.contentId}`;
		let httpSvc: IHttpService = new HttpJSONService();
		await httpSvc.delete(url);
	}

	/**
	 * Saves content metadata (Ovverrides Object Characterization) using provided IOverrideContentRequest
	 * @param contentOverride: {
	 *  description: string;
	 * 	environments: [];
	 *  objectArchive: string;
	 * 	objectId: string;
	 * }
	 */
	async saveContent(contentOverride: IOverrideContentRequest) {
		let res = await this._emilClassificationService.post('overrideObjectCharacterization', contentOverride);
		return res.json();
	}

	/*============================================================
	 == Revisions
	/============================================================*/

	/**
	* Fork revision request
	* @param revisionRequest {
	*   id: string;
	* }
	*/
	async forkRevision(revisionRequest: any) {
		let res = await this._emilEnvSvc.post('forkRevision', revisionRequest);
		return res.json();
	}

	/**
	 * Saves a revision from an existing running environment
	 * @param revisionEnvRequest {
	 * }
	 */
	async saveEnvironmentRevision(revisionEnvRequest: any) {
		let snapshotRequest = {
			envId: revisionEnvRequest.envId,
			isRelativeMouse: false,
			message: revisionEnvRequest.description,
			objectId: null,
			softwareId: null,
			type: 'saveRevision',
			userId: null
		};

		let httpSvc: IHttpService = new HttpJSONService();
		let url = `${EMIL_SERVICE_ENDPOINT}/components/${revisionEnvRequest.componentId}/snapshot`;
		let res = await httpSvc.post(url, snapshotRequest);
		return await res.json();
	}

	/*============================================================
	 == Templates and Patches
	/============================================================*/

	/**
	 * Gets a list of all available environment templates
	 */
	async getEnvironmentTemplates() {
		let res = await this._emilEnvSvc.get('getEnvironmentTemplates');
		return res.json();
	}

	/**
	 * Gets a list of all available patches
	 */
	async getPatches() {
		let res = await this._emilEnvSvc.get('getPatches');
		return res.json();
	}

	async getOperatingSystemMetadata() {
		let res = await this._emilEnvSvc.get('operatingSystemMetadata');
		return res.json();
	}

	async getNameIndexes() {
		let res = await this._emilEnvSvc.get('getNameIndexes');
		return res.json();
	}

	/*============================================================
	 == Helpers
	/============================================================*/

	/**
	 * Filters EaasiResource result using the provided case-insensitive query keyword
	 * @param query: IEaasiSearchQuery
	 * @param results: filtered IEaasiResource[]
	 * @private
	 */
	private _filterResults<T extends IEaasiResource>(query: IEaasiSearchQuery, results: T[]): T[] {
		if (query.keyword) {
			let q = query.keyword.toLowerCase();
			results = results.filter(r => r.title && r.title.toLowerCase().indexOf(q) > -1);
		}

		if (query.selectedFacets.some(f => f.values.some(v => v.isSelected))) {
			results = this.filterByFacets<T>(results, query.selectedFacets);
		}

		if (query.sortCol) {
			results = results.sort((a, b) => {
				const nameA = a.title.toLowerCase();
				const nameB = b.title.toLowerCase();
				let comparison = 0;
				if (nameA > nameB) comparison = 1;
				else if (nameA < nameB) comparison = -1;
				return query.descending ? comparison : comparison * -1;
			});
		}

		return results;
	}

	/**
	 * Paginates a list of results according to parameters set on a `query` object
	 * @param query IEaasiSearchQuery
	 * @param results IEaasiResource the initial list of results to paginate
	 * @private
	 */
	public paginate<T extends IEaasiResource>(query: IEaasiSearchQuery, results: IEaasiResource[]): T[] {
		return results.slice((query.page - 1) * query.limit, query.page * query.limit) as T[];
	}

	private _filterByArchive(resources: any[], archive: string) {
		return resources.filter(r => r.archive === archive);
	}

	private populateFacets (
		environments: IEaasiSearchResponse<IEnvironment>,
		software: IEaasiSearchResponse<ISoftwarePackageDescription>,
		content: IEaasiSearchResponse<IContentItem>
	): IResourceSearchFacet[] {
		const facets: IResourceSearchFacet[] = [
			{ displayLabel: 'Resource Types', name: 'resourceType', values: [] },
			{ displayLabel: 'Network Status', name: 'archive', values: [] },
			{ displayLabel: 'Environment Type', name: 'envType', values: [] },
			{ displayLabel: 'Source Organization', name: 'owner', values: [] },
			{ displayLabel: 'Source Location', name: 'archiveId', values: [] },
		];
		facets.forEach(facet => {
			if (environments.result.length > 0) facet = this.getFacet(environments, facet);
			if (software.result.length > 0) facet = this.getFacet(software, facet);
			if (content.result.length > 0) this.getFacet(content, facet);
		});
		return facets;
	};

	private getFacet(resource: IEaasiSearchResponse<IEaasiResource>, facet: IResourceSearchFacet) {
		resource.result.forEach(result => {
			if (result[facet.name] == null) return facet;
			const value = facet.values.find(v => v.label === result[facet.name]);
			value ? facet.values.forEach(v => v.label === value.label && v.total++)
				: facet.values.push({ label: result[facet.name], total: 1, isSelected: false, resourceType: result.resourceType });
		});
		return facet;
	}

	private filterByFacets<T extends IEaasiResource>(resources: T[], selectedFacets: IResourceSearchFacet[]): T[] {
		if (!resources.length) return resources;

		const selectedFacetsOfType = this.selectedFacetsOfType(selectedFacets, resources[0].resourceType);
		selectedFacetsOfType.forEach(facet => {
			resources = resources.filter(
				resource => facet.values.some(value => resource[facet.name] === value.label)
			)
		});

		return resources;
	}

	private selectedFacetsOfType(facets: IResourceSearchFacet[], resourceType: ResourceType): IResourceSearchFacet[] {
		let selectedFacets = [];

		facets.forEach(f => {
			if(f.values.some(v => v.isSelected)) {
				const values = f.values
					.map(v => v.isSelected && v.resourceType === resourceType ? v : null)
					.filter(i => i !== null);

				selectedFacets.push({...f, values });
			}
		});
		return selectedFacets;
	}

	private preselectResultFacets(result: IResourceSearchResponse, query: IResourceSearchQuery): void {
		result.facets.forEach(facet => {
			if (facet.values.length === 1 && facet.name === 'resourceType') {
				facet.values[0].isSelected = true;
			} else {
				facet.values.forEach(value => {
					const currentFacet = query.selectedFacets.find(f => f.name === facet.name);
					if (currentFacet) {
						let selectedValue = currentFacet.values.find(v => v.label === value.label && v.isSelected)
						if (selectedValue) value.isSelected = true;
					}
				})
			}
		})
	}

}
