import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class ViewDetailsActionResolver extends SlideMenuActionResolver {
	activeResources: IEnvironment[];
	userRoleId: number

	constructor(activeResources: IEnvironment[], roleId: number) {
		super(activeResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	resolveAction() : IAction {
		// Disabled if more than one resource is selected
		return {
			shortName: 'viewDetails',
			label: 'View Details',
			description: 'Review full resource details',
			icon: 'file-alt',
			isEnabled: super.isSingleSelected()
		};
	}
}
