<template functional>
	<div class="eaasi-loader">
		<div class="eaasi-loader-rings"></div>
		<img class="eaasi-logo" src="@/assets/eaasi_logos/eaasi-logo-transparent-background.png" alt="eaasi loader" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

/**
 * An Eaasi-themed loading component with an animated spinner
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

.eaasi-loader {
	height: 100px;
	position: relative;
	width: 100px;
}

.eaasi-logo {
	left: 19px;
	opacity: 1;
	position: absolute;
	top: 35px;
	width: 70px;
}

.eaasi-loader-rings {
	animation: spin ($speed * 1.2) linear infinite;
	border: 3px solid transparent;
	border-radius: 50%;
	border-top-color: $green;
	display: block;
	height: 100px;
	position: relative;
	width: 100px;

	&::before {
		animation: spin ($speed * 2.5) linear infinite;
		border: 3px solid transparent;
		border-radius: 50%;
		border-top-color: lighten($green, 50%);
		bottom: 5px;
		content: '';
		left: 5px;
		position: absolute;
		right: 5px;
		top: 5px;
	}

	&::after {
		animation: spin ($speed * 1.5) linear infinite;
		border: 3px solid transparent;
		border-radius: 50%;
		border-top-color: darken($green, 50%);
		bottom: 15px;
		content: '';
		left: 15px;
		position: absolute;
		right: 15px;
		top: 15px;
		background-color: $green;
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

@keyframes spin {

	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>