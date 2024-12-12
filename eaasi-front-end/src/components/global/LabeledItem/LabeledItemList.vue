<template>
	<div class="lil-container" v-if="labeledItems.length > 0">
		<h6 class="uppercase" v-if="title">{{ title }}</h6>
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
	readonly labeledItems: ILabeledItem[]

	@Prop({ type: String, required: false })
	readonly title: string;
}
</script>

<style lang="scss">
	.lil-container {
		background-color: $light-grey;
		margin: 1.2rem 1.2rem 1.2rem 0;
		min-height: 20rem;
		padding: 2.4rem;

		.lil-no-data {
			padding: 1.2rem;
		}

		h6 {
			font-size: 1.3rem;
			margin-bottom: 1.5rem;
		}
	}
</style>
