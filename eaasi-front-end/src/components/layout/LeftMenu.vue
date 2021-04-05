<template>
	<nav class="left-menu" role="navigation" v-if="user">
		<div id="headerLogo" class="flex flex-center" @click="navigateToDashboard">
			<img
				src="@/assets/eaasi_logos/logoEaaSI_160.png"
				alt="Eaasi Logo"
				class="left-menu-logo"
			/>
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
import { ROUTES } from '@/router/routes.const';

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
				route: ROUTES.DASHBOARD,
			},
			{
				icon: 'file-search',
				label: 'Explore Resources',
				route: ROUTES.RESOURCES.EXPLORE,
			},
			{
				icon: 'clipboard-list',
				label: 'My Resources',
				route: ROUTES.RESOURCES.MY_RESOURCES,
			},
			{
				icon: 'atom',
				label: 'Emulation Project',
				route: ROUTES.EMULATION_PROJECT.ROOT,
			},
			{
				icon: 'upload',
				label: 'Import Resource',
				route: ROUTES.IMPORT_RESOURCE,
			}];

		if (this.userCanManageNode()) {
			menu.push({
				icon: 'manage',
				label: 'Manage Node',
				route: ROUTES.MANAGE_NODE.ROOT,
			});
		}

		return menu;
	}

	navigateToDashboard() {
		this.$router.push(ROUTES.DASHBOARD);
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
		width: 6.8rem;
	}
}
</style>