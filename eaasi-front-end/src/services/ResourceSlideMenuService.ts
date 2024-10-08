import AddToEmulationProjectActionResolver
	from '@/services/ActionResolvers/AddToEmulationProjectActionResolver';
/*import BookmarkResourceActionResolver
	from '@/services/ActionResolvers/BookmarkResourceActionResolver';*/
import DeleteResourceActionResolver from '@/services/ActionResolvers/DeleteResourceActionResolver';
import ShareResourceActionResolver
	from '@/services/ActionResolvers/ShareResourceActionResolver';
import RunInEmulatorActionResolver from '@/services/ActionResolvers/RunInEmulatorActionResolver';
import ViewDetailsActionResolver from '@/services/ActionResolvers/ViewDetailsActionResolver';
import { IEaasiResource } from '@/types/Resource';
import { userRoles } from '@/utils/constants';


/**
 * Provides Resource Slide Menu Behavior
 */
export default class ResourceSlideMenuService {

	/**
	 * Implements Action Resolvers to determine the state of Local Actions
	 * @param selected: Selected Resources
	 * @param roleId: Logged-in User RoleID
	 */
	getLocalActions(selected: IEaasiResource[], roleId: number) {
		return  [
			new ViewDetailsActionResolver(selected, roleId).action,
			new RunInEmulatorActionResolver(selected, roleId).resolveAction(),
			//new BookmarkResourceActionResolver(selected, roleId).resolveAction(),
			new AddToEmulationProjectActionResolver(selected, roleId).resolveAction(),
		];
	}

	/**
	 * Implements Action Resolvers to determine the state of Node Actions
	 * @param selected: Selected Resources
	 * @param roleId: Logged-in User RoleID
	 */
	getNodeActions(selected: IEaasiResource[], roleId: number) {
		const nodeActions = [];
		if ([userRoles.ADMIN, userRoles.MANAGER].includes(roleId)) {
			nodeActions.push(
				new ShareResourceActionResolver(selected, roleId).resolveAction(),
				new DeleteResourceActionResolver(selected, roleId).resolveAction()
			);
		}
		else if (roleId == userRoles.CONTRIBUTOR) {
			nodeActions.push(
				new DeleteResourceActionResolver(selected, roleId).resolveAction()
			);
		}

		return nodeActions;
	}
}
