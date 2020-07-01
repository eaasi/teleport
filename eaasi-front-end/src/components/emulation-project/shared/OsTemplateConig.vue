<template>
	<div class="flex flex-row justify-between os-template-config">
		<labeled-item-list :labeled-items="firstSet" />
		<labeled-item-list :labeled-items="secondSet" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IOsListItem } from '../../../models/admin/OperatingSystems';
import { ILabeledItem } from '../../../types/ILabeledItem';
import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';

@Component({
    name: 'OsTemplateConfig',
    components: {
        LabeledItemList
    }
})
export default class OsTemplateConfig extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Object as () => IOsListItem, required: true })
    readonly osTemplate: IOsListItem;

    /* Computed
    ============================================*/

    get firstSet(): ILabeledItem[] {
        return this.labeledItems.splice(3, 4);
    }

    get secondSet(): ILabeledItem[] {
        return this.labeledItems.splice(0, 4);
    }

    get labeledItems(): ILabeledItem[] {
        return [
            {
                label: 'Emulator',
                value: this.osTemplate.template
            },
            {
                label: 'Disk',
                value: this.osTemplate.disk
            },
            {
                label: 'CPU Cores',
                value: this.osTemplate.template_params.cpu
            },
            {
                label: 'Audio Device',
                value: this.osTemplate.template_params.audio
            },
            {
                label: 'Network Device',
                value: this.osTemplate.template_params.net
            },
            {
                label: 'GPU Device',
                value: this.osTemplate.template_params.vga
            },
            {
                label: 'Memory',
                value: this.osTemplate.template_params.memory
            },
            {
                label: 'Pointer',
                value: this.osTemplate.template_params.pointer
            },
        ];
    }

    /* Data
    ============================================*/

    /* Methods
    ============================================*/

    /* Lifecycle Hooks
    ============================================*/

}
</script>

<style lang='scss'>
.os-template-config {

	.lil-container {
		flex: 1;
	}
}
</style>