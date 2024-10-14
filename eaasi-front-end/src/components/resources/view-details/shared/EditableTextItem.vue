<template>
	<div :class="['li-container', 'editable-container', { readonly }]">
		<div class="li-label">
			{{ item.label }}
		</div>
		<text-input
			:class="['input-wrapper', { changed: item.value !== localItem.value }]"
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
import eventBus from '@/utils/event-bus';

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

    /* Data
    ============================================*/
    localItem: ILabeledEditableItem;

	refresh() {
		this.localItem = jsonCopy(this.item);
		this.$forceUpdate();
	}

	/* Lifecycle Methods
		============================================*/
	created() {
		this.refresh();
		eventBus.$on('editable-item:refresh', this.refresh);
	}

}
</script>

<style lang='scss'>
.editable-container {
	.li-label {
		color: lighten($medium-grey, 35%);
		font-weight: bold;
	}
	.eaasi-form-control {
		.eaasi-input-wrapper {
			input {
				color: $medium-grey;
			}
		}
	}

	&.readonly {
		.eaasi-form-control {
			.eaasi-input-wrapper {
				border-bottom: 1px solid $light-grey;
				margin-bottom: 1rem;
			}
		}
	}

	.input-wrapper {

		input {
			color: darken($medium-grey, 30%);
			font-size: 1.6rem;
		}

		&.changed {
			background: lighten($yellow, 60%);
		}
	}
}
</style>