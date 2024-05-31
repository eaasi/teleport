import { ResourceSearchResponse } from '@/models/resource/ResourceSearchResponse';
import { IObjectClassificationRequest } from '@/types/emil/Emil';
import { IContentItem } from '@/types/emil/EmilContentData';
import { IEnvironment, IImageListItem } from '@/types/emil/EmilEnvironmentData';
import { ISoftwareDescription, ISoftwarePackage } from '@/types/emil/EmilSoftwareData';
import { IBookmark } from '@/types/resource/Bookmark';
import { IEaasiResource, IEaasiSearchQuery, IEaasiSearchResponse, IOverrideContentRequest, IResourceSearchFacet, IResourceSearchQuery, IResourceSearchResponse, ResourceType } from '@/types/resource/Resource';
import { archiveTypes, resourceTypes } from '@/utils/constants';
import { filterResourcesByKeyword } from '@/utils/resource.util';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';
import EaasiBookmarkService from '../rest-api/EaasiBookmarkService';
import ContentService from './ContentService';
import EnvironmentService from './EnvironmentService';
import SoftwareService from './SoftwareService';
import KeycloakService from '@/services/keycloak/KeycloakService';

const EMPTY_SEARCH_RESPONSE: IEaasiSearchResponse<any> = {
	result: [],
	totalResults: 0,
};

export default class ResourceAdminService extends BaseService {

	private readonly _environmentService: EnvironmentService;
	private readonly _softwareService: SoftwareService;
	private readonly _contentService: ContentService;
	private readonly _emilClassificationService: EmilBaseService;
	private readonly _bookmarkService: EaasiBookmarkService;
	private readonly _keycloakService: KeycloakService;

	constructor(
		environmentService: EnvironmentService = new EnvironmentService(),
		softwareService: SoftwareService = new SoftwareService(),
		contentService: ContentService = new ContentService(),
		emilClassificationService: EmilBaseService = new EmilBaseService('classification'),
		bookmarkService: EaasiBookmarkService = new EaasiBookmarkService(),
		keycloakService: KeycloakService = new KeycloakService()
	) {
		super();
		this._emilClassificationService = emilClassificationService;
		this._bookmarkService = bookmarkService;
		this._environmentService = environmentService;
		this._softwareService = softwareService;
		this._contentService = contentService;
		this._keycloakService = keycloakService;
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
			content: IContentItem[],
			images: IImageListItem[];

		[environments, software, content, images] = await Promise.all([
			this._environmentService.getAll(token),
			this._softwareService.getAll(token),
			this._contentService.getAll('zero conf', token),
			this._environmentService.getImages(token),
		]);

		return [...environments, ...software, ...content, ...images] as IEaasiResource[];
	}

	/*============================================================
	 == Searching
	/============================================================*/

	/**
	 * Searches Environment, Software, and Content Resources using the  provided IResourceSearchQuery
	 * @param query
	 * @param userId
	 * @param token
	 */
	async searchResources(query: IResourceSearchQuery, userId: string, token: string): Promise<IResourceSearchResponse> {
		let result = new ResourceSearchResponse();
		let bookmarksResponse: ICrudServiceResult<IBookmark[]>;

		// pre-process received search parameters
		query = this.prepareSearchQuery(query);

		[bookmarksResponse] = await Promise.all([
			this._bookmarkService.getByUserID(userId)
		])

		const bookmarks: IBookmark[] = bookmarksResponse.result ? bookmarksResponse.result as IBookmark[] : [];

		[result.environments, result.software, result.content, result.images] = await Promise.all([
			this._searchEnvironments(query, bookmarks, token),
			this._searchSoftware(query, bookmarks, token),
			this._searchContent(query, bookmarks, token),
			this._searchImages(query, bookmarks, token)
		])

		result.facets = await this.populateFacets([
			...result.environments.result,
			...result.software.result,
			...result.content.result,
			...result.images.result
		], token);

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
		token: string,
		forceClearCache: boolean = false
	): Promise<IEaasiSearchResponse<IEnvironment>> {
		if (!query.types.includes(resourceTypes.ENVIRONMENT)) {
			return EMPTY_SEARCH_RESPONSE;
		}

		let allEnvironments = await this._environmentService.getAll(token, forceClearCache);
		return this._filterResults(allEnvironments, query, bookmarks);
	}

	private async _searchSoftware (
		query: IResourceSearchQuery,
		bookmarks: IBookmark[],
		token: string
	): Promise<IEaasiSearchResponse<ISoftwareDescription>> {
		if (!query.types.includes(resourceTypes.SOFTWARE)) {
			return EMPTY_SEARCH_RESPONSE;
		}

		let softwareRes = await this._softwareService.getAll(token);
		return this._filterResults(softwareRes, query, bookmarks);
	}

	private async _searchContent (
		query: IResourceSearchQuery,
		bookmarks: IBookmark[],
		token: string
	): Promise<IEaasiSearchResponse<IContentItem>> {
		if (!query.types.includes(resourceTypes.CONTENT)) {
			return EMPTY_SEARCH_RESPONSE;
		}

		const archives = (query.archives && query.archives.length > 0) ? query.archives :
				(await this._contentService.getObjectArchives(token)).archives;

		const results = archives.map(name => this._contentService.getAll(name, token));
		const content = (await Promise.all(results)).flat();
		return this._filterResults(content, query, bookmarks);
	}

	private async _searchImages (
		query: IResourceSearchQuery,
		bookmarks: IBookmark[],
		token: string
	): Promise<IEaasiSearchResponse<IImageListItem>> {
		if (!query.types.includes(resourceTypes.IMAGE)) {
			return EMPTY_SEARCH_RESPONSE;
		}

		let images = await this._environmentService.getImages(token);
		return this._filterResults(images, query, bookmarks);
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
	async saveContent(contentOverride: IOverrideContentRequest, token: string) {
		let res = await this._emilClassificationService.post('overrideObjectCharacterization', contentOverride, token);
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
	async classify(classifyRequest: IObjectClassificationRequest, token: string) {
		if(!classifyRequest) throw 'Did not receive Classification Request.';
		let response = await this._emilClassificationService.post('', classifyRequest, token);
		return await response.json();
	}

	/*============================================================
	 == Helpers
	/============================================================*/

	private prepareSearchQuery(query: IResourceSearchQuery): IResourceSearchQuery {
		if (!query) {
			return {} as IResourceSearchQuery;
		}

		if (query.onlyImportedResources) {
			// NOTE: software packages and objects are stored in user-private archives,
			//       which currently are identified by names of the form 'user-<USER-ID>'
			query.archives = ['user-' + query.userId];

			// NOTE: currently only the following resources are considered "user-importable"!
			if (!query.types || !query.types.length) {
				query.types = [
					resourceTypes.SOFTWARE,
					resourceTypes.CONTENT,
					resourceTypes.IMAGE,
				];
			}
			else {
				query.types = query.types.filter(t => t !== resourceTypes.ENVIRONMENT);
			}
		}

		if (!query.types || !query.types.length) {
			query.types = [
				resourceTypes.ENVIRONMENT,
				resourceTypes.SOFTWARE,
				resourceTypes.CONTENT,
				resourceTypes.IMAGE,
			];
		}

		return query;
	}

	private _filterResults<T extends IEaasiResource>(
		results: T[],
		query: IResourceSearchQuery,
		bookmarks: IBookmark[]
	): IEaasiSearchResponse<T> {
		if(!results || !results.length) {
			return EMPTY_SEARCH_RESPONSE;
		}

		const resultResourceType: ResourceType = results[0].resourceType;
		if (query.archives && query.archives.length > 0) {
			// NOTE: no need to filter content objects again here, because these
			//       are expected to be fetched only from requested archives!
			switch (resultResourceType) {
				case resourceTypes.SOFTWARE: {
					results = results.filter(sw => query.archives.includes(sw.archiveId));
					break;
				}
				case resourceTypes.ENVIRONMENT: {
					results = results.filter(env => query.archives.includes(env.archive));
					break;
				}
			}
		}

		if (bookmarks && query.onlyBookmarks) {
			if (resultResourceType === resourceTypes.ENVIRONMENT) {
				// @ts-ignore
				results = results.filter(resource => bookmarks.some(b => b.resourceId === resource.envId));
			} else {
				results = results.filter(resource => bookmarks.some(b => b.resourceId === resource.id));
			}
		}

		if (query.keyword) {
			results = this.filterByKeyword<T>(results, query.keyword);
		}

		if (query.selectedFacets.some(f => f.values.some(v => v.isSelected))) {
			results = this.filterByFacets<T>(results, query.selectedFacets);
		}

		if (query.sortCol) {
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

	private async populateFacets (
		resources: IEaasiResource[],
		token: string
	): Promise<IResourceSearchFacet[]> {
		const facets: IResourceSearchFacet[] = [
			{ displayLabel: 'Resource Types', name: 'resourceType', values: [] },
			{ displayLabel: 'Network Status', name: 'archive', values: [] },
			{ displayLabel: 'Environment Type', name: 'envType', values: [] },
			{ displayLabel: 'Source Organization', name: 'owner', values: [] },
			// Removed as currently don't show any meaningful information
			/*{ displayLabel: 'Source Location', name: 'archiveId', values: [] },*/

			{ displayLabel: 'Operating System', name: 'os', values: [] },
			{ displayLabel: 'Emulator', name: 'emulator', values: [] },
		];
		return await Promise.all(facets.map(facet => this.populateFacetValues(resources, facet, token)));
	};

	private async populateFacetValues(resources: IEaasiResource[], facet: IResourceSearchFacet, token: string) {
		for (const resource of resources) {
			if (!resource[facet.name]) continue;
			let value = facet.values.find(x => x.label === resource[facet.name]);
			if(!value) {
				facet.values.push({
					label: resource[facet.name],
					total: 1,
					isSelected: false,
					displayLabel: await this.getDisplayLabelForFacet(facet.name, resource[facet.name], token),
					resourceType: resource.resourceType
				});
			} else {
				value.total++;
			}
		}
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

	private async getDisplayLabelForFacet(facetName: string, facetValue: string, token: string): Promise<string> {
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
			case 'owner':
				return await this._keycloakService.getOwnerLabel(facetValue, token);
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
