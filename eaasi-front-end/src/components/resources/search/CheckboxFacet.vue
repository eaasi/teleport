<template>
	<search-facet-wrapper
		:label="facet.displayLabel"
		collapsable
		:init-state="initState"
	>
		<div
			v-for="v in facet.values"
			:key="v.label"
			class="flex-row checkbox-facet"
		>
			<checkbox
				:label="v.displayLabel ? v.displayLabel : v.label"
				v-model="v.isSelected"
				@change="$emit('change');"
				style="margin-bottom: 1rem;"
			/>
			<span class="facet-total">({{ v.total }})</span>
		</div>
		<ui-button
			v-if="facet.values.length > maxDisplayLimit"
			size="sm"
			color-preset="light-blue"
			style="display: block; margin-top: 1rem;"
			@click="$emit('expand', facet)"
		>
			See All {{ facet.name }} <span class="fas fa-chevron-right"></span>
		</ui-button>
	</search-facet-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import SearchFacetWrapper from './SearchFacetWrapper.vue';
import { IResourceSearchFacet } from '@/types/Search';

@Component({
	name: 'CheckboxFacet',
	components: {
		SearchFacetWrapper
	}
})
export default class CheckboxFacet extends Vue {

	/* Props
	============================================*/

	@Prop({type: Number, required: false, default: 4})
	readonly maxDisplayLimit: Number

	@Prop({type: Object as () => IResourceSearchFacet, required: true})
	readonly facet: IResourceSearchFacet

	@Prop({ type: Boolean })
	readonly initState: Boolean;

}

</script>

<style lang="scss">
.checkbox-facet {
	align-content: center;

	.facet-total {
		color: lighten($grey, 10%);
		font-size: 1.2rem;
		margin-bottom: 1rem;
		margin-left: 0.6rem;
	}
}
</style>