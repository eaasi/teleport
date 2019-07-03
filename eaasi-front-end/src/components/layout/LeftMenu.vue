<template>
	<nav class="left-menu">
		<left-menu-item
			v-for="item in menuItems"
			:item="item"
			:key="item.label"
			@click="setActiveItem(item)"
		/>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import LeftMenuItem from './LeftMenuItem.vue';
import MenuItem from '../../Navigation';

@Component({
	components: {
		LeftMenuItem
	}
})
export default class LeftMenu extends Vue {

	menuItems: Array<MenuItem> = [
		{
			icon: 'home',
			label: 'My Dashboard',
			isActive: true,
			link: '/dashboard'
		},
		{
			icon: 'clipboard',
			label: 'Explore Resources',
			isActive: false,
			link: '/explore'
		},
		{
			icon: 'clipboard',
			label: 'My Resources',
			isActive: false,
			link: '/my-resources'
		},
	]

	setActiveItem(item: MenuItem) {
		this.menuItems.forEach(x => x.isActive = false);
		item.isActive = true;
	}

}

</script>

<style lang="scss">
.left-menu {
	background-color: #F6FAFD;
	border-bottom: solid 1px #D5D5D5;
	border-right: solid 2px #E3DEDA;
	position: fixed;
	margin-top: $headerHeight;
	top: 0; bottom: 0; left: 0;
	width: $leftSidebarWidth;
}
</style>