<template>
	<div v-if="emulatorItems.length > 0" class="lil-container">
		<editable-text-item
			:item="emulator"
			:readonly="readonly"
		/>

		<editable-text-item
			:item="nativeConfig"
			:readonly="readonly"
		/>

		<editable-checkbox-item
			:item="linuxRuntime"
			:readonly="readonly"
		/>

		<editable-select-list
			:item="containerVersion"
			:readonly="readonly"
			default-selected="latest"
			anchor="value"
			label="key"
		/>
	</div>
	<div v-else-if="emulatorItems.length < 1" class="lil-container">
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

@Component({
    name: 'ConfigureEmulator',
    components: {
        EditableCheckboxItem,
        EditableSelectList,
        EditableTextItem
    }
})
export default class ConfigureEmulator extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Array as () => ILabeledEditableItem[], required: true })
	emulatorItems: ILabeledEditableItem[]

    @Prop({ type: Boolean })
    readonly: Boolean;

    /* Computed
    ============================================*/
    get emulator() {
        return this.emulatorItems.find(i => i.property === 'emulator');
    }
    get nativeConfig() {
        return this.emulatorItems.find(i => i.property === 'nativeConfig');
    }
    get linuxRuntime() {
        return this.emulatorItems.find(i => i.property === 'linuxRuntime');
    }
    get containerVersion() {
        return this.emulatorItems.find(i => i.property === 'containerVersion');
    }
    get os() {
        return this.emulatorItems.find(i => i.property === 'os');
    }
    get time() {
        return this.emulatorItems.find(i => i.property === 'time');
    }

}
</script>

<style lang='scss' scoped>

</style>