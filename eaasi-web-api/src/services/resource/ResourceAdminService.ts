import { ResourceSearchResponse } from '@/models/resource/ResourceSearchResponse';
import { IContentItem } from '@/types/emil/EmilContentData';
import { IEnvironmentListItem } from '@/types/emil/EmilEnvironmentData';
import { ISoftwareDescription } from '@/types/emil/EmilSoftwareData';
import { IBookmark } from '@/types/resource/Bookmark';
import { IEaasiResource, IEaasiSearchQuery, IEaasiSearchResponse, IOverrideContentRequest, IResourceSearchFacet, IResourceSearchQuery, IResourceSearchResponse, ResourceType } from '@/types/resource/Resource';
import IResourceImportResult from '@/types/resource/ResourceImportResult';
import BaseService from '../base/BaseService';
import EmilBaseService from '../eaas/emil/EmilBaseService';
import EaasiBookmarkService from '../rest-api/EaasiBookmarkService';
import ResourceImportService from '../rest-api/ResourceImportService';
import ContentService from './ContentService';
import EnvironmentService from './EnvironmentService';
import SoftwareService from './SoftwareService';

export default class ResourceAdminService extends BaseService {

	private readonly _environmentService: EnvironmentService;
	private readonly _softwareService: SoftwareService;
	private readonly _contentService: ContentService;
	private readonly _emilClassificationService: EmilBaseService;
	private readonly _bookmarkService: EaasiBookmarkService;
	private readonly _resourceImportService: ResourceImportService;


	constructor(
		environmentService: EnvironmentService = new EnvironmentService(),
		softwareService: SoftwareService = new SoftwareService(),
		contentService: ContentService = new ContentService(),
		emilClassificationService: EmilBaseService = new EmilBaseService('classification'),
		bookmarkService: EaasiBookmarkService = new EaasiBookmarkService(),
		resourceImportService: ResourceImportService = new ResourceImportService(),		

	) {
		super();
		this._emilClassificationService = emilClassificationService;
		this._bookmarkService = bookmarkService;
		this._resourceImportService = resourceImportService;
		this._environmentService = environmentService;
		this._softwareService = softwareService;
		this._contentService = contentService;

	}

	/**
	 * Searches Environment, Software, and Content Resources using the  provided IResourceSearchQuery
	 * @param query
	 */
	async searchResources(query: IResourceSearchQuery): Promise<IResourceSearchResponse> {
		// TODO: Refactor
		let result = new ResourceSearchResponse();

		const allEnvironments = await this._environmentService.getAllEmilModels();
		const softwareDescriptionResponse = await this._softwareService.getSoftwareDescriptionList();
		const allSoftware = softwareDescriptionResponse.descriptions;
		const allContent = await this._contentService.getAll('zero conf');

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

			softwareResult.result = allSoftware.filter(sw => query.archives.includes(sw.archiveId));
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

		result.facets = this.populateFacets(environmentResult, softwareResult, contentResult);

		const filteredContentResult = this._filterResults<IContentItem>(query, contentResult.result);
		const filteredSoftwareResult = this._filterResults<ISoftwareDescription>(query, softwareResult.result);
		const filteredEnvironmentResult = this._filterResults<IEnvironmentListItem>(query, environmentResult.result);
		const paginatedEnvironmentResult = this.paginate<IEnvironmentListItem>(query, filteredEnvironmentResult);
		const paginatedSoftwareResult = this.paginate<ISoftwareDescription>(query, filteredSoftwareResult);
		const paginatedContentResult = this.paginate<IContentItem>(query, filteredContentResult);

		const softwareMetadata = await this._softwareService.getSoftwarePackages(paginatedSoftwareResult);
		const envMetadata = await this._environmentService.getEnvironmentsMetadata(paginatedEnvironmentResult);
		
		result.content = {...contentResult, result: paginatedContentResult };
		result.software = {...softwareResult, result: softwareMetadata};
		result.environments = {...environmentResult, result: envMetadata};

		this.preselectResultFacets(result, query);

		return result;
	}

	/*============================================================
	 == Classification
	/============================================================*/

	/**
	 * Saves content metadata (Ovverrides Object Characterization) using provided IOverrideContentRequest
	 * @param contentOverride: {
	 *  description: string;
	 * 	environments: [];
	 *  objectArchive: ArchiveType;
	 * 	objectId: string;
	 * }
	 */
	async saveContent(contentOverride: IOverrideContentRequest) {
		let res = await this._emilClassificationService.post('overrideObjectCharacterization', contentOverride);
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
		environments: IEaasiSearchResponse<IEnvironmentListItem>,
		software: IEaasiSearchResponse<ISoftwareDescription>,
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