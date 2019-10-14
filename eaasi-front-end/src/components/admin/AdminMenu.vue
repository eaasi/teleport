<template>
	<div class="admin-menu">
		<h2>Node Management</h2>
		<admin-menu-item v-for="i in menuItems" :key="i.route" :item="i" />
		<div class="menu-divider"></div>
		<h2>Node User Administration</h2>
		<admin-menu-item v-for="i in userMenuItems" :key="i.route" :item="i" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
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
			icon: 'database',
			label: 'Node Cache / Storage',
			route: '/admin/storage'
		},
		/*
		{
			icon: 'code-branch',
			label: 'Node Endpoints',
			route: '/admin/node-endpoints'
		},
		{
			icon: 'history',
			label: 'Session Settings',
			route: '/admin/session-settings'
		},
		*/
	]

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
	]

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
		color: #AAAAAA;
		font-size: 1.2rem;
		text-transform: uppercase;
	}
}

.menu-divider {
	background-color: darken($teal, 80%);
	height: 2px;
	margin-bottom: 1.4rem;
	margin-top: 2rem;
}

</style>