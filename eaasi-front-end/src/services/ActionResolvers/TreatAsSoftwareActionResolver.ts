import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import { IEnvironment } from '@/types/Resource';
import { IAction } from 'eaasi-nav';

export default class TreatAsSoftwareActionResolver extends SlideMenuActionResolver {
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
			shortName: 'treat-as-software',
			label: 'Treat as Software',
			description: 'Add this content to a software repository',
			icon: 'plus',
			isEnabled: super.isResourceDetailPage()
		};
	}
}
