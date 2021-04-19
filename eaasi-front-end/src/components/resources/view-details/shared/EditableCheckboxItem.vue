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
			<p :class="['check-state-icon', 'fa', displayIcon]"></p>{{ displayValue }}
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
    		return "FALSE";
		}
    	return "TRUE";
	}

	get displayColor() {
		if (this.item.value === false) {
			return "red";
		}
		return "green";
	}

	get displayIcon() {
		if (this.item.value === false) {
			return "fa-times";
		}
		return "fa-check";
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
	.li-value {
		display: flex;
		flex-grow: 1;
		padding: 0!important;
		margin: 0.8rem 1rem!important;
		border-bottom: none!important;

		&.changed {
			background: lighten($yellow, 60%);
		}
	}

	.display-value {
		display: flex;
		flex-grow: 1;
		justify-content: flex-end;
		font-size: 1.3rem;
		font-weight: bold;
		margin: auto 0;
		padding-top: 1rem;
	}

	.green {
		color: #00AE58;
	}

	.red {
		color: #AE1329;
	}

	.check-state-icon {
		padding-right: 1rem;
	}
}

.editable-checkbox {
}
</style>