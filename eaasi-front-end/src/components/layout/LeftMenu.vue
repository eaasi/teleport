<template>
	<nav class="left-menu" role="navigation" v-if="user">
		<div id="headerLogo" class="flex flex-center" @click="$router.push('/dashboard')">
			<img src="@/assets/header-logo.png" alt="Eaasi Logo" class="left-menu-logo" />
		</div>
		<left-menu-item
			v-for="(item, index) in menuItems"
			:item="item"
			:key="index"
		/>
	</nav>
</template>

<script lang="ts">
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import {IEaasiUser} from 'eaasi-admin';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Get} from 'vuex-pathify';
import LeftMenuItem from './LeftMenuItem.vue';
import { IMenuItem } from 'eaasi-nav';

@Component({
	components: {
		LeftMenuItem
	}
})
export default class LeftMenu extends Vue {
	@Get('loggedInUser')
	user: IEaasiUser;

	@Get('permissions')
	permit: PermissionResolver;

	userCanManageNode() {
		if (!this.user) return false;
		return this.permit.allowsViewManageNodePage();
	}

	get menuItems() : IMenuItem[] {
		let menu = [
			{
				icon: 'home',
				label: 'My Dashboard',
				route: '/dashboard',
			},
			{
				icon: 'file-search',
				label: 'Explore Resources',
				route: '/resources/explore',
			},
			{
				icon: 'clipboard-list',
				label: 'My Resources',
				route: '/resources/my-resources',
			},
			{
				icon: '',
				label: '',
				route: '',
				isDivider: true,
			},
			{
				icon: 'atom',
				label: 'Emulation Project',
				route: '/emulation-project',
			},
			{
				icon: 'upload',
				label: 'Import Resource',
				route: '/import-resource',
			},
			{
				icon: '',
				label: '',
				route: '',
				isDivider: true,
			}];

		if (this.userCanManageNode()) {
			menu.push({
				icon: 'manage',
				label: 'Manage Node',
				route: '/admin/users',
			});
		}

		return menu;
	}
}

</script>

<style lang="scss">
.left-menu {
	background-color: darken($teal, 60%);
	bottom: 0;
	color: #FFFFFF;
	left: 0;
	position: fixed;
	top: 0;
	width: $leftSidebarWidth;
}

#headerLogo {
	cursor: pointer;
	height: $headerHeight;
	width: $leftSidebarWidth;

	img {
		width: 6.3rem;
	}

	.left-menu-logo {
		border: 4px solid darken($teal, 28%);
		border-radius: 50%;
	}
}
</style>