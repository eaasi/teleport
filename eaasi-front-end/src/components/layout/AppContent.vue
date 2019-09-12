<template>
	<div id="contentWrapper" class="flex">
		<admin-menu v-if="adminMenuOpen" />
		<section id="appContent" class="flex-adapt">
			<router-view />
			<loader v-if="showLoader" />
		</section>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import eventBus from '@/utils/event-bus';
import AdminMenu from '@/components/admin/AdminMenu.vue';
import SlideMenu from '@/components/layout/SlideMenu.vue';
import { Sync } from 'vuex-pathify';

@Component({
	name: 'AppContent',
	components: {
		AdminMenu,
		SlideMenu
	}
})
export default class AppContent extends Vue {

	/* Computed
	============================================*/
	@Sync('global/adminMenuOpen')
	adminMenuOpen: boolean

	/* Data
	============================================*/

	/**
	 * Hides or shows global loading animation
	 */
	showLoader: boolean = false;

	/* Methods
	============================================*/

	/**
	 * Set up event bus listeners
	 */
	initBusListeners() {
		eventBus.$on('ajaxStart', (showLoader) => this.showLoader = showLoader);
		eventBus.$on('ajaxEnd', () => this.showLoader = false );
	}

	/**
	 * Removes event bus listeners
	 */
	removeBusListeners() {
		eventBus.$off('ajaxStart');
		eventBus.$off('ajaxEnd');
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.initBusListeners();
	}

	beforeDestroy() {
		this.removeBusListeners();
	}
}
</script>

<style lang="scss">
	#contentWrapper {
		margin-top: $headerHeight;
		min-height: 1200px;
		min-width: 0;
		padding-left: $leftSidebarWidth;
	}
</style>