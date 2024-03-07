<template>
	<div :class="['text-item-container', { readonly }]">
		<div class="label txt-sm">
			{{ item.label }}
		</div>
		<text-input
			class="input-wrapper"
			v-model="item.value"
			:readonly="readonly"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {ILabeledEditableItem} from '@/types/ILabeledItem';

@Component({
	name: 'TextItem',
	components: {},
})
export default class TextItem extends Vue {

	@Prop()
	item: ILabeledEditableItem;


	@Prop({ type: Boolean })
	readonly: boolean;


}
</script>

<style lang="scss">

.text-item-container {
	.label {
		color: $dark-neutral;
		font-weight: bold;
	}

	&.readonly {
		.eaasi-form-control {
			.eaasi-input-wrapper {
				border-bottom: 2px solid lighten($dark-neutral, 70%);
				margin-bottom: 1rem;
				padding-bottom: 0;
				input {
					color: darken($dark-neutral, 60%);
				}
			}
		}
	}
}

</style>