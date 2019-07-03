<template>
	<nav class="left-menu">
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
import { Prop } from 'vue-property-decorator';
import LeftMenuItem from './LeftMenuItem.vue';
import { IMenuItem } from '@/types/Navigation';

@Component({
	components: {
		LeftMenuItem
	}
})
export default class LeftMenu extends Vue {

	menuItems: Array<IMenuItem> = [
		{
			icon: 'home',
			label: 'My Dashboard',
			route: '/dashboard'
		},
		{
			icon: 'clipboard',
			label: 'Explore Resources',
			route: '/explore'
		},
		{
			icon: 'clipboard',
			label: 'My Resources',
			route: '/my-resources'
		}
	]

}

</script>

<style lang="scss">
.left-menu {
	background-color: #F6FAFD;
	border-bottom: solid 1px #D5D5D5;
	border-right: solid 2px #E3DEDA;
	bottom: 0;
	left: 0;
	margin-top: $headerHeight;
	position: fixed;
	top: 0;
	width: $leftSidebarWidth;
}
</style>