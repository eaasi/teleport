import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEaasiResource} from '@/types/Resource';
import {IAction} from 'eaasi-nav';
import {translatedIcon} from '@/utils/constants';

export default class SaveToMyNodeActionResolver extends SlideMenuActionResolver {
	selectedResources: IEaasiResource[];
	userRoleId: number;

	constructor(selectedResources: IEaasiResource[], roleId: number) {
		super(selectedResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	get action() : IAction {
		return {
			shortName: 'save',
			label: 'Save to My Node',
			description: 'Make this resource available to all users of my node',
			icon: translatedIcon('cloud-download'),
			isEnabled: super.isSingleRemoteResource()
		};
	}
}


