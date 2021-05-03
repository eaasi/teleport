// TODO: Should routes be split into their own files?
import AccessDeniedScreen from '@/components/access-denied/AccessDeniedScreen.vue';
import AccessInterfaceScreen from '@/components/access-interface/AccessInterfaceScreen.vue';
import EmulatorManagement from '@/components/admin/emulators/EmulatorManagement.vue';
import InstallAndUpdateManagement from '@/components/admin/install-and-update/InstallAndUpdateManagement.vue';
import MetadataSyncAdmin from '@/components/admin/metadata-sync/MetadataSyncAdmin.vue';
import RunningTaskManagement from '@/components/admin/running-tasks/RunningTaskManagement.vue';
import TroubleshootingSection from '@/components/admin/troubleshooting/TroubleshootingSection.vue';
import UserManagement from '@/components/admin/users/UserManagement.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import CreateBaseEnvironment from '@/components/emulation-project/base-environment/CreateBaseEnvironment.vue';
import EmulationProjectDetails from '@/components/emulation-project/EmulationProjectDetails.vue';
import EmulationProjectOptions from '@/components/emulation-project/EmulationProjectOptions.vue';
import EmulationProjectScreen from '@/components/emulation-project/EmulationProjectScreen.vue';
import ImportScreen from '@/components/import/ImportResourceScreen.vue';
import ExploreResourcesScreen from '@/components/resources/explore/ExploreResourcesScreen.vue';
import MyResourcesScreen from '@/components/resources/my-resources/MyResourcesScreen.vue';
import ContentDetailsScreen from '@/components/resources/view-details/content/ContentDetailsScreen.vue';
import EnvironmentDetailsScreen from '@/components/resources/view-details/environment/EnvironmentDetailsScreen.vue';
import SoftwareDetailsScreen from '@/components/resources/view-details/software/SoftwareDetailsScreen.vue';
import { RouteConfig } from 'vue-router';
import { ROUTES } from './routes.const';

export default [
	{
		path: ROUTES.INDEX,
		redirect: ROUTES.DASHBOARD,
	},

	/*{
		path: ROUTES.LOGIN,
		name: 'Login',
		component: LoginScreen,
		meta: {
			allowGuest: true
		}
	},*/

	{
		path: ROUTES.DASHBOARD,
		name: 'Dashboard',
		component: Dashboard,
	},

	/* Admin
	============================================*/
	{
		path: ROUTES.MANAGE_NODE.ROOT,
		name: 'Admin',
		component: RunningTaskManagement
	},
	{
		path: ROUTES.MANAGE_NODE.USERS,
		name: 'User Management',
		component: UserManagement
	},
	{
		path: ROUTES.MANAGE_NODE.EMULATORS,
		name: 'Emulators',
		component: EmulatorManagement
	},
	{
		path: ROUTES.MANAGE_NODE.RUNNING_TASKS,
		name: 'Running Tasks',
		component: RunningTaskManagement
	},
	{
		path: ROUTES.MANAGE_NODE.METADATA_SYNC,
		name: 'Metadata Sync',
		component: MetadataSyncAdmin
	},
	{
		path: ROUTES.MANAGE_NODE.INSTALL_AND_UPDATES,
		name: 'Install and Updates',
		component: InstallAndUpdateManagement
	},
	{
		path: ROUTES.MANAGE_NODE.TROUBLESHOOTING,
		name: 'Troubleshooting',
		component: TroubleshootingSection
	},

	/* Emulation Project
	============================================*/

	{
		path: ROUTES.EMULATION_PROJECT.ROOT,
		name: 'Emulation Project',
		component: EmulationProjectScreen,
		redirect: to => {
			return ROUTES.EMULATION_PROJECT.OPTIONS;
		},
		children: [
			{
				path: ROUTES.EMULATION_PROJECT.DETAILS,
				name: 'Emulation Project Details',
				component: EmulationProjectDetails
			},
			{
				path: ROUTES.EMULATION_PROJECT.OPTIONS,
				name: 'Emulation Project Options',
				component: EmulationProjectOptions
			},
			{
				path: ROUTES.EMULATION_PROJECT.CREATE_BASE_ENVIRONMENT,
				name: 'Create Base Environment',
				component: CreateBaseEnvironment
			},
		]
	},

	/* Import Resource
	============================================*/

	{
		path: ROUTES.IMPORT_RESOURCE,
		name: 'Import Resource',
		component: ImportScreen,
	},
	{
		path: ROUTES.RESOURCES.MY_RESOURCES,
		name: 'My Resources',
		component: MyResourcesScreen,
		props: true
	},
	{
		path: ROUTES.RESOURCES.EXPLORE,
		name: 'Explore Resources',
		component: ExploreResourcesScreen,
		props: true
	},
	{
		path: ROUTES.RESOURCES.SOFTWARE,
		name: 'Software Resource Detail',
		component: SoftwareDetailsScreen
	},
	{
		path: ROUTES.RESOURCES.ENVIRONMENT,
		name: 'Environment Resource Detail',
		component: EnvironmentDetailsScreen
	},
	{
		path: ROUTES.RESOURCES.CONTENT,
		name: 'Content Resource Detail',
		component: ContentDetailsScreen
	},
	{
		path: ROUTES.ACCESS_INTERFACE + '/:envId',
		name: 'Access Interface',
		component: AccessInterfaceScreen
	},

	{
		path: ROUTES.ACCESS_DENIED,
		name: 'Access Denied',
		component: AccessDeniedScreen,
	},

	{
		path: ROUTES.WILD_CARD,
		name: 'Dashboard',
		component: Dashboard,
	},

] as RouteConfig[];