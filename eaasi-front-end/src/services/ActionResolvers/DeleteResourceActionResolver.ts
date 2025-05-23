import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import { IEaasiResource } from '@/types/Resource';
import { IAction } from 'eaasi-nav';
import {translatedIcon} from '@/utils/constants';

export default class DeleteResourceActionResolver extends SlideMenuActionResolver {
	selectedResources: IEaasiResource[];
	userRoleId: number;

	constructor(selectedResources: IEaasiResource[], roleId: number) {
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
			icon: translatedIcon('trash'),
			isEnabled: permit.allowsDeleteLocalResourcesFromNode()
				&& super.isDeletableArchive()
		};
	};
}

