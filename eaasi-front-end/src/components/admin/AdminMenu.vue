<template>
	<div class="admin-menu" v-if="isViewable">
		<div class="menu-divider"></div>
		<h2 class="admin-menu-heading">Node Management</h2>
		<admin-menu-item v-for="i in menuItems" :key="i.route" :item="i" />
		<div class="menu-divider" v-if="isUserMenuViewable"></div>
		<h2 class="admin-menu-heading" v-if="isUserMenuViewable">Node User Administration</h2>
		<admin-menu-item v-for="i in userMenuItems" :key="i.route" :item="i" />
		<div class="menu-divider"></div>
		<h2 class="admin-menu-heading">Application Version</h2>
		<div class="app-version">{{ appVersion }}</div>
		<div class="addition-app-info" v-if="!isProduction">
			<div>User: {{ user.username }}</div>
			<div>Role: {{ roleType }}</div>
			<div>Build: {{ BEBuild }}</div>
			<div>UI-Build: {{ commitHash }} </div>
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
	commitHash: string = process.env.VUE_APP_GIT_HASH;
	BEBuild: string = '';

	get isProduction(): boolean {
		return process.env.NODE_ENV === 'production';
	}

	get isViewable(): boolean {
		if (!this.user) return false;
		return this.permit.allowsManageNodeUsers();
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
				},
				{
					icon: 'sync-alt',
					label: 'Endpoints / Metadata Sync',
					route: ROUTES.MANAGE_NODE.METADATA_SYNC
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

	async getBEBuildVersion() {
		this.BEBuild = await this.$store.dispatch('admin/getBEBuildVersion');
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
	background-color: darken($teal, 77%);
	box-sizing: border-box;
	color: #FFFFFF;
	padding: 2rem;
	width: 25rem;

	h2 {
		color: $teal;
		font-size: 1.3rem;
		margin-top: -10px;
		text-transform: uppercase;
	}
}

.menu-divider {
	background-color: darken($teal, 55%);
	height: 2px;
	margin: 2rem 0;
}

.addition-app-info {
	margin: 20px 0;

	div {
		margin: 10px 0;
	}
}

</style>