<template>
	<div class="rdm-container">
		<div class="row" style="margin-bottom: 1rem;">
			<div class="col-md-4">
				<resource-details-summary
					:summary-data="resource"
					:readonly="!isEditMode"
				/>
				<section-legend
					v-if="isEditMode"
					:data="editLegend"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<section-heading title="Operating System" size="large" />
				<editable-labeled-item-list
					:readonly="true"
					:labeled-items="osLabeledItems"
					edit-type="text-input"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="Configured Machine" size="large" />
				<editable-labeled-item-list
					:readonly="!isEditMode"
					:labeled-items="configMachineLabeledItems"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="Emulator" size="large" />
				<configure-emulator
					:readonly="!isEditMode"
					:emulator-items="emulatorLabeledItems"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<section-heading title="Configured Drives" size="large" />
				<configured-drives
					:readonly="!isEditMode"
					:drives="drives"
					@update-drives="updateDrives"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="UI options" size="large" />
				<editable-labeled-item-list
					:readonly="!isEditMode"
					:labeled-items="uiOptionLabeledItems"
				/>
			</div>
			<div v-if="!isLinuxRuntimeSelected" class="col-md-4">
				<section-heading title="Networking" size="large" />
				<configure-network
					:readonly="!isEditMode"
					:network-items="networkLabeledItems"
				/>
			</div>
		</div>
		<div class="row">
			<div v-if="installedSoftware.length" class="col-md-4">
				<section-heading title="Configured software" size="large" />
				<labeled-item-list :labeled-items="installedSoftware" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {ILegend} from '@/types/Legend';
import Vue from 'vue';
import { Component, Prop} from 'vue-property-decorator';
import { IEnvironment, IDrive, IEditableDrive } from '@/types/Resource';
import { ILabeledEditableItem, ILabeledItem } from '@/types/ILabeledItem';
import EditableLabeledItemList from '../shared/EditableLabeledItemList.vue';
import ResourceDetailsSummary from '../shared/ResourceDetailsSummary.vue';
import ConfiguredDrives from './ConfiguredDrives.vue';
import ConfigureNetwork from './ConfigureNetwork.vue';
import ConfigureEmulator from './ConfigureEmulator.vue';
import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';
import ModeToggle from '../shared/ModeToggle.vue';
import SectionLegend from '@/components/global/LegendElement.vue';

@Component({
    name: 'EnvironmentMetadataSection',
    components: {
        EditableLabeledItemList,
		ResourceDetailsSummary,
		LabeledItemList,
		ConfiguredDrives,
		ConfigureNetwork,
		ConfigureEmulator,
		ModeToggle,
		SectionLegend
    }
})
export default class EnvironmentMetadataSection extends Vue {

	/* Data
    ============================================*/
	editLegend: ILegend = {
		color: 'yellow',
		text: 'Edited Field'
	}

    /* Props
    ============================================*/
	@Prop({ type: Object as () => IEnvironment, required: true })
	resource: IEnvironment;

	@Prop({ type: String })
	activeMode: String;

	@Prop({ type: Array as () => ILabeledEditableItem[] })
	emulatorLabeledItems : ILabeledEditableItem[];

	@Prop({ type:Array as () => ILabeledEditableItem[] })
	osLabeledItems: ILabeledEditableItem[];

	@Prop({ type: Array as () => ILabeledEditableItem[] })
	uiOptionLabeledItems: ILabeledEditableItem[];

	@Prop({ type: Array as () => ILabeledEditableItem[] })
	networkLabeledItems: ILabeledEditableItem[];

	@Prop({ type: Array as () => ILabeledItem[] })
	installedSoftware: ILabeledItem[];

	@Prop({ type: Array as () => ILabeledEditableItem[] })
	configMachineLabeledItems: ILabeledEditableItem[];

    /* Computed
    ============================================*/
	get drives(): IDrive[] {
        return this.resource.drives ? this.resource.drives : [];
    }

	get isEditMode(): boolean {
		return this.activeMode === 'Edit Mode';
	}

	get isLinuxRuntimeSelected(): boolean {
		if(this.emulatorLabeledItems && this.emulatorLabeledItems.length) {
			const item = this.emulatorLabeledItems.find(i => i.property === 'linuxRuntime');
			if (item) return item.value;
		} else return false;
	}

    /* Methods
	============================================*/
	updateDrives(drives: IEditableDrive[]) {
		this.resource.drives = drives;
	}

}
</script>

<style lang='scss' scoped>
	.rdm-container {
		padding: 24px;
	}
	.vds-container {

		.vds-description {
			font-size: 1.6rem;
		}

		.vds-footer {
			font-size: 0.8rem;

			.vds-label {
				text-transform: uppercase;
			}
		}
	}
</style>