<template>
	<div class="resource-facets">
		<h2>Refine Your Results</h2>
		<checkbox-facet
			v-for="(f, i) in facets"
			:key="i"
			:facet="facets[i]"
			@expand="expandSearchFacetValues(f)"
		/>
		<search-facet-modal 
			v-if="activeSearchFacet" 
			:facet="activeSearchFacet" 
			@close="closeSearchFacetModal" 
			@apply-filters="applySearchFacetValues"
			@clear-filters="unselectFacetValues"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Sync } from 'vuex-pathify';
import { Component } from 'vue-property-decorator';
import CheckboxFacet from '@/components/resources/search/CheckboxFacet.vue';
import { IResourceSearchFacet } from '@/types/Search.d.ts';
import { jsonCopy } from '@/utils/functions';
import SearchFacetModal from '../search/SearchFacetModal';
import { IResourceSearchFacet } from '@/types/Search.d.ts';

@Component({
	name: 'ResourceFacets',
	components: {
		CheckboxFacet,
		SearchFacetModal
	}
})
export default class ResourceFacets extends Vue {

	/* Data
	============================================*/
	activeSearchFacet: IResourceSearchFacet = null;
	facets = [ // TODO: These should come from ResourceSearchResult
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
					total: 2,
					isSelected: false
				},
				{
					label: 'Content Environments',
					total: 0,
					isSelected: false
				},
				{
					label: 'Some Type',
					total: 13,
					isSelected: false
				},
			]
		},
		{
			name: 'Network Status',
			values: [
				{
					label: 'Private',
					total: 4,
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
				},
				{
					label: 'Some Status',
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
	];

	/* Methods
	============================================*/

	closeSearchFacetModal() {
		this.activeSearchFacet = null;
	}

	unselectFacetValues(facet) {
		this.activeSearchFacet.values.map(v => v.isSelected = false);
	}

	expandSearchFacetValues(facet) {
		this.activeSearchFacet = jsonCopy(facet);
	}

	applySearchFacetValues() {
		const newFacets = this.facets.map(f => {
			if (this.activeSearchFacet.name === f.name) {
				return this.activeSearchFacet;
			} else {
				return f;
			}
		});
		this.facets = newFacets;
		this.closeSearchFacetModal();
	}

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