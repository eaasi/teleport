<template>
	<nav class="left-menu" role="navigation">
		<left-menu-item
			v-for="item in menuItems"
			:item="item"
			:key="item.label"
		/>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LeftMenuItem from './LeftMenuItem.vue';
import { IMenuItem } from 'eaasi-nav';

@Component({
	components: {
		LeftMenuItem
	}
})
export default class LeftMenu extends Vue {

	menuItems: IMenuItem[] = [
		{
			icon: 'home',
			label: 'My Dashboard',
			route: '/dashboard'
		},
		{
			icon: 'clipboard-list',
			label: 'My Resources',
			route: '/my-resources'
		},
		{
			icon: 'atom',
			label: 'Emulation Project',
			route: '/emulation-project'
		},
		{
			icon: 'upload',
			label: 'Import Resource',
			route: '/import-resource'
		},
		{
			icon: 'file-search',
			label: 'Explore Resources',
			route: '/explore'
		},
		{
			icon: 'cog',
			label: 'Manage Node',
			route: '/admin/users'
		}
	]

}

</script>

<style lang="scss">
.left-menu {
	background-color: lighten($teal, 90%);
	border-bottom: solid 1px #D5D5D5;
	border-right: solid 2px #E3DEDA;
	border-top: solid 1px #D5D5D5;
	bottom: 0;
	left: 0;
	margin-top: $headerHeight;
	position: fixed;
	top: 2px;
	width: $leftSidebarWidth;
}
</style>