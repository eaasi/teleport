<template>
	<div :class="['li-container', 'editable-container', { readonly }]" style="margin-bottom: 1rem;">
		<div class="li-label">
			{{ item.label }}
		</div>
		<p v-if="readonly" :class="['input-wrapper', { changed: item.value !== localItem.value }]">{{ selectedValue }}</p>
		<select-list v-else-if="!readonly" v-model="item.value" :class="['input-wrapper', { changed: item.value !== localItem.value }]" readonly>
			<option
				v-for="(option, index) in item.data"
				:key="index"
				:value="option[anchor]"
			>
				{{ option[label] }}
			</option>
		</select-list>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ILabeledEditableItem } from '@/types/ILabeledItem';
import { jsonCopy } from '@/utils/functions';
import eventBus from '@/utils/event-bus';

@Component({
    name: 'EditableSelectList'
})
export default class EditableSelectList extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Object as () => ILabeledEditableItem })
    item: ILabeledEditableItem;

    @Prop({ type: Boolean })
    readonly: Boolean;

    @Prop({ type: String, required: true })
    anchor: string;

    @Prop({ type: String, required: true })
    label: string;

    @Prop({ type: String })
    defaultSelected: string;

    /* Computed
    ============================================*/
    get selectedValue() {
        const dataItem = this.item.data.find(d => d.value === this.item.value);
        return dataItem ? dataItem[this.label] : this.defaultSelected;
    }

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

<style lang='scss' scoped>
.li-container {
	p {
		padding: 0.6rem;
	}
	margin-bottom: 1rem;
}
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

	.input-wrapper {

		&.changed {
			background: lighten($yellow, 60%);
		}
	}
}
</style>