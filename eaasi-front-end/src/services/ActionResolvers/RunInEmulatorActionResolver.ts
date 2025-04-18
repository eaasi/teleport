/*
import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import { IEaasiResource } from '@/types/Resource';
import { IAction } from 'eaasi-nav';
import {translatedIcon} from '@/utils/constants';

export default class RunInEmulatorActionResolver extends SlideMenuActionResolver {
	selectedResources: IEaasiResource[];
	userRoleId: number;

	constructor(selectedResources: IEaasiResource[], roleId: number) {
		super(selectedResources, roleId);
	}

	/!**
	 * Resolves custom behavior of an action
	 *!/
	get action() : IAction {
		// Disabled if resource is int a single public resource
		return {
			shortName: 'run',
			label: 'Run in Emulator',
			description: 'Emulate this resource without changes',
			icon: translatedIcon('power'),
			isEnabled: super.isEnvironment() && (super.isSinglePublicResource() || super.isSingleDefaultResource())
		};
	}
}
*/
