import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class BookmarkResourceActionResolver extends  SlideMenuActionResolver {
	activeResources: IEnvironment[];
	userRoleId: number

	constructor(activeResources: IEnvironment[], roleId: number) {
		super(activeResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	resolveAction() : IAction {
		return {
			shortName: 'bookmark',
			label: 'Bookmark This Resource',
			description: 'Add resource to my bookmarks in my resources',
			icon: 'bookmark',
			isEnabled: true
		};
	}
}
