<template>
	<div v-if="items.length" class="lil-container">
		<editable-text-item
			:item="licenseInformation"
			:readonly="readonly"
		/>
		<editable-text-item
			:item="allowedInstances"
			:readonly="readonly"
		/>
		<editable-text-item
			:item="qid"
			:readonly="readonly"
		/>
		<editable-checkbox-item
			:item="isOperatingSystem"
			:readonly="readonly || isOperatingSystem.readonly"
		/>
		<select-list
			v-if="!readonly && isOperatingSystem.value"
			v-model="selectedOs"
			label="Operation System Preset"
			style="margin-bottom: 1rem;"
			:disabled="readonly"
			@change="addOsPreset"
		>
			<option :value="null" disabled selected>Select Preset</option>
			<option v-for="os in operatingSystems" :key="os.id">
				{{ os.id }}
			</option>
		</select-list>

		<rendering-capabilities
			:native-f-m-ts="nativeFMTs"
			:readonly="readonly"
			@add="add"
			@remove="remove"
		/>
	</div>
	<div v-else-if="!items.length" class="lil-container">
		<span class="lil-no-data">No Data</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ILabeledEditableItem } from '@/types/ILabeledItem';
import EditableCheckboxItem from '../shared/EditableCheckboxItem.vue';
import EditableSelectList from '../shared/EditableSelectList.vue';
import EditableTextItem from '../shared/EditableTextItem.vue';
import RenderingCapabilities from './RenderingCapabilities.vue';
import { IOsItem } from '@/types/Resource';
import {operatingSystems} from '@/models/admin/OperatingSystems';

@Component({
    name: 'SoftwareProperties',
    components: {
        EditableCheckboxItem,
        RenderingCapabilities,
        EditableSelectList,
        EditableTextItem
    }
})
export default class SoftwareProperties extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Array as () => ILabeledEditableItem[], required: true })
    items: ILabeledEditableItem[];

    @Prop({ type: Array as () => IOsItem[] })
    osItems: IOsItem[];

    @Prop({ type: Boolean })
    readonly: Boolean;

    /* Computed
    ============================================*/
    get licenseInformation(): ILabeledEditableItem {
        return this.items.find(i => i.property === 'licenseInformation');
    }
    get allowedInstances(): ILabeledEditableItem {
        return this.items.find(i => i.property === 'allowedInstances');
    }
    get qid(): ILabeledEditableItem {
        return this.items.find(i => i.property === 'qid');
    }
    get isOperatingSystem(): ILabeledEditableItem {
        return this.items.find(i => i.property === 'isOperatingSystem');
    }
    get nativeFMTs(): ILabeledEditableItem {
        return this.items.find(i => i.property === 'nativeFMTs');
    }

    /* Data
    ============================================*/
    selectedOs: string = null;
    readonly operatingSystems = operatingSystems;

    /* Methods
    ============================================*/
    addOsPreset() {
        const selectedOs = this.operatingSystems.find(os => os.id === this.selectedOs);
        this.nativeFMTs.value.forEach(i => this.remove(i));
        selectedOs.puids.forEach(i => {
            if (!this.nativeFMTs.value.some(fmt => fmt === i.puid)) this.add(i.puid);
        });
    }

    add(fmt: string) {
        if (this.readonly) return;
        return this.$emit('add-fmt', fmt);
    }

    remove(fmt: string) {
        if (this.readonly) return;
        return this.$emit('remove-fmt', fmt);
    }

}
</script>