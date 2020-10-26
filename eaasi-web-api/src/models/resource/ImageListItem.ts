import { IContentItem } from '@/types/emil/EmilContentData';
import { EmulatorEntry, IImageListItem } from '@/types/emil/EmilEnvironmentData';
import { ResourceType } from '@/types/resource/Resource';
import { resourceTypes } from '@/utils/constants';

export default class ImageListItem implements IImageListItem {
	id: string;
	title: string;
	resourceType: ResourceType = resourceTypes.IMAGE;
	isPublic: boolean = false;
	
	constructor(emulatorEntry: EmulatorEntry) {
		this.id = emulatorEntry.image.id;
		this.title = emulatorEntry.label;
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