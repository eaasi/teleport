<template>
	<div id="app">
		<template v-if="!authorized">
			<router-view />
		</template>
		<template v-else>
			<app-header />
			<left-menu />
			<app-content />
			<!-- Error Modal visibility state managed in global store-->
			<error-modal />
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import AppHeader from './components/layout/header/AppHeader.vue';
import AppContent from './components/layout/AppContent.vue';
import LeftMenu from './components/layout/LeftMenu.vue';
import ErrorModal from '@/components/global/Modal/ErrorModal.vue';
import eventBus from '@/utils/event-bus';

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

	@Get('global/authorized')
	authorized: boolean

}

</script>

<style lang="scss"></style>