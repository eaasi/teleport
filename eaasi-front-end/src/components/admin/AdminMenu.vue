<template>
	<div class="admin-menu">
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
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import { IMenuItem } from 'eaasi-nav';
import AdminMenuItem from './AdminMenuItem.vue';
import User from '@/models/admin/User';

@Component({
	name: 'AdminMenu',
	components: {
		AdminMenuItem
	}
})
export default class AdminMenu extends Vue {

	/* Data
	============================================*/

	menuItems: IMenuItem[] = [
		{
			icon: 'server',
			label: 'Emulators',
			route: '/admin/emulators'
		},
		{
			icon: 'sync-alt',
			label: 'Endpoints / Metadata Sync',
			route: '/admin/metadata-sync'
		},
		{
			icon: 'tasks',
			label: 'Running Tasks',
			route: '/admin/running-tasks'
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
			route: '/admin/users'
		},
	];

	/* Computed
	============================================*/

	@Get('appVersion')
	readonly appVersion: string;

	/* Methods
	============================================*/

	addUser() {
		this.$router.push('/admin/user');
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