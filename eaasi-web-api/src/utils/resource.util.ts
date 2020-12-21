import { IEaasiResource } from '@/types/resource/Resource';
import { resourceTypes } from './constants';

export function getResourceLabel(resource: IEaasiResource): string {
	switch(resource.resourceType) {
		case resourceTypes.ENVIRONMENT:
			return resource.title;
		default:
			return resource.label;
	}
}

export function getResourceId(resource: IEaasiResource): string {
	switch(resource.resourceType) {
		case resourceTypes.ENVIRONMENT:
			return resource.envId;
		default:
			return resource.id;
	}
}

export function filterResourcesByKeyword(resources: IEaasiResource[], keyword: string) {
	if (!keyword) return resources;
	keyword = keyword.toLowerCase();
	return resources.filter(resource => {
		const resourceLabel = getResourceLabel(resource);
		const lowerCasedResourceLabel = resourceLabel ? resourceLabel.toLowerCase() : '';
		const resourceId = getResourceId(resource);
		return lowerCasedResourceLabel.indexOf(keyword) > -1 || resourceId.indexOf(keyword) > -1;
	});
}