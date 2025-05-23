<template>
	<div class="li-container flex-row editable-checkbox">
		<checkbox
			class="checkbox-element"
			v-model="item.value"
			v-if="!readonly"
		/>
		<div :class="['li-value', 'text-bold', { changed: item.value !== localItem.value }]">
			{{ item.label }}
		</div>
		<div :class="['display-value', displayColor]">
			<span :class="['check-state-icon', 'fa', displayIcon]"></span>{{ displayValue }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ILabeledItem } from '@/types/ILabeledItem';
import { jsonCopy } from '@/utils/functions';
import eventBus from '@/utils/event-bus';

@Component({
    name: 'EditableCheckboxItem'
})
export default class EditableCheckboxItem extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Object as () => ILabeledItem })
    readonly item: ILabeledItem;

    @Prop({ type: Boolean })
    readonly readonly: Boolean;

    /* Computed
    ============================================*/
    get displayValue() {
    	if (this.item.value === false) {
    		return 'FALSE';
		}
    	return 'TRUE';
	}

	get displayColor() {
		if (this.item.value === false) {
			return 'black';
		}
		return 'green';
	}

	get displayIcon() {
		if (this.item.value === false) {
			return 'fa-times';
		}
		return 'fa-check';
	}

	/* Data
	============================================*/
	localItem: ILabeledItem = null;

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
	border-bottom: 1px solid $medium-grey;
	margin-bottom: 1rem;
	.li-value {
		border-bottom: none;
		display: flex;
		flex-grow: 1;
		margin: 0.8rem 1rem 0.4rem 0;
		padding: 0;
	}

	.display-value {
		display: flex;
		flex-grow: 1;
		font-size: 1.3rem;
		font-weight: bold;
		justify-content: flex-end;
	}

	.green {
		color: #008040;
	}

	.black {
		color: black;
	}

	.check-state-icon {
		padding-right: 1rem;
	}
}

.checkbox-element {
	margin-right: 1rem;
}

</style>