import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class BookmarkResourceActionResolver extends  SlideMenuActionResolver {
	selectedResources: IEnvironment[];
	userRoleId: number;

	constructor(selectedResources: IEnvironment[], roleId: number) {
		super(selectedResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	get action() : IAction {
		return {
			shortName: 'bookmark',
			label: 'Bookmark This Resource',
			description: 'Add resource to my bookmarks in my resources',
			icon: 'bookmark',
			isEnabled: true
		};
	}
}
