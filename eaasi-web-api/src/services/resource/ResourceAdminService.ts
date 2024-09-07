import { ResourceSearchResponse } from '@/models/resource/ResourceSearchResponse';
import { IObjectClassificationRequest } from '@/types/emil/Emil';
import { IContentItem } from '@/types/emil/EmilContentData';
import { IEnvironment, IImageListItem } from '@/types/emil/EmilEnvironmentData';
import { ISoftwareDescription, ISoftwarePackage } from '@/types/emil/EmilSoftwareData';
import { IBookmark } from '@/types/resource/Bookmark';
import { IEaasiResource, IEaasiSearchQuery, IEaasiSearchResponse, IOverrideContentRequest, IResourceSearchFacet, IResourceSearchFacetValue, IResourceSearchQuery, IResourceSearchResponse, ResourceType } from '@/types/resource/Resource';
import { archiveTypes, resourceTypes } from '@/utils/constants';
import { filterResourcesByKeyword } from '@/utils/resource.util';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
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

		// pre-process received search parameters
		query = this.prepareSearchQuery(query);

		let bookmarks: IBookmark[] = [];
		if (query.onlyBookmarks) {
			const response = await this._bookmarkService.getByUserID(userId);
			if (response.result) {
				bookmarks = response.result as IBookmark[];
			}
		}

		const bookmarked = new Set<string>(bookmarks.map(bm => bm.resourceId));

		[result.environments, result.software, result.content, result.images] = await Promise.all([
			this._searchEnvironments(query, bookmarked, token),
			this._searchSoftware(query, bookmarked, token),
			this._searchContent(query, bookmarked, token),
			this._searchImages(query, bookmarked, token)
		])

		result.facets = await this.populateFacets([
			result.environments.result,
			result.software.result,
			result.content.result,
			result.images.result
		], query.selectedFacets, token);

		result.environments.result = this.paginate(query, result.environments.result);
		result.software.result = this.paginate(query, result.software.result);
		result.content.result = this.paginate(query, result.content.result);
		result.images.result = this.paginate(query, result.images.result);
		result.bookmarks = bookmarks;

		return result;
	}

	private async _searchEnvironments (
		query: IResourceSearchQuery,
		bookmarks: Set<string>,
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
		bookmarks: Set<string>,
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
		bookmarks: Set<string>,
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
		bookmarks: Set<string>,
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

		if (query.selectedFacets && query.selectedFacets.length > 0) {
			query.selectedFacets = this.prepareSearchFacets(query.selectedFacets);

			// convert selected resource-type facet to a corresponding types-array...
			const fpos = query.selectedFacets.findIndex(f => f.name === 'resourceType');
			if (fpos > 0) {
				const facet = query.selectedFacets.splice(fpos, 1)[0];
				query.types = facet.values.map(v => v.resourceType);
			}
		}
		else {
			query.selectedFacets = [];
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

		if (query.selectedFacets.length > 0) {
			// NOTE: requested resource-types should also be adjusted according to the compatible
			//       resource-types in selected facets, querying all other resources can be skipped!
			const seltypes = new Set<ResourceType>();
			query.selectedFacets.forEach(f => f.values.forEach(v => seltypes.add(v.resourceType)));
			query.types = query.types.filter(t => seltypes.has(t));
		}

		return query;
	}

	private prepareSearchFacets(facets: IResourceSearchFacet[]): IResourceSearchFacet[] {
		if (!facets || !facets.length) {
			return facets;
		}

		const numFacetsTotal = facets.length;
		let numValuesSkipped = 0;
		let numValuesTotal = 0;

		// remove all unselected facets...
		facets = facets.filter(facet => {
			const numValuesBefore = facet.values.length;
			facet.values = facet.values.filter(value => value.isSelected);
			numValuesSkipped += numValuesBefore - facet.values.length;
			numValuesTotal += numValuesBefore;
			return (facet.values.length > 0);
		});

		const numFacetsSkipped = numFacetsTotal - facets.length;
		if (numFacetsSkipped > 0 || numValuesSkipped > 0) {
			const message: string = `Skipped ${numValuesSkipped} out of ${numValuesTotal} value(s)`
					+ ` and ${numFacetsSkipped} out of ${numFacetsTotal} search facet(s)`;

			console.info(message);
		}

		return facets;
	}

	private _filterResults<T extends IEaasiResource>(
		results: T[],
		query: IResourceSearchQuery,
		bookmarks: Set<string>
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

		if (query.onlyBookmarks) {
			if (resultResourceType === resourceTypes.ENVIRONMENT) {
				// @ts-ignore
				results = results.filter(resource => bookmarks.has(resource.envId));
			} else {
				results = results.filter(resource => bookmarks.has(resource.id));
			}
		}

		if (query.keyword) {
			results = this.filterByKeyword<T>(results, query.keyword);
		}

		if (query.selectedFacets) {
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
		results: IEaasiResource[][],
		selfacets: IResourceSearchFacet[],
		token: string
	): Promise<IResourceSearchFacet[]> {
		const facets: IResourceSearchFacet[] = [
			{ displayLabel: 'Environment Type', name: 'envType', values: [] },
			{ displayLabel: 'Source Organization', name: 'owner', values: [] },
			// Removed as currently don't show any meaningful information

			{ displayLabel: 'Operating System', name: 'os', values: [] },
			{ displayLabel: 'Emulator', name: 'emulator', values: [] },
		];

		const rtfacet: IResourceSearchFacet = {
			displayLabel: 'Resource Type',
			name: 'resourceType',
			values: [],
		};

		// FIXME: facets should generally be compatible with multiple resource-types,
		//        but as-is can currently be generated for environments only!
		const frtypes = new Map<string, ResourceType[]>();
		facets.forEach(f => frtypes.set(f.name, [resourceTypes.ENVIRONMENT]));

		const valmaps = new Map<string, Map<string, IResourceSearchFacetValue>>();
		valmaps.set(rtfacet.name, new Map<string, IResourceSearchFacetValue>());
		facets.forEach(f => valmaps.set(f.name, new Map<string, IResourceSearchFacetValue>()));

		for (const resources of results) {
			if (!resources || !resources.length) {
				continue;
			}

			// populate resource-type facet...
			{
				// NOTE: we assume that all entries in each subarray are of the same resource-type,
				//       hence it's enough to just look at the first entry and skip all others!
				const resource = resources[0];
				const label = resource[rtfacet.name];
				const value: IResourceSearchFacetValue = {
					label: label,
					total: resources.length,
					resourceType: resource.resourceType,
					isSelected: false,
				};

				rtfacet.values.push(value);
				valmaps.get(rtfacet.name)
					.set(label, value);
			}

			const restype = resources[0].resourceType;

			// populate all other facets from each resource entry...
			for (const facet of facets) {
				const restypes = frtypes.get(facet.name);
				if (!restypes || !restypes.some(rt => rt === restype))
					continue;

				const valmap = valmaps.get(facet.name);
				await this.populateFacetValues(resources, facet, valmap, token);
			}
		}

		// pre-select new facet values...
		for (const f of selfacets) {
			const values = valmaps.get(f.name);
			if (!values)
				continue;

			for (const selval of f.values) {
				const value = values.get(selval.label);
				if (value)
					value.isSelected = selval.isSelected;
			}
		}

		facets.unshift(rtfacet);

		// finally, remove all empty facets...
		return facets.filter(f => f.values && f.values.length > 0);
	};

	private async populateFacetValues(resources: IEaasiResource[], facet: IResourceSearchFacet,
				valmap: Map<string, IResourceSearchFacetValue>, token: string) {
		for (const resource of resources) {
			const label = resource[facet.name];
			if (!label)
				continue;

			let value: IResourceSearchFacetValue = valmap.get(label);
			if(!value) {
				value = {
					label: label,
					total: 1,
					isSelected: false,
					displayLabel: await this.getDisplayLabelForFacet(facet.name, label, token),
					resourceType: resource.resourceType
				};

				facet.values.push(value);
				valmap.set(label, value);
			} else {
				value.total++;
			}
		}
	}

	private filterByFacets<T extends IEaasiResource>(resources: T[], selectedFacets: IResourceSearchFacet[]): T[] {
		if (!resources.length) return resources;

		const selectedFacetsOfType = this.selectedFacetsOfType(selectedFacets, resources[0].resourceType);
		if (!selectedFacetsOfType.length)
			return resources;

		return resources.filter(resource => {
			return selectedFacetsOfType.every(facet => {
				// NOTE: usually, only a single value per facet can be selected,
				//       hence iteration should be faster than set-lookups here!
				const curlabel: string = resource[facet.name];
				return facet.values.some(v => v.label === curlabel);
			});
		});
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
			const values = f.values.filter(v => v.resourceType === resourceType);
			selectedFacets.push({...f, values });
		});
		return selectedFacets;
	}
}
