<template>
	<div class="lil-container">
		<div v-for="(labeledItem, index) in labeledItems" :key="index">
			<labeled-item :labeled-item="labeledItem" />
		</div>
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
		margin: 12px;
		padding: 24px;
	}
</style>
