<template>
	<div class="admin-menu" v-if="isViewable">
		<h2 class="admin-menu-heading" style="margin-top: 1rem;">Node Management</h2>
		<admin-menu-item v-for="i in menuItems" :key="i.route" :item="i" />
		<div class="menu-divider" v-if="isUserMenuViewable"></div>
		<h2 class="admin-menu-heading" v-if="isUserMenuViewable">Node User Administration</h2>
		<admin-menu-item v-for="i in userMenuItems" :key="i.route" :item="i" />
		<div class="menu-divider"></div>
		<h2 class="admin-menu-heading">Application Version</h2>
		<div class="app-version">{{ appVersion }}</div>
		<h2 class="admin-menu-heading">Front-End Build</h2>
		<div class="app-version">{{ frontEndBuild }}</div>
		<h2 class="admin-menu-heading">Back-End Build</h2>
		<div class="app-version">{{ backEndBuild }}</div>
		<h2 class="admin-menu-heading">User Info</h2>
		<div class="user-info">
			<div>User: {{ user.username }}</div>
			<div>Role: {{ roleType }}</div>
		</div>
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
import { ROUTES } from '@/router/routes.const';
import config from '@/config';
import { EDITION_TYPES, userRoles } from '@/utils/constants';

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
		return this.permit.allowsManageOrganizationUsers();
	};

	get isUserMenuViewable(): boolean {
		return this.permit.allowsUserManageNodeItems();
	}

	get roleType(): string {
		switch(this.permit.userRoleId) {
			case userRoles.ADMIN: {
				return 'ADMIN';
			}
			case userRoles.MANAGER: {
				return 'MANAGER';
			}
			case userRoles.CONTRIBUTOR: {
				return 'CONTRIBUTOR';
			}
		}
	}

	get menuItems(): IMenuItem[] {
		let menuItems = [];
		if (this.permit.allowsManageNodeItems() && config.EDITION_TYPE == EDITION_TYPES.STANDALONE) {
			menuItems.push(
				{
					icon: 'server',
					label: 'Emulators',
					route: ROUTES.MANAGE_NODE.EMULATORS
				}
			);
		}
		menuItems.push(
			{
				icon: 'tasks',
				label: 'Running Tasks',
				route: ROUTES.MANAGE_NODE.RUNNING_TASKS
			}
		);
		menuItems.push(
			{
				label: 'Troubleshooting',
				route: ROUTES.MANAGE_NODE.TROUBLESHOOTING,
				icon: 'wrench'
			}
		);

		return menuItems;
	}

	get userMenuItems(): IMenuItem[] {
		let userMenuItems = [];
		if (this.permit.allowsUserManageNodeItems()) {
			userMenuItems.push(
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
				}
			);
		}
		return userMenuItems;
	}

	/* Computed
	============================================*/

	@Get('appVersion')
	readonly appVersion: string;

	@Get('buildVersion')
	readonly frontEndBuild: string;

	backEndBuild: string = '';

	async getBEBuildVersion() {
		this.backEndBuild = await this.$store.dispatch('admin/getBEBuildVersion');
	}

	/* Methods
	============================================*/

	addUser() {
		this.$router.push(ROUTES.MANAGE_NODE.USERS);
		this.$store.commit('admin/SET_ACTIVE_USER', new User());
	}

	mounted() {
		this.getBEBuildVersion();
	}
}

</script>

<style lang="scss">

.admin-menu {
	background-color: #3cdd66;
	box-sizing: border-box;
	color: black;
	padding: 2rem;
	width: 25rem;

	h2 {
		color: $black;
		font-size: 1.4rem;
		margin-top: 3rem;
		text-transform: uppercase;
	}
}

.menu-divider {
	background-color: $dark-light-grey;
	height: 1px;
	margin: 2rem 0;
}

.user-info {
	div {
		margin: 1rem 0;
	}
}

</style>