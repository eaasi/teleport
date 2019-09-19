<template>
	<search-facet-wrapper
		:label="facet.name"
		collapsable
	>
		<div
			v-for="v in facet.values"
			:key="v.label"
			class="flex-row checkbox-facet"
		>
			<checkbox
				:label="v.label"
				v-model="v.isSelected"
				style="margin-bottom: 1rem;"
			/>
			<span class="facet-total">({{ v.total }})</span>
		</div>
	</search-facet-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import SearchFacetWrapper from './SearchFacetWrapper.vue';
import { IResourceSearchFacet } from '@/types/Search.d.ts';

@Component({
	name: 'CheckboxFacet',
	components: {
		SearchFacetWrapper
	}
})
export default class CheckboxFacet extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IResourceSearchFacet, required: true})
	readonly facet: IResourceSearchFacet

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
.checkbox-facet {

	.facet-total {
		color: lighten($grey, 10%);
		font-size: 1.2rem;
		margin-left: 0.4rem;
	}
}
</style>