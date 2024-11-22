<template>
	<nav class="left-menu" role="navigation" v-if="user">
		<div id="headerLogo" class="flex flex-center" @click="navigateToDashboard">
			<img
				src="@/assets/eaasi_logos/eaasi-logo-transparent-background.png"
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

	userCanManageOrganization() {
		if (!this.user) return false;
		return this.permit.allowsViewManageOrganizationPage();
	}

	get menuItems() : IMenuItem[] {
		let menu = [
			{
				label: 'Dashboard',
				route: ROUTES.DASHBOARD,
			},
			{
				label: 'Explore',
				route: ROUTES.RESOURCES.EXPLORE,
			},
			{
				label: 'My Resources',
				route: ROUTES.RESOURCES.MY_RESOURCES,
			},
			{
				label: 'Emulation',
				route: ROUTES.EMULATION_PROJECT.ROOT,
			},
			{
				label: 'Import',
				route: ROUTES.IMPORT_RESOURCE,
			}];

		if (this.userCanManageOrganization()) {
			menu.push({
				label: 'Manage Organization',
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
	bottom: 0;
	color: $black;
	left: 0;
	min-height: -webkit-fill-available;
	position: fixed;
	top: 0;
	width: $leftSidebarWidth;
	z-index: 3;
	border: 2px solid $green;
	background-color: white;
}

#headerLogo {
	cursor: pointer;
	height: $headerHeight;
	width: 100%;
	border-bottom: 2px solid $green;
	border-right: 2px solid $green;
	padding: 0;

	img {
		width: 100%;
	}
}

@media screen and (max-width: 950px) {
	.left-menu {
		width: $leftSmallSidebarWidth;
	}
}
</style>