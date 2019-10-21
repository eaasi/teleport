import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class SlideMenuActionResolver {
	activeResources: IEnvironment[];
	userRoleId: number
	action: IAction;

	constructor(activeResources: IEnvironment[], roleId: number) {
		this.activeResources = activeResources;
		this.userRoleId = roleId;
		this.action = this.resolveAction();
	}

	/**
	 * Resolves custom behavior of an action
	 */
	resolveAction() {
		// Override this method with custom resolution behavior
		return this.action;
	}

	/**
	 * Returns true if a single Active Resource exists
	 */
	isSingleSelected() : boolean {
		return this.activeResources.length === 1;
	}

	/**
	 * Returns true if a single Active Resource whose archive is public
	 */
	isSinglePublicResource() : boolean {
		return this.isSingleSelected()
			&& this.activeResources[0].archive === 'public';
	}

	isSingleRemoteResource() {
		return this.isSingleSelected()
			&& this.activeResources[0].archive === 'remote';
	}

	/**
	 * Returns true if user has Admin UserRole
	 */
	isUserAdmin() : boolean {
		return this.userRoleId === 1;
	}
}
