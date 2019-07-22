<template functional>
	<section id="appContent">
		<router-view />
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
	name: 'AppContent'
})
export default class AppContent extends Vue {}
</script>

<style lang="scss">
	#appContent {
		margin-top: $headerHeight;
		min-height: 1200px;
		padding-left: $leftSidebarWidth;
	}
</style>