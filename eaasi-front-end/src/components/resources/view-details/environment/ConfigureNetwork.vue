<template>
	<div class="lil-container" v-if="networkItems.length > 0">
		<div>
			<editable-checkbox-item
				:item="connectEnvs"
				:readonly="readonly"
			/>
			<div v-if="connectEnvs.value">
				<editable-checkbox-item
					:item="enableInternet"
					:readonly="readonly"
				/>
				<editable-checkbox-item
					:item="serverMode"
					:readonly="readonly"
				/>
				<div v-if="serverMode.value">
					<editable-checkbox-item
						:item="enableSocks"
						:readonly="readonly"
					/>
					<editable-checkbox-item
						:item="localServerMode"
						:readonly="readonly"
					/>
					<div v-if="serverMode.value && !enableSocks.value">
						<editable-text-item
							:item="serverIp"
							:readonly="readonly"
						/>
						<editable-text-item
							:item="serverPort"
							:readonly="readonly"
						/>
					</div>
					<div style="color: #8d8784; font-size: 1.2rem; text-transform: uppercase;">
						{{ helpText.label }}
					</div>
					<text-area-input
						:class="{ 'changed': helpText.changed }"
						v-model="helpText.value"
						:readonly="readonly"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="lil-container" v-else-if="networkItems.length == 0">
		<span class="lil-no-data">No Data</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ILabeledEditableItem } from '@/types/ILabeledItem';
import EditableTextItem from '../shared/EditableTextItem.vue';
import EditableCheckboxItem from '../shared/EditableCheckboxItem.vue';

@Component({
    name: 'ConfigureNetwork',
    components: {
        EditableTextItem,
        EditableCheckboxItem
    }
})
export default class ConfigureNetwork extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Array })
    networkItems: ILabeledEditableItem[];

    @Prop({ type: Boolean })
    readonly: Boolean;

    /* Computed
    ============================================*/
    get connectEnvs() {
        return this.networkItems.find(i => i.property === 'connectEnvs');
    }
    get enableInternet() {
        return this.networkItems.find(i => i.property === 'enableInternet');
    }
    get serverMode() {
        return this.networkItems.find(i => i.property === 'serverMode');
    }
    get enableSocks() {
        return this.networkItems.find(i => i.property === 'enableSocks');
    }
    get localServerMode() {
        return this.networkItems.find(i => i.property === 'localServerMode');
    }
    get serverIp() {
        return this.networkItems.find(i => i.property === 'serverIp');
    }
    get serverPort() {
        return this.networkItems.find(i => i.property === 'serverPort');
    }
    get helpText() {
        return this.networkItems.find(i => i.property === 'helpText');
    }

}
</script>

<style lang='scss' scoped>

</style>