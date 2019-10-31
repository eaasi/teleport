import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class DeleteResourceActionResolver extends SlideMenuActionResolver {
	selectedResources: IEnvironment[];
	userRoleId: number

	constructor(selectedResources: IEnvironment[], roleId: number) {
		super(selectedResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	get action() : IAction {
		// Active only for admin users
		return {
			shortName: 'delete',
			label: 'Delete',
			description: 'Delete this resource',
			icon: 'trash-alt',
			isEnabled: super.isUserAdmin()
		};
	};
}

