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
	background-color: #FBF8F6;
	height: $headerHeight;
	outline: solid 1px #D5D5D5;
	position: fixed;
	top: 0; right: 0; left: 0;
}
#headerLogo {
	height: $headerHeight;
	width: $leftSidebarWidth;
	img {
		width: 6rem;
	}
}
</style>