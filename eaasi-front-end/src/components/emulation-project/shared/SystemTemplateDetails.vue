<template>
	<div class="template-details-wrapper">
		<labeled-item-list
			readonly
			:labeled-items="templateDetailItems"
			edit-type="text-input"
			title="Template Details"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { ILabeledEditableItem, ILabeledItem } from '../../../types/ILabeledItem';
import { ITemplate } from '../../../types/Import';
import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';

@Component({
    name: 'SystemTemplateDetails',
    components: {
        LabeledItemList
    }
})
export default class SystemTemplateDetails extends Vue {

	/* Props
    ============================================*/
    @Prop({ type: Object as () => ITemplate, required: true })
    template: ITemplate;

	/* Computed
	============================================*/
	get templateDetailItems(): ILabeledItem[] {
        let items = [
            {
                label: 'Emulator',
                value: this.template.properties.find(prop => prop.name === 'EmulatorContainer')?.value,
            },
            {
                label: 'CPU Architecture',
                value: this.template.properties.find(prop => prop.name === 'Architecture')?.value,
            }
        ];
		return items;
	};

	/* Data
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

}
</script>

<style lang='scss' scoped>

</style>