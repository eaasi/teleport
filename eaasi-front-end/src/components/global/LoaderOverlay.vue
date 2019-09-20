<template>
	<div class="eaasi-loader-wrapper flex flex-center">
		<loader />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

/**
 * A loading overlay with an animated spinner
 */
@Component({
	name: 'LoaderOverlay'
})
export default class LoaderOverlay extends Vue {}
</script>

<style lang="scss">

.eaasi-loader-wrapper {
	background-color: rgba(255, 255, 255, 0.35);
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
}

</style>