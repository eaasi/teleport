<template>
	<div :class="['li-container', 'editable-container', { readonly }]">
		<div class="li-label">
			{{ localItem.label }}
		</div>
		<text-input
			style="margin-bottom: 1rem;"
			v-model="localItem.value"
			:readonly="readonly"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ILabeledItem } from '@/types/ILabeledItem';
import { jsonEquals, jsonCopy } from '../../../../utils/functions';

@Component({
    name: 'EditableTextItem'
})
export default class  extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Object as () => ILabeledItem })
    item: ILabeledItem;

    @Prop({ type: Boolean })
    readonly: Boolean;

    /* Computed
    ============================================*/
    get changed() {
        return this.item.value !== this.localItem.value;
    }

    /* Data
    ============================================*/
    localItem: ILabeledItem = jsonCopy(this.item);

    /* Methods
    ============================================*/

    /* Lifecycle Hooks
    ============================================*/

}
</script>

<style lang='scss'>
.editable-container {

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

	.li-value {

		&.changed {
			background: lighten($yellow, 60%);
		}
	}
}
</style>