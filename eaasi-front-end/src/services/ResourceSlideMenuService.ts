import { IEaasiResource } from '@/types/Resource';
import { IAction } from 'eaasi-nav';

export default class ResourceSlideMenuService {
	getLocalActions(activeResources: IEaasiResource[]) {
		let localActions = [];

		if (activeResources.length === 1) {
			localActions.push(this.VIEW_DETAILS, this.RUN_IN_EMULATOR);
		}

		localActions.push(this.BOOKMARK_RESOURCE, this.ADD_TO_EMULATION_PROJECT);

		return localActions;
	}

	getNodeActions(activeResources: IEaasiResource[]) {
		return [
			this.SAVE_TO_MY_NODE,
			this.PUBLISH_TO_NETWORK,
			this.SYNC_METADATA,
			this.DELETE_RESOURCE
		];
	}

	// Local Actions

	BOOKMARK_RESOURCE: IAction = {
		shortName: 'bookmark',
		label: 'Bookmark This Resource',
		description: 'Add resource to my bookmarks in my resources',
		icon: 'bookmark',
	}

	ADD_TO_EMULATION_PROJECT: IAction = {
		shortName: 'addToEmuProject',
		label: 'Add to Emulation Project',
		description: 'Emulate this resource without changes',
		icon: 'paperclip'
	}

	VIEW_DETAILS: IAction = {
		shortName: 'viewDetails',
		label: 'View Details',
		description: 'Review full resource details',
		icon: 'file-alt',
	}

	RUN_IN_EMULATOR: IAction = {
		shortName: 'run',
		label: 'Run in Emulator',
		description: 'Emulate this resource without changes',
		icon: 'power-off',
	}

	// Node Actions

	SAVE_TO_MY_NODE = {
		shortName: 'save',
		label: 'Save To My Node',
		description: 'Make this resource available to all users of my node',
		icon: 'cloud'
	}

	PUBLISH_TO_NETWORK = {
		shortName: 'publish',
		label: 'Publish To Network',
		description: 'Make this resource available to all users of my node.',
		icon: 'cloud-upload'
	}

	SYNC_METADATA = {
		shortName: 'syncMeta',
		label: 'Sync Metadata',
		description: 'Update resource with metadata from WikiData',
		icon: 'sync'
	}

	DELETE_RESOURCE = {
		shortName: 'delete',
		label: 'Delete',
		description: 'Delete this resource',
		icon: 'trash-alt'
	}

}