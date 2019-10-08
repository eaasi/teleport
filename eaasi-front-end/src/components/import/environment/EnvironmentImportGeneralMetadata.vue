<template>
	<div class="env-import-general-metadata">
		<text-input
			label="Environment Name"
			rules="required"
			placeholder="Enter a name or title for this resource"
		/>
		<text-area-input
			label="Environment Description"
			placeholder="Enter a description..."
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'EnvironmentImportGeneralMetadata',
})
export default class EnvironmentImportGeneralMetadata extends Vue {

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

<style lang="scss"></style>