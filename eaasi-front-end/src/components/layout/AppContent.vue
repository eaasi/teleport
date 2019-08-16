<template>
	<div id="contentWrapper" class="flex">
		<admin-menu v-if="adminMenuOpen" />
		<section id="appContent" class="flex-grow">
			<router-view />
			<loader v-if="showLoader" />
		</section>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Loader } from '@/components/global';
import eventBus from '@/utils/event-bus';
import AdminMenu from '@/components/admin/AdminMenu.vue';

import { Sync } from 'vuex-pathify';

@Component({
	name: 'AppContent',
	components: {
		AdminMenu,
		Loader
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
		padding-left: $leftSidebarWidth;
	}
</style>