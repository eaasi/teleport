<template>
	<div>
		<mode-toggle 
			:editable="isEditMode"
			@mode-change="onModeChange"
			@save="saveDetails"
			@reset="resetResource"
			:toggle-value="toggleValue"
			:toggle-options="toggleOptions"
		/>
		<div class="rdm-container">
			<div class="row">
				<div class="col-md-4">
					<resource-details-summary 
						:summary-data="resource" 
						:readonly="!isEditMode"
					/>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<section-heading title="Operating System" size="large" />
					<editable-labeled-item-list
						:readonly="!isEditMode"
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
						:drives="resource.drives"
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
				<div class="col-md-4" v-if="!isLinuxRuntimeSelected">
					<section-heading title="Networking" size="large" />
					<configure-network 
						:readonly="!isEditMode"
						:network-items="networkLabeledItems"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary, IEnvironment, IEaasiResource, IDrive, IEditableDrive } from '@/types/Resource';
import { resourceTypes } from '@/utils/constants';
import { ILabeledEditableItem } from '@/types/ILabeledItem';
import EditableLabeledItemList from './EditableLabeledItemList.vue';
import ResourceDetailsSummary from '@/components/resources/view-details/metadata/ResourceDetailsSummary.vue';
import ConfiguredDrives from './ConfiguredDrives.vue';
import ConfigureNetwork from './ConfigureNetwork.vue';
import ConfigureEmulator from './ConfigureEmulator.vue';
import ModeToggle from './ModeToggle.vue';

@Component({
    name: 'EnvironmentMetadataSection',
    components: {
        EditableLabeledItemList,
        ResourceDetailsSummary,
		ConfiguredDrives,
		ConfigureNetwork,
		ConfigureEmulator,
		ModeToggle
    }
})
export default class EnvironmentMetadataSection extends Vue {

    /* Props
    ============================================*/
	@Prop({ type: Object as () => IEnvironment, required: true })
    resource: IEnvironment;

    /* Computed
    ============================================*/

    /**
	 * Parses the environment data for emulator-specific properties
	 */
	get drives(): IDrive[] {
        return this.resource.drives ? this.resource.drives : [];
    }
    
	get configMachineLabeledItems() : ILabeledEditableItem[] {
		return [];
	}

	get isEditMode(): boolean {
		return this.toggleValue === 'Edit Mode';
	}

	get isLinuxRuntimeSelected(): boolean {
		const item = this.emulatorLabeledItems.find(i => i.property === 'isLinuxRuntime');
		if (item) return item.value;
	}

	/* Data
	============================================*/
	toggleOptions = ['Review Mode', 'Edit Mode'];
	toggleValue: string = this.toggleOptions[0];
	emulatorLabeledItems : ILabeledEditableItem[] = [];
	osLabeledItems: ILabeledEditableItem[] = [];
	uiOptionLabeledItems: ILabeledEditableItem[] = [];
	networkLabeledItems: ILabeledEditableItem[] = [];

    /* Methods
	============================================*/
	onModeChange(mode: string) {
		this.toggleValue = mode;
	}

	async saveDetails() {
		this.emulatorLabeledItems.forEach(el => this.resource[el.property] = el.value);
		this.uiOptionLabeledItems.forEach(el => this.resource[el.property] = el.value);
		this.networkLabeledItems.forEach(el => this.resource.networking[el.property] = el.value);
		const result = await this.$store.dispatch('resource/updateEnvironmentDetails', this.resource);
		if (result && result.id) this.toggleValue = this.toggleOptions[0];
	}

	updateDrives(drives: IEditableDrive[]) {
		this.resource.drives = drives;
	}

	resetResource() {
		this.init();
		this.$emit('reset');
	}

	async init() {
		await this._populateEmulatorConfig();
		this._populateOperatingSystemConfig();
		this._populateUIOptions();
		this._populateNetworkOptions();
	}

    /* Lifecycle Hooks
	============================================*/

	beforeMount() {
		this.init();
	}

	 /* Helpers
	============================================*/

	async _populateEmulatorConfig() {
		const nameIndexes = await this.$store.dispatch('resource/getNameIndexes');
		const operatingSystemMetadata = await this.$store.dispatch('resource/getOperatingSystemMetadata');
		this.emulatorLabeledItems = [
			{
				label: 'Name',
				value: this.resource.emulator,
				property: 'emulator',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Emulator Configuration',
				value: this.resource.nativeConfig,
				property: 'nativeConfig',
				readonly: false,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Date',
				value: this.resource.time ? this.resource.time : new Date(),
				property: 'time',
				readonly: false,
				editType: 'date',
				changed: false
			},
			{
				label: 'Linux Runtime', 
				value: this.resource.isLinuxRuntime, 
				readonly: false, 
				property: 'isLinuxRuntime', 
				editType: 'checkbox', 
				changed: false 
			}
		];
		if (nameIndexes) {
			this.emulatorLabeledItems.push({
				label: 'Emulator Version',
				value: this.resource.timeContext ? this.resource.timeContext : '',
				readonly: false,
				property: 'timeContext',
				editType: 'select',
				changed: false,
				data: nameIndexes.entries.entry
			});
		}
		if (operatingSystemMetadata) {
			this.emulatorLabeledItems.push({
				label: 'Operating System',
				value: this.resource.os,
				property: 'os',
				readonly: false,
				editType: 'select',
				changed: false,
				data: operatingSystemMetadata.operatingSystemInformations
			});
		}
	}
	
	_populateOperatingSystemConfig(): void {
		this.osLabeledItems = [
			{ 
				label: 'Resource Name', 
				value: this.resource.title.split('-')[0].trim(), 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
			{ 
				label: 'Display Resolution', 
				value: '800x600', 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
			{ 
				label: 'Color Depth', 
				value: 'True Color', 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
			{ 
				label: 'Region', 
				value: 'U.S.', 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
			{ 
				label: 'Time Zone', 
				value: 'Eastern Standard Time', 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
			{ 
				label: 'Date/Time', 
				value: '1:19PM 5/3/2019', 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
			{ 
				label: 'Language', 
				value: 'English', 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
			{ 
				label: 'Login Name', 
				value: '<username>', 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
			{ 
				label: 'Login password', 
				value: '<password>', 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
		];
	}

	_populateUIOptions() {
		this.uiOptionLabeledItems = [
			{ 
				label: 'Environment can print', 
				value: this.resource.enablePrinting, 
				property: 'enablePrinting', 
				changed: false, 
				readonly: false, 
				editType: 'checkbox' 
			},
			{ 
				label: 'Relative Mouse (Pointerlock)', 
				value: this.resource.enableRelativeMouse, 
				property: 'enableRelativeMouse', 
				changed: false, 
				readonly: false, 
				editType: 'checkbox' 
			},
			{ 
				label: 'WebRTC Audio (Beta)', 
				value: this.resource.useWebRTC, 
				property: 'useWebRTC', 
				changed: false, 
				readonly: false, 
				editType: 'checkbox' 
			},
			{ 
				label: 'Requires clean shutdown', 
				value: this.resource.shutdownByOs, 
				property: 'shutdownByOs', 
				changed: false, 
				readonly: false, 
				editType: 'checkbox' 
			},
		];
	}

	_populateNetworkOptions() {
		this.networkLabeledItems = [
			{ 
				label: 'Enable Networking', 
				value: this.resource.networking.connectEnvs, 
				property: 'connectEnvs', 
				changed: false, 
				readonly: false, 
				editType: 'checkbox' 
			},
			{ 
				label: 'Enable Internet Access', 
				value: this.resource.networking.enableInternet, 
				property: 'enableInternet', 
				changed: false, 
				readonly: false, 
				editType: 'checkbox' 
			},
			{ 
				label: 'Enable Server Mode', 
				value: this.resource.networking.serverMode, 
				property: 'serverMode', 
				changed: false, 
				readonly: false, 
				editType: 'checkbox' 
			},
			{ 
				label: 'Use SOCKS5', 
				value: this.resource.networking.enableSocks, 
				property: 'enableSocks', 
				changed: false, 
				readonly: false, 
				editType: 'checkbox' 
			},
			{ 
				label: 'Enable Local Mode', 
				value: this.resource.networking.localServerMode, 
				property: 'localServerMode', 
				changed: false, 
				readonly: false, 
				editType: 'checkbox' 
			},
			{ 
				label: 'Internal Server IP', 
				value: this.resource.networking.serverIp, 
				property: 'serverIp', 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
			{ 
				label: 'Internal Server Port', 
				value: this.resource.networking.serverPort, 
				property: 'serverPort', 
				changed: false, 
				readonly: false, 
				editType: 'text-input' 
			},
			{ 
				label: 'Help Text for the Network', 
				value: this.resource.networking.helpText, 
				property: 'helpText', 
				changed: false, 
				readonly: false, 
				editType: 'text-area'
			}
		];
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