// TODO: Should routes be split into their own files?
import Dashboard from '@/components/dashboard/Dashboard.vue';
import EmulatorManagement from '@/components/admin/emulators/EmulatorManagement.vue';
import UserManagement from '@/components/admin/users/UserManagement.vue';
import LoginScreen from '@/components/login/LoginScreen.vue';
import MyResourcesScreen from '@/components/resources/my-resources/MyResourcesScreen.vue';
import ExploreResourcesScreen from '@/components/resources/explore/ExploreResourcesScreen.vue';
import EmulationProjectScreen from '@/components/emulation-project/EmulationProjectScreen.vue';
import ResourceDetailsScreen from '@/components/resources/view-details/ResourceDetailsScreen.vue';
import AccessInterfaceScreen from '@/components/access-interface/AccessInterfaceScreen.vue';
import ImportScreen from '@/components/import/ImportResourceScreen.vue';
import MetadataSyncAdmin from '@/components/admin/metadata-sync/MetadataSyncAdmin.vue';
import RunningTaskManagement from '@/components/admin/running-tasks/RunningTaskManagement.vue';
import { RouteConfig } from 'vue-router';

export default [
	{
		path: '/',
		redirect: {
			path: '/dashboard'
		},
	},

	{
		path: '/login',
		name: 'Login',
		component: LoginScreen,
		meta: {
			allowGuest: true
		}
	},

	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
	},

	/* Admin
	============================================*/
	{
		path: '/admin',
		name: 'Admin',
		component: EmulatorManagement
	},
	{
		path: '/admin/users',
		name: 'User Management',
		component: UserManagement
	},
	{
		path: '/admin/emulators',
		name: 'Emulators',
		component: EmulatorManagement
	},
	{
		path: '/admin/running-tasks',
		name: 'Running Tasks',
		component: RunningTaskManagement
	},
	{
		path: '/admin/metadata-sync',
		name: 'Metadata Sync',
		component: MetadataSyncAdmin
	},

	/* Emulation Project
	============================================*/

	{
		path: '/emulation-project',
		name: 'Emulation Project',
		component: EmulationProjectScreen
	},

	/* Import Resource
	============================================*/

	{
		path: '/import-resource',
		name: 'Import Resource',
		component: ImportScreen,
	},
	{
		path: '/resources/my-resources',
		name: 'My Resources',
		component: MyResourcesScreen,
		props: true
	},
	{
		path: '/resources/explore',
		name: 'Explore Resources',
		component: ExploreResourcesScreen
	},
	{
		path: '/resources/software',
		name: 'Software Resource Detail',
		component: ResourceDetailsScreen
	},
	{
		path: '/resources/environment',
		name: 'Environment Resource Detail',
		component: ResourceDetailsScreen
	},
	{
		path: '/access-interface/:envId',
		name: 'Access Interface',
		component: AccessInterfaceScreen
	}
] as RouteConfig[];