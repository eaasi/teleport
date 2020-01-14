import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEnvironment} from '@/types/Resource';

export default class PublishToNetworkActionResolver extends SlideMenuActionResolver {
	selectedResources: IEnvironment[];
	userRoleId: number

	constructor(selectedResources: IEnvironment[], roleId: number) {
		super(selectedResources, roleId);
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
			isEnabled: super.areOnlyDefaultResources()
		};
	}
}

