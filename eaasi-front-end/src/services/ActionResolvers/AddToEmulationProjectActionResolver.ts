import SlideMenuActionResolver from '@/services/ActionResolvers/SlideMenuActionResolver';
import {IEaasiResource, IEnvironment} from '@/types/Resource';
import {IAction} from 'eaasi-nav';
import {
	ENVIRONMENT_TYPES,
	resourceTypes,
	translatedIcon
} from '@/utils/constants';

export default class AddToEmulationProjectActionResolver extends SlideMenuActionResolver {
	selectedResources: IEaasiResource[];
	userRoleId: number;

	constructor(selectedResources: IEaasiResource[], roleId: number) {
		super(selectedResources, roleId);
	}

	/**
	 * Resolves custom behavior of an action
	 */
	get action() : IAction {
		return {
			shortName: 'addToEmuProject',
			label: 'Add to Emulation Project',
			description: 'Add this resource to my emulation project',
			icon: translatedIcon('paperclip'),
			isEnabled: this.selectedResources.every(resource => resource.resourceType !== resourceTypes.ENVIRONMENT
				|| (resource as IEnvironment).envType === ENVIRONMENT_TYPES.BASE),
			// isEnabled: self.selectedResources.some(resource => {
			// 	return self.projectResources.some(x => {
			// 		return (x.resourceType === resourceTypes.ENVIRONMENT && x.resourceId === resource.envId)
			// 			|| (x.resourceType !== resourceTypes.ENVIRONMENT && x.resourceId === resource.id);
			// 	});
			// })
		};
	}
}

