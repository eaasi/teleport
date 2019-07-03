<template functional>
	<section id="appContent">
		<router-view />
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'AppContent'
});
</script>

<style lang="scss">
	#appContent {
		padding-left: $leftSidebarWidth;
		margin-top: $headerHeight;
		min-height: 1200px;
	}
</style>