import { IContentItem } from '@/types/emil/EmilContentData';
import { IImageListItem, ImageEntry } from '@/types/emil/EmilEnvironmentData';
import { ResourceType } from '@/types/resource/Resource';
import { resourceTypes } from '@/utils/constants';

export default class ImageListItem implements IImageListItem {
	id: string;
	title: string;
	resourceType: ResourceType = resourceTypes.IMAGE;
	isPublic: boolean = false;
	
	constructor(imageEntry: ImageEntry) {
		this.id = imageEntry.id;
		this.title = imageEntry.label;
	}

	toContent(): IContentItem {
		return {
			id: this.id,
			archiveId: null,
			label: this.title,
			title: this.title,
			resourceType: resourceTypes.CONTENT,
			isPublic: false,
		}
	}

}