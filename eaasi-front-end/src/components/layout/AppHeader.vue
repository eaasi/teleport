<template functional>
	<header id="header" class="flex-row">
		<div id="headerLogo" class="flex flex-center">
			<img src="../../assets/header-logo.png" alt="Eaasi Logo" />
		</div>
	</header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class AppHeader extends Vue {};
</script>

<style lang="scss">
#header {
	background-color: $teal;
	height: $headerHeight;
	left: 0;
	outline: solid 2px darken($teal, 59%);
	position: fixed;
	right: 0;
	top: 0;
	z-index: 10;
}

#headerLogo {
	height: $headerHeight;
	width: $leftSidebarWidth;

	img {
		width: 6rem;
	}
}
</style>