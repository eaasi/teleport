<template>
	<div v-if="labeledItems.length > 0" class="lil-container">
		<div v-for="(item, index) in labeledItems" :key="index">
			<editable-text-item
				v-if="item.editType === 'text-input'"
				:item="item"
				:readonly="readonly"
			/>
			<editable-checkbox-item
				v-else-if="item.editType === 'checkbox'"
				:item="item"
				:readonly="readonly"
			/>
			<editable-select-list
				v-else-if="item.editType === 'select'"
				:item="item"
				:readonly="readonly"
			/>
		</div>
	</div>
	<div v-else class="lil-container">
		<span class="lil-no-data">No Data</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ILabeledItem } from '@/types/ILabeledItem';
import EditableTextItem from './EditableTextItem.vue';
import EditableCheckboxItem from './EditableCheckboxItem.vue';
import EditableSelectList from './EditableSelectList.vue';

@Component({
    name: 'EditableLabeledItemList',
    components: {
		EditableTextItem,
		EditableSelectList,
        EditableCheckboxItem
    }
})
export default class EditableLabeledItemList extends Vue {

    /* Props
    ============================================*/
	@Prop({type: Array as () => ILabeledItem[], required: true })
	labeledItems: ILabeledItem[]
    
    @Prop({ type: Boolean })
    readonly: Boolean;

}
</script>

<style lang='scss' scoped>

</style>