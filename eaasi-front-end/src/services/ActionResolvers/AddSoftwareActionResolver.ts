import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import { IEaasiResource } from '@/types/Resource';
import { IAction } from 'eaasi-nav';

export default class AddSoftwareActionResolver extends SlideMenuActionResolver {
	selectedResources: IEaasiResource[];
	userRoleId: number;

	constructor(selectedResources: IEaasiResource[], roleId: number) {
		super(selectedResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	get action() : IAction {
		// Disabled if resource is int a single public resource
		return {
			shortName: 'add-software',
			label: 'Add Software',
			description: 'Combine software with this environment',
			icon: 'plus',
			isEnabled: super.isSinglePublicResource() || super.isSingleDefaultResource()
		};
	}
}
