<template>
	<div class="resource-facets">
		<h2>Refine Your Results</h2>
		<checkbox-facet
			:facet="facets[0]"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import CheckboxFacet from '@/components/search/CheckboxFacet.vue';
import { IResourceSearchFacet } from '@/types/Search.d.ts';

@Component({
	name: 'ResourceFacets',
	components: {
		CheckboxFacet
	}
})
export default class ResourceFacets extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/
	facets: IResourceSearchFacet[] = [
		{
			name: 'Resource Types',
			values: [
				{
					label: 'All Resource Types',
					total: 120,
					isSelected: true
				},
				{
					label: 'Environments',
					total: 120,
					isSelected: false
				},
				{
					label: 'Software',
					total: 0,
					isSelected: false
				},
				{
					label: 'Content Environments',
					total: 0,
					isSelected: false
				},
			]
		}
	]


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
		margin-bottom: 2rem;
	}
}
</style>