import { IEaasiResource } from '@/types/Resource';
import { IAction } from 'eaasi-nav';

export default class ResourceSlideMenuService {

	BOOKMARK_RESOURCE: IAction = {
		label: 'Bookmark This Resource',
		description: 'Add resource to my bookmarks in my resources',
		icon: 'bookmark',
	}

	ADD_TO_EMULATION_PROJECT: IAction = {
		label: 'Add to Emulation Project',
		description: 'Emulate this resource without changes',
		icon: 'paperclip'
	}

	VIEW_DETAILS: IAction = {
		label: 'View Details',
		description: 'Review full resource details',
		icon: 'file-alt',
	}

	RUN_IN_EMULATOR: IAction = {
		label: 'Run in Emulator',
		description: 'Emulate this resource without changes',
		icon: 'power-off',
	}

	getLocalActions(activeResources: IEaasiResource[]) {
		let localActions = [];

		if (activeResources.length === 1) {
			localActions.push(this.VIEW_DETAILS, this.RUN_IN_EMULATOR);
		}

		localActions.push( this.BOOKMARK_RESOURCE, this.ADD_TO_EMULATION_PROJECT );

		return localActions;
	}
}