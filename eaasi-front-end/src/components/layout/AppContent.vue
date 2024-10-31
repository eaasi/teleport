<template>
	<div id="contentWrapper" :class="{'no-header': hideAppHeader, 'no-menu': hideLeftMenu}">
		<div id="mainContent" class="flex">
			<admin-menu v-if="adminMenuOpen" />
			<section id="appContent" class="flex-adapt">
				<router-view />
			</section>
		</div>
		<notifications />
		<task-list v-if="hasTasks && isAllowed" collapsible closable fixed />
		<div id="globalLoader" v-show="showLoader">
			<loader-overlay />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Mixins } from 'vue-property-decorator';
import eventBus from '@/utils/event-bus';
import AdminMenu from '@/components/admin/AdminMenu.vue';
import SlideMenu from '@/components/layout/SlideMenu.vue';
import EaasiTask from '@/models/task/EaasiTask';
import { Get, Sync } from 'vuex-pathify';
import AppFooter from '@/components/layout/AppFooter.vue';
import Notifications from './Notifications.vue';
import TaskList from '@/components/admin/running-tasks/TaskList.vue';
import TaskManager from '../../mixins/TaskManager';
import { ROUTES } from '@/router/routes.const';

@Component({
	name: 'AppContent',
	components: {
		Notifications,
		TaskList,
		AdminMenu,
		SlideMenu,
		AppFooter
	},
	mixins: [TaskManager]
})
export default class AppContent extends Mixins(TaskManager) {

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

	@Get('task/orderedTasks')
    readonly tasks: EaasiTask[];

    @Get('task/incompletedTasks')
    readonly incompletedTasks: EaasiTask[];

    get hasTasks(): boolean {
        return this.tasks.length > 0;
	}

	get isAllowed(): boolean {
		return this.$route.path !== ROUTES.MANAGE_NODE.RUNNING_TASKS;
	}

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
		height: inherit;
	}

	#contentWrapper {
		margin-left: 156px;
		margin-top: $headerHeight;
		min-height: 100%;
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

	#globalLoader {
		bottom: 0;
		left: $leftSidebarWidth;
		position: fixed;
		right: 0;
		top: $headerHeight;
		z-index: 99;
	}
</style>