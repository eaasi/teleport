import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

/**
 * Resolves an Action on a SlideMenuAction
 *
 * Encapsulates logic required to determine the state of any Action, such as whether or not
 * an action is enabled.
 */
export default class SlideMenuActionResolver {
	selectedResources: IEnvironment[];
	userRoleId: number;
	action: IAction;

	constructor(selectedResources: IEnvironment[], roleId: number) {
		this.selectedResources = selectedResources;
		this.userRoleId = roleId;
	}

	/**
	 * Resolves custom behavior of an action
	 * This method should be overidden by child classes if the child resolver changes the state
	 * of the action
	 */
	resolveAction() {
		return this.action;
	}

	isSingleSelected() : boolean {
		return this.selectedResources.length === 1;
	}

	isSinglePublicResource() : boolean {
		return this.isSingleSelected()
			&& this.selectedResources[0].archive === 'public';
	}

	isSingleDefaultResource() : boolean {
		return this.isSingleSelected()
			&& this.selectedResources[0].archive === 'default';
	}

	isSingleRemoteResource() {
		return this.isSingleSelected()
			&& this.selectedResources[0].archive === 'remote';
	}

	isUserAdmin() : boolean {
		return this.userRoleId === 1;
	}
}
