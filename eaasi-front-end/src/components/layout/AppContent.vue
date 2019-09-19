<template>
	<div id="contentWrapper" class="flex">
		<admin-menu v-if="adminMenuOpen" />
		<section id="appContent" class="flex-adapt">
			<router-view />
			<loader-overlay v-if="showLoader" />
		</section>
		<task-modal
			:task="activeTask"
			@close="activeTask = null"
		/>
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

@Component({
	name: 'AppContent',
	components: {
		AdminMenu,
		SlideMenu,
		TaskModal
	}
})
export default class AppContent extends Vue {

	/* Computed
	============================================*/
	@Sync('adminMenuOpen')
	adminMenuOpen: boolean

	@Sync('activeTask')
	activeTask: EaasiTask

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
		min-height: 80vh;
		padding-left: $leftSidebarWidth;
	}
</style>