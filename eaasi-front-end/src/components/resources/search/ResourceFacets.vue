<template>
	<div class="resource-facets">
		<h2>Refine Your Results</h2>
		<checkbox-facet
			v-for="(f, i) in facets"
			:key="i"
			:facet="facets[i]"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import CheckboxFacet from '@/components/resources/search/CheckboxFacet.vue';
import { IResourceSearchFacet } from '@/types/Search.d.ts';

@Component({
	name: 'ResourceFacets',
	components: {
		CheckboxFacet
	}
})
export default class ResourceFacets extends Vue {

	/* Data
	============================================*/

	// TODO: These should come from ResourceSearchResult
	facets: IResourceSearchFacet[] = [
		{
			name: 'Resource Types',
			values: [
				{
					label: 'Environments',
					total: 75,
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
		},
		{
			name: 'Network Status',
			values: [
				{
					label: 'Private',
					total: 2,
					isSelected: false
				},
				{
					label: 'Public',
					total: 0,
					isSelected: false
				},
				{
					label: 'Remote',
					total: 73,
					isSelected: false
				}
			]
		},
		{
			name: 'Source Organization',
			values: [
				{
					label: 'Yale',
					total: 73,
					isSelected: false
				}
			]
		}
	]

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