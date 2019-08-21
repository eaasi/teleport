<template>
	<div id="app">
		<template v-if="!loggedIn">
			<router-view />
		</template>
		<template v-else>
			<app-header />
			<left-menu />
			<app-content />
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AppHeader from './components/layout/header/AppHeader.vue';
import AppContent from './components/layout/AppContent.vue';
import LeftMenu from './components/layout/LeftMenu.vue';
import eventBus from '@/utils/event-bus';

@Component({
	name: 'App',
	components: {
		AppHeader,
		AppContent,
		LeftMenu
	}
})
export default class App extends Vue {}

</script>

<style lang="scss"></style>