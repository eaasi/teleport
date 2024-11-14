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
			<ui-button id="clearAllBtn" color-preset="white" @click="deselectAllFacetValues">
				Clear ALL Filters
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Get, Sync } from 'vuex-pathify';
import { Component } from 'vue-property-decorator';
import { IResourceSearchFacet} from '@/types/Search';
import FacetChipGroup from './FacetChipGroup.vue';
import UiButton from '@/components/global/UiButton.vue';

@Component({
	name: 'AppliedSearchFacets',
	components: { FacetChipGroup, UiButton }
})
export default class AppliedSearchFacets extends Vue {

	/* Computed
    ============================================*/

    @Sync('resource/query@selectedFacets')
	selectedFacets: IResourceSearchFacet[];

	@Get('resource/isSingleResult')
	readonly isSingleResult: boolean;

	/* Methods
    ============================================*/

	deselectFacetValue(facetValue) {
    	this.selectedFacets.forEach(
    		f => f.values.forEach(v => {
				if (v.label !== facetValue.label) return;
				v.isSelected = false;
			})
    	);
	}

	async deselectAllFacetValues() {
		this.selectedFacets.forEach(f => f.values.forEach(v => v.isSelected = false));
	}

}
</script>

<style lang='scss' scoped>
.applied-facets-wrapper {
	align-items: stretch;
	background-color: $medium-grey;
	justify-content: space-between;
	padding: 1rem;
	width: -webkit-fill-available;;
	.btn-section {
		padding: 0.5rem 2rem;
	}

}
@media screen and (max-width: 850px) {
	.applied-facets-wrapper {
		flex-direction: column;

		.btn-section {
			padding: 10px;
		}
	}

	.active-facet .flex-row{
		flex-wrap: wrap;
		gap: 10px;
	}
}
</style>