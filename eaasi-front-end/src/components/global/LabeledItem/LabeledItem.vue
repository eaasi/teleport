<template functional>
	<div class="li-container">
		<div class="li-label">{{ props.labeledItem.label }}</div>
		<p class="li-value">{{ props.labeledItem.value }}</p>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ILabeledItem } from '@/types/ILabeledItem';

/**
 * A labeled item
*/
@Component({
	name: 'LabeledItem.vue'
})
export default class LabeledItem extends Vue {
	/**
	 * Labeled item display data
	 */
	@Prop({type: Object as () => ILabeledItem, required: true})
	readonly labeledItem : ILabeledItem
}
</script>

<style lang="scss">
	.li-container {
		color: $medium-grey;

		.li-label {
			color: lighten($grey, 20%);
			font-size: 1.2rem;
			margin-bottom: 0.4rem;
			margin-top: 0.5rem;
			text-transform: uppercase;
		}

		.li-value {
			border-bottom: solid 1px lighten($dark-light-grey, 60%);
			font-size: 1.6rem;
			margin: 0.4rem 0 1rem;
			padding-bottom: 1rem;
		}
	}
</style>
