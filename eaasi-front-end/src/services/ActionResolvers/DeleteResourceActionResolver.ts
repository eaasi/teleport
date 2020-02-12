import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import { IEnvironment } from '@/types/Resource';
import { IAction } from 'eaasi-nav';

export default class DeleteResourceActionResolver extends SlideMenuActionResolver {
	selectedResources: IEnvironment[];
	userRoleId: number;

	constructor(selectedResources: IEnvironment[], roleId: number) {
		super(selectedResources, roleId);
	}


	/**
	 * Resolves custom behavior of an action
	 */
	get action() : IAction {
		const permit = new PermissionResolver(this.userRoleId);
		// Active only for admin users
		return {
			shortName: 'delete',
			label: 'Delete',
			description: 'Delete this resource',
			icon: 'trash-alt',
			isEnabled: permit.allowsDeleteLocalResourcesFromNode()
				&& super.isDeletableArchive()
				&& !super.isAnySoftwareSelected()
		};
	};
}

