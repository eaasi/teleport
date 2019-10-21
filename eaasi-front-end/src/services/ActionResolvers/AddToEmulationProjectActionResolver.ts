import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class AddToEmulationProjectActionResolver extends  SlideMenuActionResolver {
	activeResources: IEnvironment[];
	userRoleId: number

	constructor(activeResources: IEnvironment[], roleId: number) {
		super(activeResources, roleId);
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

