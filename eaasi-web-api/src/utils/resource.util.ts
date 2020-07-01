import { IEaasiResource } from '@/types/resource/Resource';
import { resourceTypes } from './constants';
import { ISoftwarePackage } from '@/types/emil/EmilSoftwareData';

export function getResourceLabel(resource: IEaasiResource) {
	switch(resource.resourceType) {
		case resourceTypes.SOFTWARE:
			return (resource as ISoftwarePackage).label;
		default:
			return resource.title;
	}
}

export function filterResourcesByKeyword(resources: IEaasiResource[], keyword: string) {
	keyword = keyword.toLowerCase();
	return resources.filter(resource => {
		return getResourceLabel(resource).toLowerCase().indexOf(keyword) > -1;
	});
}