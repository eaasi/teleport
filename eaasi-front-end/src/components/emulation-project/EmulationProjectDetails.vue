<template>
	<div class="emu-proj-details-wrapper">
		<div class="emulator-picker-wrapper">
			<div class="flex flex-row justify-between">
				<h4 style="margin-top: 0;">Base Environment</h4>
				<ui-button color-preset="blue-transparent" @click="clear">
					<div class="flex flex-row flex-cetner rm-btn">
						Remove Resource
						<span class="fas fa-times"></span>
					</div>
				</ui-button>
			</div>
			<environment-card v-if="environment" />

			<div v-if="environment">
				<h4>Environment Options</h4>
				<checkbox-info
					label="Environment can print"
					v-model="enablePrinting"
				/>
				<checkbox-info
					label="Relative Mouse (Pointerlock)"
					v-model="enableRelativeMouse"
				/>
				<checkbox-info
					label="Requires clean shutdown"
					v-model="shutdownByOs"
				/>
				<div>
					<ui-button @click="showAdvancedOptions = !showAdvancedOptions" color-preset="white">
						Advanced Options
					</ui-button>
					<div v-show="showAdvancedOptions" class="advanced-options-wrapper">
						<checkbox-info
							style="margin-bottom: 2rem;"
							label="Virtualize CPU"
							v-model="isKvmEnabled"
						/>
						<checkbox-info
							label="WebRTC Audio (Beta)"
							v-model="useWebRTC"
						/>
						<checkbox-info
							label="XPRA Video (Experimental)"
							v-model="useXpra"
						/>
						<div v-show="useXpra">
							<select-list
								v-model="xpraEncoding"
								placeholder="Please select encoding for XPRA Video"
								label="XPRA Video Encoding"
							>
								<option selected disabled value="">Please select encoding for XPRA Video</option>
								<option value="auto">auto</option>
								<option value="jpeg">jpeg</option>
								<option value="png">png</option>
								<option value="rgb24">rgb24</option>
								<option value="rgb32">rgb32</option>
								<option value="h264">h264</option>
							</select-list>
						</div>
						<text-input
							style="margin-bottom: 2rem;"
							label="cpu"
							rules="required|numeric|min:1|max:9"
							v-model.number="environmentCpu"
						/>
						<text-input
							style="margin-bottom: 2rem;"
							label="Disk Size (MB)"
							rules="required|numeric|minlength:0|maxlength:10000"
							v-model.number="environmentMemory"
						/>
						<text-input
							label="Config"
							v-model="nativeConfig"
						/>
					</div>
				</div>
			</div>

			<div class="disk-cards-wrapper" v-if="constructedFromBaseEnvironment">
				<h4 class="border-after">Environment Drives</h4>
				<drive-resource-card
					v-for="driveSetting in drives"
					:key="driveSetting.drive.uid"
					:drive-setting="driveSetting"
					:resources="selectedObjects"
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
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';

@Component({
	name: 'EmulationProjectDetails',
	components: {
		SystemTemplateDetails,
        EnvironmentCard,
        DriveResourceCard,
		CheckboxInfo,
		DriveSettings,
		OsPicker
	}
})
export default class EmulationProjectDetails extends Vue {

	/* Computed
	============================================*/

	@Get('emulationProject/environment')
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

	/* Data
	============================================*/

	readonly operatingSystems = operatingSystems;
	kvmFlag: string = '-enable-kvm';
	showAdvancedOptions: boolean = false;
	selectedOs: string = null;

	/* Methods
	============================================*/

	clear() {
		this.$store.commit('emulationProject/RESET');
	}

	init() {
		if (this.environments.length === 1) {
			this.environment = new EmulationProjectEnvironment(this.environments[0]);
			this.$router.push(ROUTES.EMULATION_PROJECT.DETAILS);
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
	padding: 3rem;

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
		font-size: 1.4rem;
		font-weight: 400;

		span {
			font-weight: 400;
			margin-left: 1rem;
		}
	}

	.advanced-options-wrapper {
		margin-top: 2rem;
	}
}
</style>