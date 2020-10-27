import { IEaasiResource } from '@/types/Resource';
import { archiveTypes, resourceTypes, userRoles } from '@/utils/constants';
import { IAction } from 'eaasi-nav';

/**
 * Resolves an Action on a SlideMenuAction
 *
 * Encapsulates logic required to determine the state of any Action, such as whether or not
 * an action is enabled.
 */
export default class SlideMenuActionResolver {
	selectedResources: IEaasiResource[];
	userRoleId: number;
	action: IAction;

	constructor(selectedResources: IEaasiResource[], roleId: number) {
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

	isResourceDetailPage(): boolean {
		let resourceId = this.selectedResources[0].id != null
			? this.selectedResources[0].id as string
			: this.selectedResources[0].envId;
		return window.location.href.indexOf(resourceId) > 0;
	}

	hasDetailsPage(): boolean {
		return this.selectedResources[0].resourceType !== resourceTypes.IMAGE;
	}

	isSinglePublicResource() : boolean {
		if(!this.isSingleSelected()) return false;
		return this.selectedResources[0].archive === 'public'
			|| this.selectedResources[0].isPublic === true;
	}

	isSingleDefaultResource() : boolean {
		return this.isSingleSelected()
			&& this.selectedResources[0].archive === 'default';
	}

	isSingleRemoteResource(): boolean {
		return this.isSingleSelected()
			&& this.selectedResources[0].archive === 'remote';
	}

	isUserAdmin() : boolean {
		return this.userRoleId === userRoles.ADMIN;
	}

	isDeletableArchive(): boolean {
		return !this.selectedResources.some(r => r.archiveId === 'Remote Objects' || r.archive === archiveTypes.REMOTE);
	}

	isAnyContentSelected(): boolean {
		return this.selectedResources.some(x => x.resourceType === resourceTypes.CONTENT);
	}

	isAnyRemoteSelected(): boolean {
		return this.selectedResources.some(x => x.archive === archiveTypes.REMOTE);
	}

	isAnySoftwareSelected(): boolean {
		return this.selectedResources.some(r => r.resourceType === resourceTypes.SOFTWARE);
	}

	areOnlyDefaultResources(): boolean {
		let resourceArchives = this.selectedResources.map(res => res.archive);
		return resourceArchives.every(v => v === 'default');
	}

	areOnlyPublishableResources(): boolean {
		if(this.isAnyContentSelected()) return false;
		return this.selectedResources.every((r) => {
			return (r.resourceType === resourceTypes.SOFTWARE && r.isPublic === false)
				|| (r.resourceType === resourceTypes.ENVIRONMENT && r.archive === 'default');
		});
	}
}
