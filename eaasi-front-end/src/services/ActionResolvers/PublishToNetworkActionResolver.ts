import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEaasiResource} from '@/types/Resource';

export default class PublishToNetworkActionResolver extends SlideMenuActionResolver {
	selectedResources: IEaasiResource[];
	userRoleId: number;

	constructor(selectedResources: IEaasiResource[], roleId: number) {
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
			isEnabled: super.areOnlyPublishableResources()
		};
	}
}

