<template>
	<div class="resource-facets">
		<h2>Refine Your Results</h2>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'ResourceFacets',
})
export default class ResourceFacets extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss">
.resource-facets {
	background-color: lighten($light-neutral, 80%);
	padding: 1.5rem;
	width: 25rem;

	h2 {
		font-weight: 300;
	}
}
</style>