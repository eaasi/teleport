<template>
	<div :class="['li-container', 'editable-container', { readonly }]">
		<div class="li-label">
			{{ item.label }}
		</div>
		<text-input
			:class="['input-wrapper', { changed }]"
			style="margin-bottom: 1rem;"
			v-model="item.value"
			:readonly="item.readonly || readonly"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ILabeledEditableItem } from '@/types/ILabeledItem';
import { jsonCopy } from '@/utils/functions';

@Component({
    name: 'EditableTextItem'
})
export default class EditableTextItem extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Object as () => ILabeledEditableItem })
    item: ILabeledEditableItem;

    @Prop({ type: Boolean })
    readonly: Boolean;

    /* Computed
    ============================================*/
    get changed() {
        return this.item.value !== this.localItem.value;
    }

    /* Data
    ============================================*/
    localItem: ILabeledEditableItem = jsonCopy(this.item);

}
</script>

<style lang='scss'>
.editable-container {
	.li-label {
		color: lighten($dark-neutral, 35%);
		font-weight: bold;
	}
	.eaasi-form-control {
		.eaasi-input-wrapper {
			input {
				color: $dark-neutral;
			}
		}
	}

	&.readonly {
		.eaasi-form-control {
			.eaasi-input-wrapper {
				border-bottom: 1px solid darken($light-neutral, 10%);
			}
		}
	}

	.input-wrapper {

		input {
			color: darken($dark-neutral, 20%)!important;
			font-size: 1.6rem;
		}

		&.changed {
			background: lighten($yellow, 60%);
		}
	}
}
</style>