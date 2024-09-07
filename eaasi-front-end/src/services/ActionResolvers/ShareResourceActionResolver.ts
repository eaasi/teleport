import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEaasiResource} from '@/types/Resource';
import {translatedIcon} from '@/utils/constants';

export default class ShareResourceActionResolver extends SlideMenuActionResolver {
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
			label: 'Share this resource',
			description: 'Make this resource available to some users.',
			icon: translatedIcon('cloud-upload'),
			isEnabled: super.areOnlyPublishableResources()
		};
	}
}
