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
			return resource.envId;;
		default:
			return resource.id;
	}
}

export function filterResourcesByKeyword(resources: IEaasiResource[], keyword: string) {
	keyword = keyword.toLowerCase();
	return resources.filter(resource => {
		const resourceLabel = getResourceLabel(resource).toLowerCase();
		const resourceId = getResourceId(resource);
		return resourceLabel.indexOf(keyword) > -1 || resourceId == keyword;
	});
}