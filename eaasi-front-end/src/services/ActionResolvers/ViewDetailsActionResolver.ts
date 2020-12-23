import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import { IEaasiResource } from '@/types/Resource';
import { IAction } from 'eaasi-nav';
import {translatedIcon} from '@/utils/constants';

export default class ViewDetailsActionResolver extends SlideMenuActionResolver {
	selectedResources: IEaasiResource[];
	userRoleId: number;

	constructor(selectedResources: IEaasiResource[], roleId: number) {
		super(selectedResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	get action() : IAction {
		// Disabled if more than one resource is selected
		return {
			shortName: 'viewDetails',
			label: 'View Details',
			description: 'Review full resource details',
			icon: translatedIcon('file'),
			isEnabled: super.isSingleSelected() && !super.isResourceDetailPage() && super.hasDetailsPage()
		};
	}
}
