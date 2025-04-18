<template>
	<div class="rdm-container">
		<div class="row" style="margin-bottom: 1rem;">
			<div class="col-md-5">
				<resource-details-summary
					:summary-data="resource"
					:readonly="!isEditMode"
				/>
				<div class="owner-label" v-if="ownerLabel">Owner: {{ ownerLabel }}</div>
			</div>
		</div>
		<div class="row">
			<div class="rdm-section-item">
				<section-heading title="Configured Drives" size="large" />
				<configured-drives
					:readonly="!isEditMode"
					:drives="drives"
					@update-drives="updateDrives"
				/>
			</div>
			<div class="rdm-section-item">
				<section-heading title="Environment Options" size="large" />
				<editable-labeled-item-list
					:readonly="!isEditMode"
					:labeled-items="uiOptionLabeledItems"
				/>
			</div>
			<div class="rdm-section-item">
				<section-heading title="Emulator" size="large" />
				<configure-emulator
					:readonly="!isEditMode"
					:emulator-items="emulatorLabeledItems"
				/>
			</div>
		</div>
		<div class="row">
		</div>
		<div class="row">
			<div v-if="installedSoftware.length" class="rdm-section-item">
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

	@Prop({ type: Array as () => ILabeledEditableItem[] })
	uiOptionLabeledItems: ILabeledEditableItem[];

	@Prop({ type: Array as () => ILabeledEditableItem[] })
	networkLabeledItems: ILabeledEditableItem[];

	@Prop({ type: Array as () => ILabeledItem[] })
	installedSoftware: ILabeledItem[];

	@Prop({ type: Array as () => ILabeledEditableItem[] })
	configMachineLabeledItems: ILabeledEditableItem[];

	@Prop({ type: String })
	ownerLabel: string;

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

		.row {
			margin: 0;
			justify-content: left;
			gap: 40px;

			.rdm-section-item {

			}
		}
	}
	.vds-container {

		.vds-footer {
			font-size: 0.8rem;

			.vds-label {
				text-transform: uppercase;
			}
		}
	}
	.owner-label {
		margin-bottom: 10px;
	}
</style>