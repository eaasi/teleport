import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

/**
 * Resolves an Action on a SlideMenuAction
 *
 * Encapsulates logic required to determine the state of any Action, such as whether or not
 * an action is enabled.
 */
export default class SlideMenuActionResolver {
	activeResources: IEnvironment[];
	userRoleId: number
	action: IAction;

	constructor(activeResources: IEnvironment[], roleId: number) {
		this.activeResources = activeResources;
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
		return this.activeResources.length === 1;
	}

	isSinglePublicResource() : boolean {
		return this.isSingleSelected()
			&& this.activeResources[0].archive === 'public';
	}

	isSingleRemoteResource() {
		return this.isSingleSelected()
			&& this.activeResources[0].archive === 'remote';
	}

	isUserAdmin() : boolean {
		return this.userRoleId === 1;
	}
}
