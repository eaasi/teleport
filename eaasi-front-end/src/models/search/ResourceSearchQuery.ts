import { ResourceType } from '@/types/Resource';
import { IResourceSearchFacet, IResourceSearchQuery, ResourceArchive } from '@/types/Search';
import { MIN_SEARCH_RESULT_LIMIT } from '@/utils/constants';

export default class ResourceSearchQuery implements IResourceSearchQuery {
	selectedFacets: IResourceSearchFacet[] = [];
	archives: ResourceArchive[] = [];
	types: ResourceType[];
	keyword: string = null;
	limit: number = MIN_SEARCH_RESULT_LIMIT;
	page: number = 1;
	userId?: string;

	public static prepare(query: IResourceSearchQuery): IResourceSearchQuery {
		const newquery: IResourceSearchQuery = {
			...query,
			selectedFacets: ResourceSearchQuery.trimSearchFacets(query.selectedFacets),
		};

		return newquery;
	}

	private static trimSearchFacets(facets: IResourceSearchFacet[]): IResourceSearchFacet[] {
		if (!facets || !facets.length) {
			return [];
		}

		const numFacetsTotal = facets.length;
		let numValuesRemoved = 0;
		let numValuesTotal = 0;

		// remove all unselected facets...
		facets = facets.filter(facet => {
			const numValuesBefore = facet.values.length;
			facet.values = facet.values.filter(value => value.isSelected);
			numValuesRemoved += numValuesBefore - facet.values.length;
			numValuesTotal += numValuesBefore;
			return (facet.values.length > 0);
		});

		const numFacetsRemoved = numFacetsTotal - facets.length;
		if (numFacetsRemoved > 0 || numValuesRemoved > 0) {
			const message: string = `Removed ${numValuesRemoved} out of ${numValuesTotal} value(s)`
					+ ` and ${numFacetsRemoved} out of ${numFacetsTotal} search facet(s)`;

			console.info(message);
		}

		const numFacetsSelected = numFacetsTotal - numFacetsRemoved;
		const numValuesSelected = numValuesTotal - numValuesRemoved;
		if (numFacetsSelected > 0 || numValuesSelected > 0) {
			const message: string = `Selected ${numValuesSelected} out of ${numValuesTotal} value(s)`
					+ ` and ${numFacetsSelected} out of ${numFacetsTotal} search facet(s)`;

			console.info(message);
		}

		return facets;
	}
}