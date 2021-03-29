import { UserImportedContent, UserImportedImage } from '@/data_access/models/app';
import { ResourceSearchResponse } from '@/models/resource/ResourceSearchResponse';
import { IObjectClassificationRequest } from '@/types/emil/Emil';
import { IContentItem } from '@/types/emil/EmilContentData';
import { IEnvironment, IImageListItem } from '@/types/emil/EmilEnvironmentData';
import { ISoftwareDescription, ISoftwarePackage } from '@/types/emil/EmilSoftwareData';
import { IBookmark } from '@/types/resource/Bookmark';
import { IEaasiResource, IEaasiSearchQuery, IEaasiSearchResponse, IOverrideContentRequest, IResourceSearchFacet, IResourceSearchQuery, IResourceSearchResponse, ResourceType } from '@/types/resource/Resource';
import IResourceImportResult from '@/types/resource/ResourceImportResult';
import { archiveTypes, resourceTypes } from '@/utils/constants';
import { filterResourcesByKeyword } from '@/utils/resource.util';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';
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
		resourceImportService: ResourceImportService = new ResourceImportService()
	) {
		super();
		this._emilClassificationService = emilClassificationService;
		this._bookmarkService = bookmarkService;
		this._resourceImportService = resourceImportService;
		this._environmentService = environmentService;
		this._softwareService = softwareService;
		this._contentService = contentService;
	}

	/*============================================================
	 == General
	/============================================================*/

	/**
	 * Gets all environments, software packages, and content items
	 */
	async getAllResources(token?: string): Promise<IEaasiResource[]> {
		let environments: IEnvironment[],
			software: ISoftwarePackage[],
			content: IContentItem[];

		[environments, software, content] = await Promise.all([
			this._environmentService.getAll(token),
			this._softwareService.getAll(token),
			this._contentService.getAll('zero conf', token)
		]);

		return [...environments, ...software, ...content] as IEaasiResource[];
	}

	/*============================================================
	 == Searching
	/============================================================*/

	/**
	 * Searches Environment, Software, and Content Resources using the  provided IResourceSearchQuery
	 * @param query
	 * @param userId
	 */
	async searchResources(query: IResourceSearchQuery, userId: string, token: string): Promise<IResourceSearchResponse> {
		let result = new ResourceSearchResponse();
		let bookmarksResponse: ICrudServiceResult<IBookmark[]>;
		let userImportedResources: IResourceImportResult;

		[bookmarksResponse, userImportedResources] = await Promise.all([
			this._bookmarkService.getByUserID(userId),
			this._resourceImportService.getByUserID(userId)
		])

		const bookmarks: IBookmark[] = bookmarksResponse.result ? bookmarksResponse.result as IBookmark[] : [];

		[result.environments, result.software, result.content, result.images] = await Promise.all([
			this._searchEnvironments(query, bookmarks, userImportedResources.userImportedEnvironments.result, token),
			this._searchSoftware(query, bookmarks, userImportedResources.userImportedSoftware.result, token),
			this._searchContent(query, bookmarks, userImportedResources.userImportedContent.result, token),
			this._searchImages(query, bookmarks, userImportedResources.userImportedImage.result, token)
		])

		result.facets = this.populateFacets([
			...result.environments.result,
			...result.software.result,
			...result.content.result,
			...result.images.result
		]);

		this.preselectResultFacets(result, query);

		result.environments.result = this.paginate(query, result.environments.result);
		result.software.result = this.paginate(query, result.software.result);
		result.content.result = this.paginate(query, result.content.result);
		result.images.result = this.paginate(query, result.images.result);
		result.bookmarks = bookmarks;

		return result;
	}

	private async _searchEnvironments (
		query: IResourceSearchQuery,
		bookmarks: IBookmark[],
		userResources: UserImportedContent[],
		token: string
	): Promise<IEaasiSearchResponse<IEnvironment>> {
		let allEnvironments = await this._environmentService.getAll(token);
		let filtered = this._filterResults(allEnvironments, query, bookmarks, userResources);
		return {
			result: filtered.result,
			totalResults: filtered.totalResults
		};
	}

	private async _searchSoftware (
		query: IResourceSearchQuery,
		bookmarks: IBookmark[],
		userResources: UserImportedContent[],
		token: string
	): Promise<IEaasiSearchResponse<ISoftwareDescription>> {
		let softwareRes = await this._softwareService.getAll(token);
		let result = this._filterResults(softwareRes, query, bookmarks, userResources);
		return result;
	}

	private async _searchContent (
		query: IResourceSearchQuery,
		bookmarks: IBookmark[],
		userResources: UserImportedContent[],
		token: string
	): Promise<IEaasiSearchResponse<IContentItem>> {
		let content = await this._contentService.getAll('default', token);
		return this._filterResults(content, query, bookmarks, userResources);
	}

	private async _searchImages (
		query: IResourceSearchQuery,
		bookmarks: IBookmark[],
		userResources: UserImportedImage[],
		token: string
	): Promise<IEaasiSearchResponse<IImageListItem>> {
		let images = await this._environmentService.getImages(token);
		return this._filterResults(images, query, bookmarks, userResources);
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

	/**
	 * creates a task to detect environments that uses requested software
	 * @param classifyRequest: {
	 * 	archiveId: string;
	 *  objectId: string;
	 *  updateClassification: boolean;
	 *  updateProposal: boolean;
	 * }
	 */
	async classify(classifyRequest: IObjectClassificationRequest) {
		if(!classifyRequest) throw 'Did not receive Classification Request.';
		let response = await this._emilClassificationService.post('', classifyRequest);
		return await response.json();
	}

	/*============================================================
	 == Helpers
	/============================================================*/

	private _filterResults<T extends IEaasiResource>(
		results: T[],
		query: IResourceSearchQuery,
		bookmarks: IBookmark[],
		userResources: UserImportedContent[] | UserImportedImage[]
	): IEaasiSearchResponse<T> {

		if(!results || !results.length) {
			return { result: [], totalResults: 0 };
		}

		if (query.archives && query.archives.length > 0 && results[0].resourceType !== 'Image') {
			results = results.filter(sw => query.archives.includes(sw.archiveId));
		}

		if (bookmarks && query.onlyBookmarks) {
			if (results[0].resourceType === 'Environment') {
				// @ts-ignore
				results = results.filter(resource => bookmarks.some(b => b.resourceId === resource.envId));
			} else {
				results = results.filter(resource => bookmarks.some(b => b.resourceId === resource.id));
			}
		}

		if(userResources && (query.onlyImportedResources || (results.length && results[0].resourceType === resourceTypes.CONTENT))) {
			results = results.filter(r => userResources.some(ir => ir.eaasiId === r.id));
		}

		if (results.length && query.keyword) {
			results = this.filterByKeyword<T>(results, query.keyword);
		}

		if (results.length && query.selectedFacets.some(f => f.values.some(v => v.isSelected))) {
			results = this.filterByFacets<T>(results, query.selectedFacets);
		}

		if (results.length && query.sortCol) {
			results = results.sort((a, b) => {
				const nameA = a.title ? a.title.toLowerCase() : a.label ? a.label.toLowerCase() : '';
				const nameB = b.title ? a.title.toLowerCase() : b.label ? b.label.toLowerCase() : '';
				let comparison = 0;
				if (nameA > nameB) comparison = 1;
				else if (nameA < nameB) comparison = -1;
				return query.descending ? comparison : comparison * -1;
			});
		}

		return {
			result: results,
			totalResults: results.length
		}
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

	private populateFacets (
		resources: IEaasiResource[],
	): IResourceSearchFacet[] {
		const facets: IResourceSearchFacet[] = [
			{ displayLabel: 'Resource Types', name: 'resourceType', values: [] },
			{ displayLabel: 'Network Status', name: 'archive', values: [] },
			{ displayLabel: 'Environment Type', name: 'envType', values: [] },
			{ displayLabel: 'Source Organization', name: 'owner', values: [] },
			{ displayLabel: 'Source Location', name: 'archiveId', values: [] },

			{ displayLabel: 'Operating System', name: 'os', values: [] },
			{ displayLabel: 'Emulator', name: 'emulator', values: [] },
		];
		return facets.map(facet => this.populateFacetValues(resources, facet));
	};

	private populateFacetValues(resources: IEaasiResource[], facet: IResourceSearchFacet) {
		resources.forEach(resource => {
			if (!resource[facet.name]) return;
			let value = facet.values.find(x => x.label === resource[facet.name]);
			if(!value) {
				facet.values.push({
					label: resource[facet.name],
					total: 1,
					isSelected: false,
					displayLabel: this.getDisplayLabelForFacet(facet.name, resource[facet.name]),
					resourceType: resource.resourceType
				});
			} else {
				value.total++;
			}
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

	private getDisplayLabelForFacet(facetName: string, facetValue: string): string {
		switch (facetName) {
			case 'archive':
				if (facetValue === archiveTypes.DEFAULT) {
					return 'Private';
				} else if (facetValue === archiveTypes.PUBLIC) {
					return 'Saved Locally';
				} else if (facetValue === archiveTypes.REMOTE) {
					return 'Public';
				}
				break;
			case 'os':
				if (facetValue.toLowerCase().indexOf('os:') >= 0) {
					const facetArr = facetValue.split(':');
					let osLabel = `${facetArr[1]} ${facetArr[2]}`;
					if (facetArr[3]) {
						osLabel += ` ${facetArr[3]}`;
					}
					return osLabel;
				}
				break;
		}
		return null;
	}

	private filterByKeyword<T extends IEaasiResource>(resources: T[], keyword: string): T[] {
		return filterResourcesByKeyword(resources, keyword) as T[];
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
			facet.values.forEach(value => {
				const currentFacet = query.selectedFacets.find(f => f.name === facet.name);
				if (currentFacet) {
					let selectedValue = currentFacet.values.find(v => v.label === value.label && v.isSelected)
					if (selectedValue) value.isSelected = true;
				}
			})
		})
	}

}
