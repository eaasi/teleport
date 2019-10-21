import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class DeleteResourceActionResolver extends SlideMenuActionResolver {
	activeResources: IEnvironment[];
	userRoleId: number
	action: IAction;

	constructor(activeResources: IEnvironment[], roleId: number) {
		super(activeResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	resolveAction() {
		// Active only for admin users
		return {
			shortName: 'delete',
			label: 'Delete',
			description: 'Delete this resource',
			icon: 'trash-alt',
			isEnabled: super.isUserAdmin()
		};
	}
}

