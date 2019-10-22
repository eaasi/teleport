import { IResourceSearchFacet, IEaasiSearchResponse } from '@/types/Search';
import { IEnvironment, IEaasiResource } from '@/types/Resource';

export const populateFacets = (
	environments: IEaasiSearchResponse<IEnvironment>,
	software: IEaasiSearchResponse<IEaasiResource>,
	content: IEaasiSearchResponse<IEaasiResource>
): IResourceSearchFacet[] =>  {
	const facets: IResourceSearchFacet[] = [
		{ displayLabel: 'Network Status', name: 'archive', values: [] },
		{ displayLabel: 'Environment Type', name: 'envType', values: [] },
		{ displayLabel: 'Source Organization', name: 'owner', values: [] },
		{ displayLabel: 'Source Location', name: 'archiveId', values: [] }
	];
	facets.forEach(facet => {
		if (environments) facet = getFacet(environments, facet);
		if (software) facet = getFacet(software, facet);
		if (content) facet = getFacet(content, facet);
    });
    facets.unshift({ displayLabel: 'Resource Types', name: 'resource-type', values: [
        { label: 'Environment', isSelected: false, total: environments.totalResults },
        { label: 'Content', isSelected: false, total: content.totalResults },
        { label: 'Software', isSelected: false, total: software.totalResults },
    ] })
	return facets;
};

function getFacet(resource: IEaasiSearchResponse<IEaasiResource>, facet: IResourceSearchFacet) {
	resource.result.forEach(e => {
		if (e[facet.name] == null) return facet;
		const value = facet.values.find(v => v.label === e[facet.name]);
		value ? facet.values.forEach(v => v.label === value.label && v.total++)
			: facet.values.push({ label: e[facet.name], total: 1, isSelected: false });
	});
	return facet;
}