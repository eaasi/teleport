import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import { IEaasiResource } from '@/types/Resource';
import { IAction } from 'eaasi-nav';

export default class TreatAsSoftwareActionResolver extends SlideMenuActionResolver {
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
			shortName: 'treat-as-software',
			label: 'Treat as Software',
			description: 'Add this content to a software repository',
			icon: 'plus',
			isEnabled: super.isResourceDetailPage()
		};
	}
}
