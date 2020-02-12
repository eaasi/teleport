import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class SaveToMyNodeActionResolver extends SlideMenuActionResolver {
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
			shortName: 'save',
			label: 'Save to My Node',
			description: 'Make this resource available to all users of my node',
			icon: 'cloud',
			isEnabled: super.isSingleRemoteResource()
		};
	}
}


