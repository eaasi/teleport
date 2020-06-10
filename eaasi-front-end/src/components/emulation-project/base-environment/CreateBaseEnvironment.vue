<template>
	<div class="new-base-environment-wizzard">
		<div class="emulator-picker-wrapper">
			<os-picker :selected-os="selectedOs" @input="selectOSItem" />
			<text-input
				v-model="environmentTitle"
				label="Environment Name"
				placeholder="Environment name"
				rules="required"
			/>

			<search-select-list
				v-model="operatingSystemId"
				label="Choose a System"
				option-label="label"
				anchor="id"
				placeholder="Please select a System Template"
				:data="osTemplates"
				rules="required"
			/>

			<!-- <div class="row">
				<div class="col-md-6">
					<select-list
						class="no-mb flex-adapt"
						label="Template Version"
						value=""
					>
						<option value="" selected disabled>Select Template version...</option>
						<option v-for="patch in availablePatches" :key="patch.id">
							{{ patch.description.title }}
						</option>
					</select-list>
				</div>
			</div> -->

			<div v-show="operatingSystemId">
				<h4>Hardware Settings</h4>
				<text-input
					label="cpu"
					rules="required|numeric|min:1|max:9"
					v-model.number="environmentCpu"
				/>
				<text-input
					label="Disk Size (MB)"
					rules="required|numeric|minlength:0|maxlength:10000"
					v-model.number="environmentMemory"
				/>
				<checkbox-info
					label="Virtualize CPU"
					v-model="isKvmEnabled"
				/>
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
				<checkbox-info
					label="Requires clean shutdown"
					v-model="shutdownByOs"
				/>
				<ui-button @click="showAdvancedOptions = !showAdvancedOptions" color-preset="white">
					advanced options ...
				</ui-button>
				<div v-show="showAdvancedOptions">
					<text-input
						label="Config"
						v-model="nativeConfig"
					/>
				</div>
				<drive-settings 
					:drives="drives"
					@update-drives="updateDrives"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import { operatingSystems, ITemplateParams } from '@/models/admin/OperatingSystems';
import { ITemplate, ICreateEnvironmentPayload, IPatch } from '../../../types/Import';
import { ROUTES } from '../../../router/routes.const';
import { IResourceSearchQuery } from '../../../types/Search';
import { resourceTypes, archiveTypes } from '../../../utils/constants';
import { ISoftwareObject, IOsItem, IDrive, IEditableDrive } from '../../../types/Resource';
import SystemTemplateDetails from '../shared/SystemTemplateDetails.vue';
import OsPicker from '../shared/OsPicker.vue';
import CheckboxInfo from '../shared/CheckboxInfo.vue';
import { populateNativeConfig, updateNativeConfigForCpu, updateNativeConfigForMemory } from '@/helpers/NativeConfigHelper';
import DriveSettings from '../shared/DriveSettings.vue';
import EnvironmentCard from '../shared/EnvironmentCard.vue';

@Component({
	name: 'CreateBaseEnvironment',
	components: {
		SystemTemplateDetails,
		EnvironmentCard,
		CheckboxInfo,
		DriveSettings,
		OsPicker
	}
})
export default class CreateBaseEnvironment extends Vue {

	/* Computed
	============================================*/

	@Sync('emulationProject/environment@label')
	environmentTitle: string;

	@Sync('emulationProject/environment@drives')
	drives: IDrive[];

	@Sync('emulationProject/createEnvironmentPayload@operatingSystemId')
	operatingSystemId: string;

	@Sync('emulationProject/createEnvironmentPayload@templateId')
	templateId: string;

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

	@Sync('emulationProject/createEnvironmentPayload@nativeConfig')
	nativeConfig: string;

	@Sync('emulationProject/selectedSoftwareId')
	selectedSoftwareId: string;

	get environmentCpu(): string {
		return this.cpu;
	}

	set environmentCpu(val: string) {
		let valNumber = Number(val);
		if (valNumber > 9) valNumber = 9;
		else if (valNumber < 0) valNumber = 0;
		const nativeConfig = updateNativeConfigForCpu(this.nativeConfig, valNumber);
		this.nativeConfig = nativeConfig;
		this.cpu = `${valNumber}`;
	}

	get environmentMemory(): string {
		return this.diskSize;
	}

	set environmentMemory(val: string) {
		const nativeConfig = updateNativeConfigForMemory(this.nativeConfig, val);
		this.nativeConfig = nativeConfig;
		this.diskSize = val;
	}

	get activeTemplate(): ITemplate {
		if (!this.availableTemplates || !this.availableTemplates.length) return null;
		return this.availableTemplates.find(template => template.id === this.operatingSystemId);
	}

	get osTemplates(): IOsItem[] {
		if (!this.selectedOs) return this.operatingSystems;
		return this.operatingSystems.filter(os => os.id.indexOf(this.selectedOs) >= 0);
	}

	get isKvmEnabled(): boolean {
		return this.nativeConfig.indexOf(this.kvmFlag) >= 0;
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

	chosenOsId: string = null;
	kvmFlag: string = '-enable-kvm';
	softwareOpertaingSystems: ISoftwareObject[] = [];
	
	showAdvancedOptions: boolean = false;
	selectedOs: string = null;

	/* Methods
	============================================*/

	async init() {
		await this.$store.dispatch('resource/getTemplates');
		await this.$store.dispatch('resource/getPatches');
		this.$store.dispatch('resource/clearSearchQuery');
		const query: IResourceSearchQuery = {
			...this.searchQuery, 
			types: [resourceTypes.SOFTWARE], 
			archives: ['zero conf'],
			limit: 10000
		};
		this.searchQuery = query;
		const { software } = await this.$store.dispatch('resource/searchResources');
		this.softwareOpertaingSystems = software.result.filter((resource: ISoftwareObject) => resource.isOperatingSystem);

		this.$store.dispatch('resource/clearSearchQuery');
	}

	selectOSItem(osItem) {
		this.selectedOs = this.selectedOs === osItem.value ? null : osItem.value;
	}

	reset() {
		const currentEnvTitle = this.environmentTitle;
		this.$store.commit('emulationProject/RESET');
		this.environmentTitle = currentEnvTitle;
	}

	updateDrives(drives: IEditableDrive[]) {
		this.drives = drives;
	}
	
	/* Lifecycle Hooks
	============================================*/
	async created() {
		await this.init();
	}

	@Watch('operatingSystemId')
	onActiveTemplate(template) {
		if (!template) this.reset();
		const chosenOS = this.operatingSystems.find(os => os.id === template);
		if (!chosenOS) return;
		this.nativeConfig = populateNativeConfig(chosenOS.template_params);
		this.cpu = chosenOS.template_params.cpu;
		this.diskSize = chosenOS.template_params.memory;
	}

}

</script>

<style lang="scss">
.emulator-picker-wrapper {
	margin-bottom: 5rem;
}

.new-base-environment-wizzard {
	background: #ffffff;
	padding: 3rem;

	.row {
		margin-bottom: 1rem;
	}
}
</style>