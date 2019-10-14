<template>
	<modal @close="$emit('close')">
		<template #header>
			<h3>Filter {{ facet.name }}</h3>
		</template>
		<div class="filter-wrapper flex-row">
			<div 
				v-for="att in attributes" 
				:key="att.label" 
				@click="filterFacetValues(att)"
				:class="['filter-item', { disabled: att.facetValues.length < 1 }]"
			>
				{{ att.label.toUpperCase() }}
			</div>
		</div>
		<div class="facet-grid flex-column">
			<div 
				v-for="facetValue in activeAttribute.facetValues" 
				:key="facetValue.label" 
				class="flex-row checkbox-facet"
			>
				<checkbox
					:label="facetValue.label"
					v-model="facetValue.isSelected"
				/>
				<span class="facet-total">({{ facetValue.total }})</span>
			</div>
		</div>
		<div class="clear-btn-wrapper">
			<ui-button @click="$emit('clear-filters', facet)" secondary>
				Clear ALL Filters
			</ui-button>
		</div>
		<template #footer>
			<div class="footer-btns-wrapper">
				<div class="footer-btns flex-row">
					<ui-button @click="$emit('close')" secondary>
						Cancel
					</ui-button>
					<ui-button @click="$emit('apply-filters')">
						Apply Changes
					</ui-button>
				</div>
			</div>
		</template>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IResourceSearchFacet, IResourceSearchFacetAttribute, IResourceSearchFacetValue } from '@/types/Search.d.ts';

@Component({
	name: 'SearchFacetModal'
})
export default class SearchFacetModal extends Vue {

    /* Props
    ============================================*/
    @Prop({type: Object as () => IResourceSearchFacet, required: true})
    readonly facet: IResourceSearchFacet

    /* Data
    ============================================*/
    attributes: IResourceSearchFacetAttribute[] = []
    activeAttribute: IResourceSearchFacetAttribute = null

    /* Methods
    ============================================*/
    filterFacetValues(attribute) {
    	if(attribute.facetValues.length < 1) return;
    	this.activeAttribute = attribute;
    }

    initAttributes() {
    	const attributeLabels: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
    	const defaultAttribute: IResourceSearchFacetAttribute = {
    		label: '#', 
    		facetValues: this.facet.values
    	};
    	const attributes: IResourceSearchFacetAttribute[] = attributeLabels.map(attLabel => {
    		let facetValues: IResourceSearchFacetValue[] = [];
    		this.facet.values.forEach(facetValue => {
    			console.log(facetValue.label.charAt(0).toLowerCase() === attLabel);
    			if(facetValue.label.charAt(0).toLowerCase() === attLabel) {
    				facetValues.push(facetValue);
    			}
    		});
    		return { label: attLabel, facetValues };
    	});
    	attributes.unshift(defaultAttribute);
    	this.activeAttribute = defaultAttribute;
    	this.attributes = attributes;
    }

    /* Lifecycle Hooks
    ============================================*/
    beforeMount() {
    	this.initAttributes();
    }

}
</script>

<style lang='scss' scoped>
.filter-wrapper {
	background-color: lighten($light-neutral, 60%);
	border-top: 4px solid darken($light-neutral, 10%);
	justify-content: space-evenly;
	padding: 1rem 0;
	.filter-item {
		color: $dark-blue;
		cursor: pointer;
		font-size: 16px;
		padding: 0.5rem;
		&.disabled {
			cursor: not-allowed;
			opacity: 0.4;
		}
	}
}
.facet-grid {
	flex-wrap: wrap;
	margin-top: 1.5rem;
	max-height: 400px;
}
.checkbox-facet {
	margin-bottom: 1rem;

	.facet-total {
		color: lighten($grey, 10%);
		font-size: 1.2rem;
		margin-left: 0.4rem;
	}
}
.clear-btn-wrapper {
	border-top: 1px solid darken($light-neutral, 10%);
	padding: 1rem;
}
.footer-btns-wrapper {
	border-top: 2px solid darken($light-neutral, 10%);
}
.footer-btns {
	float: right;
	justify-content: space-between;
	max-width: 50%;
	padding: 2rem;
	width: 100%;
}
</style>