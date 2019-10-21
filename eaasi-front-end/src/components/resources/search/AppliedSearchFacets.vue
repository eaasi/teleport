<template>
	<div class="applied-facets-wrapper flex-row">
		<div class="applied-facets flex-row flex-wrap">
			<div 
				v-for="facet in selectedFacets" 
				:key="facet.name" 
				class="active-facet flex-row"
			>
				<facet-chip-group :facet="facet" @deselect="deselectFacetValue" />
			</div>
		</div>
		<div class="btn-section">
			<ui-button secondary @click="deselectAllFacetValues">
				Clear ALL Filters
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Get, Sync } from 'vuex-pathify';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IResourceSearchFacet, IResourceSearchQuery } from '@/types/Search.d.ts';
import FacetChipGroup from './FacetChipGroup.vue';

@Component({
	name: 'AppliedSearchFacets',
	components: { FacetChipGroup }
})
export default class AppliedSearchFacets extends Vue {

	/* Computed
    ============================================*/

    @Sync('resource/query@selectedFacets')
	selectedFacets: IResourceSearchFacet[];

    /* Methods
    ============================================*/

    deselectFacetValue(facetValue) {
    	this.selectedFacets.forEach(
    		f => f.values.forEach(v => v.label === facetValue.label ? v.isSelected = false : null )
    	);
    }

    deselectAllFacetValues() {
    	this.selectedFacets.forEach(f => f.values.forEach(v => v.isSelected = false));
	}
	
	search() {
		console.log('search')
	}

}
</script>

<style lang='scss' scoped>
.applied-facets-wrapper {
	align-items: stretch;
	background-color: lighten($light-neutral, 40%);
	border-bottom: 2px solid darken($light-neutral, 10%);
	justify-content: space-between;
	margin-left: 28rem;
	padding: 1rem;
	.active-facet {
		margin: 0.5rem 1rem;
	}
	.btn-section {
		border-left: 2px solid darken($light-neutral, 10%);
		padding: 0.5rem 2rem;
	}
}
</style>