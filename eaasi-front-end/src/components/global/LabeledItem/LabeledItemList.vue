<template>
	<div class="lil-container" v-if="labeledItems.length > 0">
		<div v-for="(labeledItem, index) in labeledItems" :key="index">
			<labeled-item :labeled-item="labeledItem" />
		</div>
	</div>
	<div v-else class="lil-container">
		<span class="lil-no-data">No Data</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {ILabeledItem} from '@/types/ILabeledItem';
import LabeledItem from './LabeledItem.vue';

/**
 * A list of LabeledDetails components for use as a categorical display of similar elements
*/
@Component({
	name: 'LabeledItemList.vue',
	components: {
		LabeledItem
	}
})
export default class LabeledDetailsList extends Vue {
	@Prop({type: Array as () => ILabeledItem[], required: true })
	labeledItems: ILabeledItem[]
}
</script>

<style lang="scss">
	.lil-container {
		background-color: lighten($light-neutral, 75%);
		margin: 1.2rem;
		padding: 2.4rem;

		.lil-no-data {
			padding: 1.2rem;
		}
	}
</style>
