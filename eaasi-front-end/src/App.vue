<template>
	<div id="app">
		<app-header />
		<left-menu />
        <app-content />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import AppContent from './components/layout/AppContent.vue';
import LeftMenu from './components/layout/LeftMenu.vue';
import eventBus from '@/utils/event-bus';
export default Vue.extend({
	name: 'App',
	components: {
		AppHeader,
		AppContent,
		LeftMenu
	}
});
</script>