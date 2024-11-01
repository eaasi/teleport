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
			<ui-button @click="$emit('deselect', facet)" color-preset="white">
				Clear ALL Filters
			</ui-button>
		</div>
		<!--suppress HtmlUnknownAttribute -->
		<template #footer>
			<div class="footer-btns-wrapper">
				<div class="footer-btns flex-row pull-right">
					<ui-button @click="$emit('close')" color-preset="white">
						Cancel
					</ui-button>
					<ui-button @click="$emit('apply')">
						Apply Changes
					</ui-button>
				</div>
			</div>
		</template>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IResourceSearchFacet, IResourceSearchFacetAttribute, IResourceSearchFacetValue } from '@/types/Search';
import Checkbox from '@/components/global/forms/Checkbox.vue';
import Modal from '@/components/global/Modal/Modal.vue';
import UiButton from '@/components/global/UiButton.vue';

@Component({
	name: 'SearchFacetModal',
	components: {
		Checkbox,
		Modal,
		UiButton,
	}
})
export default class SearchFacetModal extends Vue {

    /* Props
    ============================================*/
    @Prop({type: Object as () => IResourceSearchFacet, required: true})
    readonly facet: IResourceSearchFacet;

    /* Data
    ============================================*/
    attributes: IResourceSearchFacetAttribute[] = [];
    activeAttribute: IResourceSearchFacetAttribute = null;

    /* Methods
    ============================================*/
    filterFacetValues(attribute) {
    	if (attribute.facetValues.length < 1) return;
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
    			if (facetValue.label.charAt(0).toLowerCase() === attLabel) {
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
	background-color: $green-background;
	border-top: 4px solid $dark-green;
	justify-content: space-evenly;
	padding: 1rem 0;
	color: $medium-grey;

	.filter-item {
		color: $dark-green;
		cursor: pointer;
		font-size: 16px;
		padding: 0.5rem;
		font-weight: 600;
		&.disabled {
			cursor: not-allowed;
			opacity: 0.7;
			color: #232323;
			font-weight: 300;
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
		color: lighten($dark-light-grey, 10%);
		font-size: 1.2rem;
		margin-left: 0.4rem;
	}
}
.clear-btn-wrapper {
	padding: 1rem 0;
}
.footer-btns-wrapper {
	border-top: 2px solid darken($light-grey, 10%);
}
.footer-btns {
	justify-content: space-between;
	max-width: 50%;
	padding: 2rem;
	width: 100%;
}
</style>