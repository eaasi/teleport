import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';

export default class PublishToNetworkActionResolver extends SlideMenuActionResolver {
	activeResources: IEnvironment[];
	userRoleId: number

	constructor(activeResources: IEnvironment[], roleId: number) {
		super(activeResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	get action() {
		return {
			shortName: 'publish',
			label: 'Publish to Network',
			description: 'Make this resource available to all users of my node.',
			icon: 'cloud-upload',
			isEnabled: false  // TODO: Activate when feature is enabled
		};
	}
}

