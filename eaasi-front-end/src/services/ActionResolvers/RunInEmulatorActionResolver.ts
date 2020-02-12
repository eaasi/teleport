import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import { IEnvironment } from '@/types/Resource';
import { IAction } from 'eaasi-nav';

export default class RunInEmulatorActionResolver extends SlideMenuActionResolver {
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
			shortName: 'run',
			label: 'Run in Emulator',
			description: 'Emulate this resource without changes',
			icon: 'power-off',
			isEnabled: super.isSinglePublicResource() || super.isSingleDefaultResource()
		};
	}
}
