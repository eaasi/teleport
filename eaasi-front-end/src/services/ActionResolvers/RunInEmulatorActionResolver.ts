import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import { IEnvironment } from '@/types/Resource';
import { IAction } from 'eaasi-nav';

export default class RunInEmulatorActionResolver extends SlideMenuActionResolver {
	activeResources: IEnvironment[];
	userRoleId: number
	action: IAction;

	constructor(activeResources: IEnvironment[], roleId: number) {
		super(activeResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	resolveAction() : IAction {
		// Disabled if resource is int a single public resource
		return {
			shortName: 'run',
			label: 'Run in Emulator',
			description: 'Emulate this resource without changes',
			icon: 'power-off',
			isEnabled: super.isSinglePublicResource()
		};
	}
}
