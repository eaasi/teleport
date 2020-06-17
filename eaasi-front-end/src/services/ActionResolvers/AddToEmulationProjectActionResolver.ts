import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEaasiResource} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class AddToEmulationProjectActionResolver extends SlideMenuActionResolver {
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
			shortName: 'addToEmuProject',
			label: 'Add to Emulation Project',
			description: 'Add this resource to my emulation project',
			icon: 'paperclip',
			isEnabled: false
		};
	}
}

