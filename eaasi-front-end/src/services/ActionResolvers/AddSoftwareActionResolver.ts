import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import { IEnvironment } from '@/types/Resource';
import { IAction } from 'eaasi-nav';

export default class AddSoftwareActionResolver extends SlideMenuActionResolver {
	selectedResources: IEnvironment[];
	userRoleId: number;

	constructor(selectedResources: IEnvironment[], roleId: number) {
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
			isEnabled: super.isResourceDetailPage() && (super.isSinglePublicResource() || super.isSingleDefaultResource())
		};
	}
}
