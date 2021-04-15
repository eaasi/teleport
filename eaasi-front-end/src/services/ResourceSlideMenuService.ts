import AddToEmulationProjectActionResolver from '@/services/ActionResolvers/AddToEmulationProjectActionResolver';
import BookmarkResourceActionResolver from '@/services/ActionResolvers/BookmarkResourceActionResolver';
import DeleteResourceActionResolver from '@/services/ActionResolvers/DeleteResourceActionResolver';
import PublishToNetworkActionResolver from '@/services/ActionResolvers/PublishToNetworkActionResolver';
import RunInEmulatorActionResolver from '@/services/ActionResolvers/RunInEmulatorActionResolver';
import SaveToMyNodeActionResolver from '@/services/ActionResolvers/SaveToMyNodeActionResolver';
import ViewDetailsActionResolver from '@/services/ActionResolvers/ViewDetailsActionResolver';
import { IEaasiResource } from '@/types/Resource';
import { resourceTypes } from '@/utils/constants';
import AddSoftwareActionResolver from './ActionResolvers/AddSoftwareActionResolver';
import TreatAsSoftwareActionResolver from './ActionResolvers/TreatAsSoftwareActionResolver';


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
		let localActions =  [
			new ViewDetailsActionResolver(selected, roleId).action,
			new RunInEmulatorActionResolver(selected, roleId).resolveAction(),
			new BookmarkResourceActionResolver(selected, roleId).resolveAction(),
			new AddToEmulationProjectActionResolver(selected, roleId).resolveAction()
		];
		if (selected.length === 1 && selected[0].resourceType !== resourceTypes.CONTENT) {
			localActions.push(new AddSoftwareActionResolver(selected, roleId).resolveAction());
		}
		return localActions;
	}

	/**
	 * Implements Action Resolvers to determine the state of Node Actions
	 * @param selected: Selected Resources
	 * @param roleId: Logged-in User RoleID
	 */
	getNodeActions(selected: IEaasiResource[], roleId: number) {
		return [
			new SaveToMyNodeActionResolver(selected, roleId).resolveAction(),
			new PublishToNetworkActionResolver(selected, roleId).resolveAction(),
			new DeleteResourceActionResolver(selected, roleId).resolveAction(),
		];
	}
}
