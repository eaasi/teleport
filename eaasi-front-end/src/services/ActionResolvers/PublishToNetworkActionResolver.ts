import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';

export default class PublishToNetworkActionResolver extends SlideMenuActionResolver {
	activeResources: IEnvironment[];
	userRoleId: number
	action: IAction;

	constructor(activeResources: IEnvironment[], roleId: number) {
		super(activeResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	resolveAction() {
		return {
			shortName: 'publish',
			label: 'Publish To Network',
			description: 'Make this resource available to all users of my node.',
			icon: 'cloud-upload',
			isEnabled: false  // TODO: Activate when feature is enabled
		};
	}
}

