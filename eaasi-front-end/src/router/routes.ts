// TODO: Should routes be split into their own files?
import AccessInterfaceScreen from '@/components/access-interface/AccessInterfaceScreen.vue';
import EmulatorManagement from '@/components/admin/emulators/EmulatorManagement.vue';
import InstallAndUpdateManagement from '@/components/admin/install-and-update/InstallAndUpdateManagement.vue';
import MetadataSyncAdmin from '@/components/admin/metadata-sync/MetadataSyncAdmin.vue';
import NodePreferenceManagement from '@/components/admin/node-preferences/NodePreferenceManagement.vue';
import RunningTaskManagement from '@/components/admin/running-tasks/RunningTaskManagement.vue';
import UserManagement from '@/components/admin/users/UserManagement.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import EmulationProjectScreen from '@/components/emulation-project/EmulationProjectScreen.vue';
import ImportScreen from '@/components/import/ImportResourceScreen.vue';
import LoginScreen from '@/components/login/LoginScreen.vue';
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
		redirect: {
			path: ROUTES.DASHBOARD
		},
	},

	{
		path: ROUTES.LOGIN,
		name: 'Login',
		component: LoginScreen,
		meta: {
			allowGuest: true
		}
	},

	{
		path: ROUTES.DASHBOARD,
		name: 'Dashboard',
		component: Dashboard,
	},

	/* Admin
	============================================*/
	{
		path: ROUTES.MANAGE_NODE,
		name: 'Admin',
		component: EmulatorManagement
	},
	{
		path: ROUTES.MANAGE_NODE_USERS,
		name: 'User Management',
		component: UserManagement
	},
	{
		path: ROUTES.MANAGE_NODE_EMULATORS,
		name: 'Emulators',
		component: EmulatorManagement
	},
	{
		path: ROUTES.MANAGE_NODE_RUNNING_TASKS,
		name: 'Running Tasks',
		component: RunningTaskManagement
	},
	{
		path: ROUTES.MANAGE_NODE_METADATA_SYNC,
		name: 'Metadata Sync',
		component: MetadataSyncAdmin
	},
	{
		path: ROUTES.MANAGE_NODE_NODE_PREFERENCES,
		name: 'Node Preferences',
		component: NodePreferenceManagement
	},
	{
		path: ROUTES.MANAGE_NODE_INSTALL_AND_UPDATES,
		name: 'Install and Updates',
		component: InstallAndUpdateManagement
	},

	/* Emulation Project
	============================================*/

	{
		path: ROUTES.EMULATION_PROJECT,
		name: 'Emulation Project',
		component: EmulationProjectScreen
	},

	/* Import Resource
	============================================*/

	{
		path: ROUTES.IMPORT_RESOURCE,
		name: 'Import Resource',
		component: ImportScreen,
	},
	{
		path: ROUTES.RESOURCES_MY_RESOURCES,
		name: 'My Resources',
		component: MyResourcesScreen,
		props: true
	},
	{
		path: ROUTES.RESOURCES_EXPLORE,
		name: 'Explore Resources',
		component: ExploreResourcesScreen,
		props: true
	},
	{
		path: ROUTES.RESOURCES_SOFTWARE,
		name: 'Software Resource Detail',
		component: SoftwareDetailsScreen
	},
	{
		path: ROUTES.RESOURCES_ENVIRONMENT,
		name: 'Environment Resource Detail',
		component: EnvironmentDetailsScreen
	},
	{
		path: ROUTES.RESOURCES_CONTENT,
		name: 'Content Resource Detail',
		component: ContentDetailsScreen
	},
	{
		path: ROUTES.ACCESS_INTERFACE + '/:envId',
		name: 'Access Interface',
		component: AccessInterfaceScreen
	},

	{
		path: ROUTES.WILD_CARD,
		name: 'Dashboard',
		component: Dashboard,
	},

] as RouteConfig[];