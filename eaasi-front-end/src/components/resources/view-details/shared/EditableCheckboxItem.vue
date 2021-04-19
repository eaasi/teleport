<template>
	<div class="li-container flex-row editable-checkbox">
		<checkbox
			v-model="item.value"
			v-if="!readonly"
		/>
		<div :class="['li-value', 'text-bold', { changed }]">
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
    get changed() {
        return this.item.value !== this.localItem.value;
    }

    get displayValue() {
    	if (this.item.value === false) {
    		return 'FALSE';
		}
    	return 'TRUE';
	}

	get displayColor() {
		if (this.item.value === false) {
			return 'red';
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


    /* Lifecycle Methods
    ============================================*/
	beforeMount() {
		this.localItem = jsonCopy(this.item);
	}

}
</script>

<style lang='scss' scoped>
.li-container {
	border-bottom: 1px solid $light-neutral;
	margin-bottom: 1rem;
	.li-value {
		border-bottom: none;
		display: flex;
		flex-grow: 1;
		margin: 0.8rem 1rem 0.4rem 0;
		padding: 0;

		&.changed {
			background: lighten($yellow, 60%);
		}
	}

	.display-value {
		display: flex;
		flex-grow: 1;
		font-size: 1.3rem;
		font-weight: bold;
		justify-content: flex-end;
	}

	.green {
		color: #00AE58;
	}

	.red {
		color: #BC6464;
	}

	.check-state-icon {
		padding-right: 1rem;
	}
}

</style>