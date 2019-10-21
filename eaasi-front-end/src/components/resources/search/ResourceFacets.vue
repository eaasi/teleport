<template>
	<div class="resource-facets">
		<h2>Refine Your Results</h2>
		<checkbox-facet
			v-for="(f, i) in facets"
			:key="i"
			:facet="facets[i]"
			@expand="expandSearchFacet(f)"
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
import { Sync } from 'vuex-pathify';
import { Component, Watch } from 'vue-property-decorator';
import { IResourceSearchFacet, IResourceSearchResponse, IResourceSearchQuery } from '@/types/Search.d.ts';
import { jsonCopy, jsonEquals } from '@/utils/functions';

@Component({
	name: 'ResourceFacets'
})
export default class ResourceFacets extends Vue {

	/* Computed
	============================================*/

    @Sync('resource/query@selectedFacets')
	facets: IResourceSearchFacet[]

	/* Data
	============================================*/
	activeSearchFacet: IResourceSearchFacet = null;

	/* Methods
	============================================*/

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