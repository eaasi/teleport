<template>
	<div class="admin-menu" v-if="isViewable">
		<div class="menu-divider"></div>
		<h2 class="admin-menu-heading">Node Management</h2>
		<admin-menu-item v-for="i in menuItems" :key="i.route" :item="i" />
		<div class="menu-divider"></div>
		<h2 class="admin-menu-heading">Node User Administration</h2>
		<admin-menu-item v-for="i in userMenuItems" :key="i.route" :item="i" />
		<div class="menu-divider"></div>
		<h2 class="admin-menu-heading">Application Version</h2>
		<div class="app-version">{{ appVersion }}</div>
	</div>
</template>

<script lang="ts">
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import {IEaasiUser} from 'eaasi-admin';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import { IMenuItem } from 'eaasi-nav';
import AdminMenuItem from './AdminMenuItem.vue';
import User from '@/models/admin/User';
import { ROUTES } from '../../router/routes.const';

@Component({
	name: 'AdminMenu',
	components: {
		AdminMenuItem
	}
})
export default class AdminMenu extends Vue {

	@Get('loggedInUser')
	user: IEaasiUser;

	@Get('permissions')
	permit: PermissionResolver;

	/* Data
	============================================*/

	get isViewable(): boolean {
		if (!this.user) return false;
		return this.permit.allowsManageNodeUsers();
	};

	menuItems: IMenuItem[] = [
		{
			icon: 'server',
			label: 'Emulators',
			route: ROUTES.MANAGE_NODE.EMULATORS
		},
		{
			icon: 'sync-alt',
			label: 'Endpoints / Metadata Sync',
			route: ROUTES.MANAGE_NODE.METADATA_SYNC
		},
		{
			icon: 'tasks',
			label: 'Running Tasks',
			route: ROUTES.MANAGE_NODE.RUNNING_TASKS
		},
		{
			label: 'Node Preferences',
			route: ROUTES.MANAGE_NODE.NODE_PREFERENCES,
			icon: 'edit'
		},
		{
			label: 'Install & Updates',
			route: ROUTES.MANAGE_NODE.INSTALL_AND_UPDATES,
			icon: 'arrows'
		},
		{
			label: 'Troubleshooting',
			route: ROUTES.MANAGE_NODE.TROUBLESHOOTING,
			icon: 'wrench'
		},
	];

	userMenuItems: IMenuItem[] = [
		{
			icon: 'user',
			label: 'Create New User',
			route: '',
			onClick: () => this.addUser()
		},
		{
			icon: 'users',
			label: 'Manage Users',
			route: ROUTES.MANAGE_NODE.USERS
		},
	];

	/* Computed
	============================================*/

	@Get('appVersion')
	readonly appVersion: string;

	/* Methods
	============================================*/

	addUser() {
		this.$router.push(ROUTES.MANAGE_NODE.USERS);
		this.$store.commit('admin/SET_ACTIVE_USER', new User());
	}
}

</script>

<style lang="scss">

.admin-menu {
	background-color: darken($teal, 40%);
	box-sizing: border-box;
	color: #FFFFFF;
	padding: 2rem;
	width: 25rem;

	h2 {
		color: lighten($teal, 40%);
		font-size: 1.3rem;
		text-transform: uppercase;
	}
}

.menu-divider {
	background-color: darken($teal, 55%);
	height: 2px;
	margin: 2rem 0;
}

</style>