<template>
	<div v-if="selectedValues.length > 0" class="chip-group-wrapper flex-row">
		<span class="facet-name">{{ facet.displayLabel }}:</span>
		<div class="flex-row flex-wrap">
			<ui-chip
				v-for="facetValue in selectedValues"
				:key="facetValue.label"
				close
				@close="$emit('deselect', facetValue)"
			>
				<div>{{ facetValue.displayLabel ? facetValue.displayLabel : facetValue.label }}</div>
			</ui-chip>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IResourceSearchFacet } from '@/types/Search';

@Component({
	name: 'FacetChipGroup'
})
export default class FacetChipGroup extends Vue {

	/* Props
    ============================================*/

	@Prop({type: Object as () => IResourceSearchFacet, required: true})
	readonly facet: IResourceSearchFacet;

	/* Computed
    ============================================*/

	get selectedValues() {
		return this.facet.values.filter(v => v.isSelected);
	}
}
</script>

<style lang='scss' scoped>
.chip-group-wrapper {
	margin: 0.5rem 1rem;
	.facet-name {
		margin-right: 1rem;
	}
}
</style>