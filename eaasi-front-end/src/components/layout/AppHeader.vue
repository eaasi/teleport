<template>
	<header id="header" class="flex-row">
		<div id="headerLogo" class="flex flex-center">
			<img src="../../assets/header-logo.png" alt="Eaasi Logo" />
		</div>
	</header>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'AppHeader',
	props: {

	},
	components: {

	},
	computed: {

	},
	data() {
		return {

		};
	},
	methods: {

	}
});
</script>

<style lang="scss">
#header {
	background-color: #fbf8f6;
	height: $headerHeight;
	left: 0;
	outline: solid 1px #d5d5d5;
	position: fixed;
	right: 0;
	top: 0;
}

#headerLogo {
	height: $headerHeight;
	width: $leftSidebarWidth;

	img {
		width: 6rem;
	}
}
</style>