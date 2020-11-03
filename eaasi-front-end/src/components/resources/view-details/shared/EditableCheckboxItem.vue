<template>
	<div class="li-container flex-row">
		<checkbox 
			v-model="item.value" 
			:disabled="readonly" 
		/>
		<p :class="['li-value', 'text-bold', { changed }]">
			{{ item.label }}
		</p>
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
		margin-left: 1rem;
		padding-bottom: 0.5rem;
		padding-top: 0.7rem;

		&.changed {
			background: lighten($yellow, 60%);
		}
	}
}
</style>