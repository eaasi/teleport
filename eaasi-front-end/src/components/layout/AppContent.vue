<template>
	<div id="contentWrapper" :class="{'no-header': hideAppHeader, 'no-menu': hideLeftMenu}">
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
			@success="setTaskSuccessResult"
		/>
		<div id="globalLoader" v-show="showLoader">
			<loader-overlay />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import eventBus from '@/utils/event-bus';
import AdminMenu from '@/components/admin/AdminMenu.vue';
import SlideMenu from '@/components/layout/SlideMenu.vue';
import TaskModal from '@/components/layout/TaskModal.vue';
import EaasiTask from '@/models/task/EaasiTask';
import { Get, Sync } from 'vuex-pathify';
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
	adminMenuOpen: boolean;

	@Get('hideLeftMenu')
	hideLeftMenu: boolean;

	@Get('hideAppHeader')
	hideAppHeader: boolean;

	@Sync('showLoader')
	showLoader: boolean;

	@Sync('activeTask')
	activeTask: EaasiTask;

	/* Methods
	============================================*/

	/**
	 * Set up event bus listeners
	 */
	initBusListeners() {
		eventBus.$on('ajaxStart', () => this.showLoader = true);
		eventBus.$on('ajaxEnd', () => this.showLoader = false);
	}

	/**
	 * Removes event bus listeners
	 */
	removeBusListeners() {
		eventBus.$off('ajaxStart');
		eventBus.$off('ajaxEnd');
	}

	setTaskSuccessResult(taskResult: EaasiTask) {
		this.$store.commit('SET_ACTIVE_TASK_RESULT', taskResult);
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
	#appContent {
		align-content: stretch;
		flex-grow: 1;
	}

	#contentWrapper {
		margin-left: $leftSidebarWidth;
		margin-top: $headerHeight;
		padding-bottom: $footerHeight;
		position: relative;

		&.no-header {
			margin-top: 0;
		}

		&.no-menu {
			margin-left: 0;

			#appFooter {
				left: 0;
			}

			#globalLoader {
				left: 0;
				top: 0;
			}
		}
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