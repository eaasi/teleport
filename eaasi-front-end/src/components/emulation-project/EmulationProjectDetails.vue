<template>
	<div>
		<div class="emu-proj-details-wrapper">
			<div class="emulator-picker-wrapper">
				<div class="flex flex-row justify-between">
					<div style="margin-top: 0;">
						Base Environment
					</div>
					<div class="remove-resource clickable" @click="clear">
						<div class="flex flex-row flex-center rm-btn">
							Remove Resource
							<span class="fas fa-times"></span>
						</div>
					</div>
				</div>
				<environment-card v-if="environment" />
				<div v-if="environment">
					<h4>Environment Options</h4>
					<editable-labeled-item-list
						readonly
						:labeled-items="environmentOptions"
					/>
				</div>
			</div>
		</div>
		<div class="emu-proj-details-wrapper" v-if="selectedObjects.length">
			<div class="emulator-picker-wrapper">
				<div class="flex flex-row justify-between">
					<h4 style="margin-top: 0;">Objects</h4>
					<div class="remove-resource clickable" @click="clear">
						<div class="flex flex-row flex-center rm-btn">
							Remove Resource
							<span class="fas fa-times"></span>
						</div>
					</div>
				</div>
				<object-card
					v-if="selectedObjects.length"
					:title="selectedObjects[0].label"
					:resource-type-label="selectedObjects[0].resourceType"
					:archive-label="selectedObjects[0].archiveId"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import { operatingSystems } from '@/models/admin/OperatingSystems';
import { ITemplate, ICreateEnvironmentPayload, IPatch } from '@/types/Import';
import { ROUTES } from '@/router/routes.const';
import { IResourceSearchQuery } from '@/types/Search';
import { IEaasiResource, IDriveSetting, IEnvironment } from '@/types/Resource';
import SystemTemplateDetails from './shared/SystemTemplateDetails.vue';
import OsPicker from './shared/OsPicker.vue';
import CheckboxInfo from './shared/CheckboxInfo.vue';
import { updateNativeConfigForCpu, updateNativeConfigForMemory } from '@/helpers/NativeConfigHelper';
import DriveSettings from './shared/DriveSettings.vue';
import EnvironmentCard from './shared/EnvironmentCard.vue';
import DriveResourceCard from './shared/DriveResourceCard.vue';
import ObjectCard from './shared/ObjectCard.vue';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import EditableLabeledItemList from '../resources/view-details/shared/EditableLabeledItemList.vue';
import { ILabeledEditableItem } from '@/types/ILabeledItem';

@Component({
	name: 'EmulationProjectDetails',
	components: {
		EditableLabeledItemList,
		SystemTemplateDetails,
        EnvironmentCard,
		ObjectCard,
        DriveResourceCard,
		CheckboxInfo,
		DriveSettings,
		OsPicker
	}
})
export default class EmulationProjectDetails extends Vue {

	/* Computed
	============================================*/

	@Sync('emulationProject/environment')
	environment: EmulationProjectEnvironment;

	@Sync('emulationProject/environment@label')
	environmentTitle: string;

	@Sync('resource/availableTemplates')
	availableTemplates: ITemplate[];

	@Sync('resource/availablePatches')
	availablePatches: IPatch[];

	@Sync('emulationProject/environment@size')
	diskSize: string;

	@Sync('emulationProject/environment@cpus')
	cpu: string;

	@Sync('emulationProject/environment@enablePrinting')
	enablePrinting: boolean;

	@Sync('emulationProject/environment@enableRelativeMouse')
	enableRelativeMouse: boolean;

	@Sync('emulationProject/environment@virtualizeCpu')
	virtualizeCpu: boolean;

	@Sync('emulationProject/environment@useWebRTC')
	useWebRTC: boolean;

	@Sync('emulationProject/environment@useXpra')
	useXpra: boolean;

	@Sync('emulationProject/environment@xpraEncoding')
	xpraEncoding: string;

	@Sync('emulationProject/environment@shutdownByOs')
	shutdownByOs: boolean;

	@Sync('emulationProject/environment@nativeFMTs')
	nativeFMTs: string[];

	@Sync('resource/query')
	searchQuery: IResourceSearchQuery;

	@Sync('emulationProject/environment@nativeConfig')
	nativeConfig: string;

	@Sync('emulationProject/selectedSoftwareId')
    selectedSoftwareId: string;

	@Sync('emulationProject/environment@drives')
	drives: IDriveSetting[];

	@Sync('emulationProject/environment@enableInternet')
	enableInternet: boolean;

	@Get('emulationProject/projectObjects')
	projectObjects: IEaasiResource[];

	@Get('emulationProject/createEnvironmentPayload')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	@Get('emulationProject/constructedFromBaseEnvironment')
	constructedFromBaseEnvironment: boolean;

	@Get('emulationProject/projectEnvironments')
	environments: IEnvironment[];

	@Get('emulationProject/selectedObjects')
	selectedObjects: IEaasiResource[];

	get environmentCpu(): string {
		return this.cpu;
	}

	set environmentCpu(val: string) {
		let valNumber = Number(val);
		if (valNumber > 9) valNumber = 9;
		else if (valNumber < 0) valNumber = 0;
		this.nativeConfig = updateNativeConfigForCpu(this.nativeConfig, valNumber);
		this.cpu = `${valNumber}`;
	}

	get environmentMemory(): string {
		return this.diskSize;
	}

	set environmentMemory(val: string) {
		this.nativeConfig = updateNativeConfigForMemory(this.nativeConfig, val);
		this.diskSize = val;
	}

	get isKvmEnabled(): boolean {
		return this.nativeConfig && this.nativeConfig.indexOf(this.kvmFlag) >= 0;
	}

	set isKvmEnabled(value) {
		if (value) {
			this.nativeConfig += this.kvmFlag;
		} else {
			this.nativeConfig = this.nativeConfig.replace(this.kvmFlag, '');
		}
    }

    get environmentOptions(): ILabeledEditableItem[] {
		let options: ILabeledEditableItem[] = [
			{
				readonly: true,
				editType: 'checkbox',
				label: 'Environment Can Print',
				value: this.enablePrinting,
			},
			{
				readonly: true,
				editType: 'checkbox',
				label: 'Relative Mouse (Pointerlock)',
				value: this.enableRelativeMouse,
			},
			{
				readonly: true,
				editType: 'checkbox',
				label: 'Virtualize CPU',
				value: this.isKvmEnabled,
			},
			{
				readonly: true,
				editType: 'checkbox',
				label: 'WebRTC Audio',
				value: this.useWebRTC,
			},
			{
				readonly: true,
				editType: 'checkbox',
				label: 'XPRA Video',
				value: this.useXpra,
			},
			{
				readonly: true,
				editType: 'checkbox',
				label: 'Requires Clean Shutdown',
				value: this.shutdownByOs,
			},
			{
				label: 'Internet Enabled',
				value: this.enableInternet,
				property: 'enableInternet',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
		];
		if (this.useXpra) {
			options.push({
				readonly: true,
				editType: 'text-input',
				label: 'XPRA Video Encoding',
				value: this.xpraEncoding,
			});
		}
		options.push(
			{
				readonly: true,
				editType: 'text-input',
				label: 'cpu',
				value: this.environmentCpu,
			},
			{
				readonly: true,
				editType: 'text-input',
				label: 'Disk Size (MB)',
				value: this.environmentMemory,
			},
			{
				readonly: true,
				editType: 'text-input',
				label: 'Config',
				value: this.nativeConfig,
			}
		);
		return options;
	}

	/* Data
	============================================*/

	readonly operatingSystems = operatingSystems;
	kvmFlag: string = '-enable-kvm';
	showAdvancedOptions: boolean = false;
	selectedOs: string = null;

	/* Methods
	============================================*/

	clear() {
		this.environment = null;
		this.$router.push(ROUTES.EMULATION_PROJECT.OPTIONS);
	}

	init() {
		if (this.environments.length === 1) {
			this.environment = new EmulationProjectEnvironment(this.environments[0]);
			this.$router.push(ROUTES.EMULATION_PROJECT.OPTIONS);
		}
		if (!this.environment) {
			this.$router.push(ROUTES.EMULATION_PROJECT.OPTIONS);
		}
	}

	selectOSItem(osItem) {
		this.selectedOs = this.selectedOs === osItem.value ? null : osItem.value;
	}

	@Watch('environment')
	onEnvironmentClear(nextResult, prevResult) {
		if (!nextResult && prevResult) {
			this.$router.push(ROUTES.EMULATION_PROJECT.OPTIONS);
		}
	}

}

</script>

<style lang="scss">
.emulator-picker-wrapper {
	margin-bottom: 5rem;

	.checkbox-info {
		margin-bottom: 2rem;
	}
}

.emu-proj-details-wrapper {
	background: #ffffff;
	margin-bottom: 2rem;
	padding: 2rem 2.4rem 0.3rem 2.4rem;

	.row {
		margin-bottom: 1rem;
	}

	h4 {
		margin: 2rem 0;

		&.border-after {
			border-bottom: 1px solid darken($light-neutral, 10%);
		}
	}

	.rm-btn {
		align-items: baseline;
		font-size: 1.4rem;
		font-weight: 400;

		span {
			font-weight: 900;
			margin-left: 1rem;
		}
	}

	.advanced-options-wrapper {
		margin-top: 2rem;
	}

	.remove-resource {
		color: darken($light-blue, 30%);
		padding: 1.1rem 0 1.1rem;
	}

	.lil-container {
		max-width: 50rem;
	}
}
</style>