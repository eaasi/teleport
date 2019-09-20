<template>
	<div id="contentWrapper">
		<div id="mainContent" class="flex">
			<admin-menu v-if="adminMenuOpen" />
			<section id="appContent" class="flex-adapt">
				<router-view />
			</section>
		</div>
		<div id="appFooter">
			<app-footer />
		</div>
		<task-modal
			:task="activeTask"
			@close="activeTask = null"
		/>
		<div id="globalLoader" v-if="showLoader">
			<loader-overlay />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import eventBus from '@/utils/event-bus';
import AdminMenu from '@/components/admin/AdminMenu.vue';
import SlideMenu from '@/components/layout/SlideMenu.vue';
import TaskModal from '@/components/layout/TaskModal.vue';
import EaasiTask from '@/models/task/EaasiTask';
import { Sync } from 'vuex-pathify';
import AppFooter from '@/components/layout/AppFooter.vue';

@Component({
	name: 'AppContent',
	components: {
		AdminMenu,
		SlideMenu,
		TaskModal,
		AppFooter
	}
})
export default class AppContent extends Vue {

	/* Computed
	============================================*/
	@Sync('adminMenuOpen')
	adminMenuOpen: boolean

	@Sync('activeTask')
	activeTask: EaasiTask

	@Sync('showLoader')
	showLoader: boolean;

	/* Methods
	============================================*/

	/**
	 * Set up event bus listeners
	 */
	initBusListeners() {
		eventBus.$on('ajaxStart', (showLoader) => this.showLoader = showLoader);
		eventBus.$on('ajaxEnd', () => this.showLoader = false);
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
		margin-left: $leftSidebarWidth;
		margin-top: $headerHeight;
		padding-bottom: $footerHeight;
		position: relative;
	}

	#mainContent {
		min-height: calc(100vh - #{$headerHeight});
	}

	#appFooter {
		bottom: 0;
		left: $leftSidebarWidth * -1;
		position: absolute;
		right: 0;
	}

	#globalLoader {
		bottom: 0;
		left: $leftSidebarWidth;
		position: fixed;
		right: 0;
		top: $headerHeight;
		z-index: 99;
	}
</style>