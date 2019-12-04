import { IResourceSearchFacet, IEaasiSearchResponse } from '@/types/Search';
import { IEaasiResource } from '@/types/Resource';

export const populateFacets = (
	environments: IEaasiSearchResponse<IEaasiResource>,
	software: IEaasiSearchResponse<IEaasiResource>,
	content: IEaasiSearchResponse<IEaasiResource>
): IResourceSearchFacet[] =>  {
	const facets: IResourceSearchFacet[] = [
		{ displayLabel: 'Resource Types', name: 'resourceType', values: [] },
		{ displayLabel: 'Network Status', name: 'archive', values: [] },
		{ displayLabel: 'Environment Type', name: 'envType', values: [] },
		{ displayLabel: 'Source Organization', name: 'owner', values: [] },
		{ displayLabel: 'Source Location', name: 'archiveId', values: [] },
	];
	facets.forEach(facet => {
		if (environments) facet = getFacet(environments, facet);
		if (software) facet = getFacet(software, facet);
		if (content) getFacet(content, facet);
	});
	return facets;
};

function getFacet(resource: IEaasiSearchResponse<IEaasiResource>, facet: IResourceSearchFacet) {
	resource.result.forEach(r => {
		if (r[facet.name] == null) return facet;
		const value = facet.values.find(v => v.label === r[facet.name]);
		value ? facet.values.forEach(v => v.label === value.label && v.total++)
			: facet.values.push({ label: r[facet.name], total: 1, isSelected: false });
	});
	return facet;
}