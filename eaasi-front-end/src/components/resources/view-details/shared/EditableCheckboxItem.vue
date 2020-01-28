<template>
	<div class="li-container flex-row">
		<checkbox v-model="item.value" :disabled="readonly" />
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
    name: 'EditableTextItem'
})
export default class EditableTextItem extends Vue {

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