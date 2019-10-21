import { IEnvironment } from '@/types/Resource';
import { IAction } from 'eaasi-nav';
import store from '@/store/admin-store';

export default class ResourceSlideMenuService {

	userRoleId = store.state.activeUser.roleId;

	/**
	 * Returns true if a User has any RoleID in 1, 2, 3
	 */
	isEnabledForAnyUserRole() {
		return [1, 2, 3].includes(this.userRoleId);
	}

	/**
	 * Returns true if a User has a RoleID of 1 or 2
	 */
	isEnabledForManagerRoleAndAbove() {
		return [1, 2].includes(this.userRoleId);
	}

	/**
	 * Returns true if a User has a RoleID of 1
	 */
	isEnabledForAdminRoleOnly() {
		return this.userRoleId === 1;
	}

	getLocalActions(activeResources: IEnvironment[]) {
		let localActions = [];

		// If only one resource is selected
		if (activeResources.length === 1) {

			// Show the View Details option
			localActions.push(this.VIEW_DETAILS);

			// If the resource is Saved, Show the option to Run in Emulator
			if (activeResources[0].archive === 'public') {
				localActions.push(this.RUN_IN_EMULATOR);
			}
		}

		localActions.push(this.BOOKMARK_RESOURCE, this.ADD_TO_EMULATION_PROJECT);

		return localActions;
	}

	getNodeActions(activeResources: IEnvironment[]) {
		let nodeActions = [];

		// If only one resource is selected
		if (activeResources.length === 1) {
			// If the resource is Saved, Show the option to Run in Emulator
			if (activeResources[0].archive !== 'public') {
				nodeActions.push(this.SAVE_TO_MY_NODE);
			}
		}

		nodeActions.push(this.PUBLISH_TO_NETWORK, this.DELETE_RESOURCE);

		return nodeActions;
	}

	// Local Actions

	BOOKMARK_RESOURCE: IAction = {
		shortName: 'bookmark',
		label: 'Bookmark This Resource',
		description: 'Add resource to my bookmarks in my resources',
		icon: 'bookmark',
		isEnabled: this.isEnabledForAnyUserRole()
	}

	ADD_TO_EMULATION_PROJECT: IAction = {
		shortName: 'addToEmuProject',
		label: 'Add to Emulation Project',
		description: 'Emulate this resource without changes',
		icon: 'paperclip',
		isEnabled: this.isEnabledForAnyUserRole()
	}

	VIEW_DETAILS: IAction = {
		shortName: 'viewDetails',
		label: 'View Details',
		description: 'Review full resource details',
		icon: 'file-alt',
		isEnabled: this.isEnabledForAnyUserRole()
	}

	RUN_IN_EMULATOR: IAction = {
		shortName: 'run',
		label: 'Run in Emulator',
		description: 'Emulate this resource without changes',
		icon: 'power-off',
		isEnabled: this.isEnabledForAnyUserRole()
	}

	// Node Actions

	SAVE_TO_MY_NODE: IAction = {
		shortName: 'save',
		label: 'Save To My Node',
		description: 'Make this resource available to all users of my node',
		icon: 'cloud',
		isEnabled: this.isEnabledForAnyUserRole()
	}

	PUBLISH_TO_NETWORK: IAction = {
		shortName: 'publish',
		label: 'Publish To Network',
		description: 'Make this resource available to all users of my node.',
		icon: 'cloud-upload',
		isEnabled: this.isEnabledForAnyUserRole()
	}

	DELETE_RESOURCE: IAction = {
		shortName: 'delete',
		label: 'Delete',
		description: 'Delete this resource',
		icon: 'trash-alt',
		isEnabled: this.isEnabledForAdminRoleOnly()
	}

}