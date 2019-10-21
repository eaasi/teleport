import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class SaveToMyNodeActionResolver extends SlideMenuActionResolver {
	activeResources: IEnvironment[];
	userRoleId: number

	constructor(activeResources: IEnvironment[], roleId: number) {
		super(activeResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	get action() : IAction {
		return {
			shortName: 'save',
			label: 'Save To My Node',
			description: 'Make this resource available to all users of my node',
			icon: 'cloud',
			isEnabled: super.isSingleRemoteResource()
		};
	}
}


