import {userRoles} from '@/utils/constants';

/**
 * Resolves User Permission
 *
 * Encapsulates logic required to determine if a User may perform an action based on their Role
 */
export default class PermissionResolver {
	userRoleId: number;

	constructor(userRoleId: number) {
        this.userRoleId = userRoleId;
	}

	/**
	 * - Manage Node option appears in the side menu
	 */
	allowsViewManageOrganizationPage() : boolean {
		return [userRoles.ADMIN, userRoles.MANAGER, userRoles.CONTRIBUTOR]
			.includes(this.userRoleId);
	}

	/**
	 * - create / delete accounts
	 * - assign roles
	 */
	allowsManageOrganizationUsers() : boolean {
		return [userRoles.ADMIN, userRoles.MANAGER, userRoles.CONTRIBUTOR]
			.includes(this.userRoleId);
	}

	/**
	 * - environment object (bootable hard drive disk image containing: OS Only (Base Environment),
	 * 		OS and Software (Software Environment), OS, Software, Content (Object Environment))
	 * - emulators (containers provided by OpenSLX include emulator templates)
	 */
	allowsSingleEnvironmentImport() {
		return [userRoles.ADMIN, userRoles.MANAGER]
			.includes(this.userRoleId);
	}

	/**
	 * - Can delete resources from node (local only)
	 */
	allowsDeleteLocalResourcesFromNode() {
		return [userRoles.ADMIN, userRoles.MANAGER, userRoles.CONTRIBUTOR]
			.includes(this.userRoleId);
	}

	/**
	 * - add / edit / remove endpoints
	 * - set sync frequency
	 * - manually trigger sync
	 */
	canConfigureSynchronizationSettings() : boolean {
		return this.userRoleId === userRoles.ADMIN;
	}

	/**
	 * - configure cache management policies
	 * - view storage statistics
	 */
	canManageNodeStorage() : boolean {
		return this.userRoleId === userRoles.ADMIN;
	}

	/**
	 * - import Wikidata updates or trigger sync with Wikidata
	 * - approve / refuse conflicts between node data and Wikidata updates
	 */
	canUpdateNodeMetadata() {
		return this.userRoleId === userRoles.ADMIN;
	}

	/**
	 * - can import bulk software objects (file sets, disk images of CDs, floppies, HDDs)
	 */
	canImportBulkSoftwareObjects() {
		return [userRoles.ADMIN, userRoles.MANAGER]
			.includes(this.userRoleId);
	}

	/**
	 * - can create new base environment from scratch
	 */
	canCreateNewBaseEnvironment() {
		return [userRoles.ADMIN, userRoles.MANAGER]
			.includes(this.userRoleId);
	}

	/**
	 * - can edit all local node resources (environments, software, object environments)
	 */
	canEditMetaData() {
		return [userRoles.ADMIN, userRoles.MANAGER]
			.includes(this.userRoleId);
	}

	/**
	 * - Can publish software, environments to network
	 */
	canPublishToNetwork() {
		return [userRoles.ADMIN, userRoles.MANAGER]
			.includes(this.userRoleId);
	}

	/**
	 * - Can save software, environments data to local node storage from Network
	 */
	canSaveToNode() {
		return [userRoles.ADMIN, userRoles.MANAGER]
			.includes(this.userRoleId);
	}

	/**
	 * - Can import individual content and software objects
	 */
	canImportIndividualContentAndSoftwareResources() {
		return [userRoles.ADMIN, userRoles.MANAGER]
			.includes(this.userRoleId);
	}

	/**
	 * - Can add resources to an emulation project
	 */
	canAddResourcesToEmulationProject() {
		return [userRoles.ADMIN, userRoles.MANAGER, userRoles.CONTRIBUTOR]
			.includes(this.userRoleId);
	}

	/**
	 * - can run an environment / emulation project
	 */
	canRunEmulation() {
		return [userRoles.ADMIN, userRoles.MANAGER, userRoles.CONTRIBUTOR]
			.includes(this.userRoleId);
	}

	/**
	 * - Can save resources to node
	 */
	canSaveResourcesToNode() {
		return [userRoles.ADMIN, userRoles.MANAGER, userRoles.CONTRIBUTOR]
			.includes(this.userRoleId);
	}

	allowsManageNodeItems() {
		return [userRoles.ADMIN, userRoles.MANAGER]
			.includes(this.userRoleId);
	}

	allowsUserManageNodeItems() {
		return [userRoles.ADMIN, userRoles.MANAGER]
			.includes(this.userRoleId);
	}
}
