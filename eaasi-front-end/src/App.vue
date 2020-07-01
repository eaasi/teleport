<template>
	<div id="app">
		<template v-if="!loggedIn">
			<router-view />
		</template>
		<template v-else>
			<left-menu v-show="!hideLeftMenu" />
			<app-header v-show="!hideAppHeader" />
			<app-content />
			<!-- Error Modal visibility state managed in global store-->
			<error-modal v-if="error" />
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import LeftMenu from './components/layout/LeftMenu.vue';
import AppHeader from './components/layout/header/AppHeader.vue';
import AppContent from './components/layout/AppContent.vue';
import ErrorModal from '@/components/global/Modal/ErrorModal.vue';
import eventBus from '@/utils/event-bus';
import events from '@/config/events';
import { generateNotificationError, generateNotificationWarning } from './helpers/NotificationHelper';

@Component({
	name: 'App',
	components: {
		ErrorModal,
		AppHeader,
		AppContent,
		LeftMenu
	}
})
export default class App extends Vue {

	/* Computed
	============================================*/

	@Get('hideLeftMenu')
	hideLeftMenu: boolean;

	@Get('hideAppHeader')
	hideAppHeader: boolean;

	@Get('loggedIn')
	loggedIn: boolean;

	@Get('appError')
	error: string;

	/* Methods
	============================================*/

	initListeners() {
		let self = this;

		// Global error listener
		eventBus.$on(events.AJAX_ERROR, err => {
			this.$store.commit('SET_APP_ERROR', err);
		});

		// Global task listener
		eventBus.$on(events.TASK_START, err => {
			this.$store.commit('SET_APP_ERROR', err);
		});

		eventBus.$on(events.REQUEST_LIMIT_REACHED,
			() => eventBus.$emit(
				'notification:show',
				generateNotificationWarning('You\'ve reached the request limit, please try again later.')
			)
		);

	}

	/* Lifecycle Hooks
	============================================*/

	created() {
		this.initListeners();
	}

}

</script>

<style lang="scss">
</style>