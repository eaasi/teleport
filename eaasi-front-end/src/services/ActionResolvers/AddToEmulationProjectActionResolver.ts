import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class AddToEmulationProjectActionResolver extends  SlideMenuActionResolver {
	selectedResources: IEnvironment[];
	userRoleId: number

	constructor(selectedResources: IEnvironment[], roleId: number) {
		super(selectedResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	get action() : IAction {
		return {
			shortName: 'addToEmuProject',
			label: 'Add to Emulation Project',
			description: 'Emulate this resource without changes',
			icon: 'paperclip',
			isEnabled: true
		};
	}
}

