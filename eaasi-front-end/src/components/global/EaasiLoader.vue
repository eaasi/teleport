<template>
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

@Component({
	name: 'EaasiLoader',
	props: {

	}
})
export default class EaasiLoader extends Vue {}
</script>

<style lang="scss">
$baseColor: $dark-blue;
$speed: 0.8s;
.eeasi-loader-wrapper {
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
}
.eaasi-loader {
	position: relative;
	height: 80px;
	width: 80px;
}
.eaasi-logo {
	position: absolute;
	height: 38px;
	width: 38px;
	top: 24px;
	left: 24px;
	opacity: 1;
}
.eaasi-loader-rings {
	animation: spin ($speed * 1.2) linear infinite;
	border-radius: 50%;
	border: 3px solid transparent;
	border-top-color: $baseColor;
	display: block;
	position: relative;
	height: 80px;
	width: 80px;

	&:before {
		content: "";
		position: absolute;
		top: 5px;
		left: 5px;
		right: 5px;
		bottom: 5px;
		border-radius: 50%;
		border: 3px solid transparent;
		border-top-color: lighten($baseColor, 50%);
		animation: spin ($speed * 2.5) linear infinite;
	}

	&:after {
		content: "";
		position: absolute;
		top: 15px;
		left: 15px;
		right: 15px;
		bottom: 15px;
		border-radius: 50%;
		border: 3px solid transparent;
		border-top-color: darken($baseColor, 50%);
		animation: spin ($speed * 1.5) linear infinite;
	}
}

@-webkit-keyframes spin {
    0%   {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes spin {
    0%   {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>