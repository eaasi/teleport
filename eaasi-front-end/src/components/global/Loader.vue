<template functional>
	<div class="eaasi-loader-wrapper flex flex-center">
		<div class="eaasi-loader">
			<div class="eaasi-loader-rings"></div>
			<img class="eaasi-logo" src="@/assets/header-logo.png" alt="eaasi loader" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

/**
 * A loading overlay with an animated spinner
 * @example ../docs/Loader.Example.md
 */
@Component({
	name: 'Loader'
})
export default class Loader extends Vue {}
</script>

<style lang="scss">
$baseColor: $dark-blue;
$speed: 0.9s;

.eaasi-loader-wrapper {
	background-color: rgba(0, 0, 0, 0.2);
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
}

.eaasi-loader {
	height: 100px;
	position: relative;
	width: 100px;
}

.eaasi-logo {
	height: 50px;
	left: 28px;
	opacity: 1;
	position: absolute;
	top: 28px;
	width: 50px;
}

.eaasi-loader-rings {
	animation: spin ($speed * 1.2) linear infinite;
	border: 3px solid transparent;
	border-radius: 50%;
	border-top-color: $baseColor;
	display: block;
	height: 100px;
	position: relative;
	width: 100px;

	&::before {
		animation: spin ($speed * 2.5) linear infinite;
		border: 3px solid transparent;
		border-radius: 50%;
		border-top-color: lighten($baseColor, 50%);
		bottom: 5px;
		content: "";
		left: 5px;
		position: absolute;
		right: 5px;
		top: 5px;
	}

	&::after {
		animation: spin ($speed * 1.5) linear infinite;
		border: 3px solid transparent;
		border-radius: 50%;
		border-top-color: darken($baseColor, 50%);
		bottom: 15px;
		content: "";
		left: 15px;
		position: absolute;
		right: 15px;
		top: 15px;
	}
}

@-webkit-keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>