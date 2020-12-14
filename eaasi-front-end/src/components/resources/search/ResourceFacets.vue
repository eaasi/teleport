<template>
	<div class="resource-facets">
		<h2>Refine Your Results</h2>
		<checkbox-facet
			v-for="(f, i) in availableFacets"
			:key="i"
			:facet="availableFacets[i]"
			@expand="expandSearchFacet(f)"
			@change="$emit('change')"
			:init-state="isExpanded(f)"
		/>
		<search-facet-modal
			v-if="activeSearchFacet"
			:facet="activeSearchFacet"
			@close="closeSearchFacetModal"
			@apply="applySearchFacetValues"
			@deselect="deselectAllFacetValues"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Sync, Get } from 'vuex-pathify';
import { Component } from 'vue-property-decorator';
import { IResourceSearchFacet } from '@/types/Search.d.ts';
import { jsonCopy } from '@/utils/functions';

@Component({
	name: 'ResourceFacets'
})
export default class ResourceFacets extends Vue {

	/* Computed
	============================================*/

    @Sync('resource/query@selectedFacets')
	facets: IResourceSearchFacet[];

	@Get('resource/facetsOfSingleTypeSelected')
	facetsOfSingleTypeSelected: Boolean;

	@Get('resource/facetsOfResourceTypesSelected')
	facetsOfResourceTypesSelected: String[];

    get availableFacets() {
    	return this.facets.filter(f => f.values.length > 0);
    }

	/* Data
	============================================*/
	activeSearchFacet: IResourceSearchFacet = null;

	/* Methods
	============================================*/
	isExpanded(f) {
		if (!this.facetsOfSingleTypeSelected || f.name === 'resourceType') return false;
		const sameResourceType = f.values.some(
			v => v.resourceType === this.facetsOfResourceTypesSelected[0]
		);
		return !sameResourceType;
	}

	closeSearchFacetModal() {
		this.activeSearchFacet = null;
	}

	deselectAllFacetValues() {
		this.activeSearchFacet.values.forEach(v => v.isSelected = false);
	}

	expandSearchFacet(facet) {
		this.activeSearchFacet = jsonCopy(facet);
	}

	applySearchFacetValues() {
		this.facets = this.facets.slice().map(
			f => this.activeSearchFacet.name === f.name ? this.activeSearchFacet : f
		);
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