<template>
	<div id="myResources" v-if="activeEnvironment">
		<div class="eds-actions pull-right" style="margin: 1.2rem;">
			<ui-button v-if="readOnlyMode" size="md" @click="confirmAction = 'replicate'">
				Save to My Node
			</ui-button>
			<ui-button v-else size="md" @click="addingSoftware = true">
				Add Software
			</ui-button>
			<ui-button v-if="isRunnable" size="md" @click="runEnvironment">
				Run in Emulator
			</ui-button>
		</div>
		<div class="page-title">
			<div class="back-to-results clickable" @click="goBackToResults">
				← Back to All Results
			</div>
			<h1>
				Environment Details
			</h1>
		</div>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<div class="vrd-content">
			<mode-toggle
				v-show="activeTab === 'Metadata'"
				:editable="!readOnlyMode"
				@mode-change="onModeChange"
				@save="saveDetails"
				@refresh="refresh"
				:toggle-value="activeMode"
				:toggle-options="mods"
				:supress-confirmation="isLocal"
			/>
			<environment-metadata-section
				v-show="activeTab === 'Metadata'"
				:resource="activeEnvironment"
				:active-mode="activeMode"
				:emulator-labeled-items="emulatorLabeledItems"
				:os-labeled-items="osLabeledItems"
				:ui-option-labeled-items="uiOptionLabeledItems"
				:network-labeled-items="networkLabeledItems"
				:installed-software="installedSoftware"
				:config-machine-labeled-items="configMachineLabeledItems"
			/>
			<revision-list
				v-show="activeTab === 'History'"
				:revisions="activeEnvironment.revisions"
			/>
		</div>
		<!-- Modals -->
		<confirm-modal
			title="Save to My Node"
			confirm-label="Replicate"
			@click:cancel="confirmAction = null"
			@click:confirm="replicateEnvironment"
			@close="confirmAction = null"
			v-if="confirmAction === 'replicate'"
		>
			<alert type="info">
				<span class="ers-rep-msg">
					Replicating to your node will copy all environment data and files to local storage.
					Environments copied from the EaaSI Network cannot be easily deleted once saved.
				</span>
				<span class="ers-rep-msg">
					Do you want to save this environment to your node?
				</span>
			</alert>
		</confirm-modal>
		<add-software
			v-if="addingSoftware"
			@cancel="addingSoftware = false"
			@run-in-emulator="runInEmulator"
		/>
	</div>
</template>

<script lang="ts">
import {archiveTypes} from '@/utils/constants';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import { IEnvironment } from '@/types/Resource';
import { IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';
import { ILabeledEditableItem, ILabeledItem } from '@/types/ILabeledItem';
import EaasiTask from '@/models/task/EaasiTask';
import EnvironmentMetadataSection from './EnvironmentMetadataSection.vue';
import RevisionList from './RevisionList.vue';
import AddSoftware from './AddSoftwareModal.vue';
import ModeToggle from '../shared/ModeToggle.vue';

@Component({
	name: 'EnvironmentDetailsScreen',
	components: {
		AddSoftware,
		RevisionList,
		EnvironmentMetadataSection,
		ModeToggle
	}
})
export default class EnvironmentDetailsScreen extends Vue {

    /* Data
	============================================*/
    tabs: IEaasiTab[] = [
    	{ label: 'Metadata', disabled: false },
    	{ label: 'History', disabled: false },
	];
	activeTab: string = this.tabs[0].label;
	mods = ['Review Mode'];
	activeMode: string = this.mods[0];
	activeEnvironment: IEnvironment = null;
	confirmAction: string = null;
	addingSoftware: boolean = false;

	emulatorLabeledItems : ILabeledEditableItem[] = [];
	osLabeledItems: ILabeledEditableItem[] = [];
	uiOptionLabeledItems: ILabeledEditableItem[] = [];
	networkLabeledItems: ILabeledEditableItem[] = [];
	installedSoftware: ILabeledItem[] = [];
	configMachineLabeledItems: ILabeledEditableItem[] = [];

    /* Computed
	============================================*/
	get readOnlyMode() {
		return this.activeEnvironment && this.activeEnvironment.archive === 'remote';
	}

	get isRunnable() {
		return [archiveTypes.PUBLIC, archiveTypes.DEFAULT].includes(this.activeEnvironment.archive);
	}

	get isLocal() {
		return this.activeEnvironment.archive === 'default';
	}

    /* Methods
	============================================*/
	async saveDetails() {
		this.emulatorLabeledItems.forEach(el => this.activeEnvironment[el.property] = el.value);
		this.uiOptionLabeledItems.forEach(el => this.activeEnvironment[el.property] = el.value);
		this.networkLabeledItems.forEach(el => this.activeEnvironment.networking[el.property] = el.value);
		this.activeEnvironment.time = new Date(this.activeEnvironment.time).getTime();
		const result = await this.$store.dispatch('resource/updateEnvironmentDetails', this.activeEnvironment);
		if (result && result.id) {
			this.activeMode = this.mods[0];
			this.$router.replace(`/resources/environment?resourceId=${result.id}`);
			this.$route.query['resourceId'] = result.id;
			await this.init();
		}
	}

	async replicateEnvironment() {
		this.confirmAction = null;
		const result: IEaasiTaskListStatus = await this.$store.dispatch('resource/replicateEnvironment', this.activeEnvironment);
		let task = new EaasiTask(result.taskList[0], `Save To My Node: ${this.activeEnvironment.title}`);
		await this.$store.dispatch('task/addTaskToQueue', task);
	}

	async runInEmulator(software) {
		const { id, archiveId } = software;
		if (!id || !archiveId) return;
		const { envId } = this.activeEnvironment as IEnvironment;
		this.$router.push(`/access-interface/${envId}?softwareId=${id}&archiveId=${archiveId}`);
	}

	async refresh() {
		await this.init();
		this.activeMode = 'Review Mode';
	}

	async init() {
		const { resourceId } = this.$route.query;
		this.activeEnvironment = await this.$store.dispatch('resource/getEnvironment', resourceId);
		await this.populateMetadata();
	}

	async populateMetadata() {
		await this._populateEmulatorConfig();
		// this._populateOperatingSystemConfig();
		this._populateUIOptions();
		this._populateNetworkOptions();
		this._populateInstalledSoftware();
		if (!this.readOnlyMode) {
			this.mods.push('Edit Mode');
		}
	}

	async runEnvironment() {
		await this.$router.push(`/access-interface/${this.activeEnvironment.envId}`);
	}

	onModeChange(mode: string) {
		this.activeMode = mode;
	}

    /* Lifecycle Hooks
	============================================*/
    created() {
		this.init();
	}

	/* Helpers
	============================================*/
	_populateInstalledSoftware() {
		if(!this.activeEnvironment.installedSoftwareIds) return this.installedSoftware = [];
		this.installedSoftware = this.activeEnvironment.installedSoftwareIds.map(id => {
			return {
				label: '',
				value: id
			} as ILabeledItem;
		});
	}

	async _populateEmulatorConfig() {
		const nameIndexes = await this.$store.dispatch('resource/getNameIndexes');
		const operatingSystemMetadata = await this.$store.dispatch('resource/getOperatingSystemMetadata');
		this.emulatorLabeledItems = [
			{
				label: 'Name',
				value: this.activeEnvironment.emulator,
				property: 'emulator',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Emulator Configuration',
				value: this.activeEnvironment.nativeConfig,
				property: 'nativeConfig',
				readonly: false,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Date',
				value: this.activeEnvironment.time ? this.activeEnvironment.time : new Date(),
				property: 'time',
				readonly: false,
				editType: 'date',
				changed: false
			},
			{
				label: 'Linux Runtime',
				value: this.activeEnvironment.isLinuxRuntime,
				readonly: false,
				property: 'isLinuxRuntime',
				editType: 'checkbox',
				changed: false
			}
		];
		if (nameIndexes) {
			let entries = nameIndexes.entries.entry.filter(e => e.key.toLowerCase().indexOf(this.activeEnvironment.emulator.toLowerCase()) > 0);
			entries.unshift({ key: 'latest', value: { name: entries[0].value.name } });
			this.emulatorLabeledItems.push({
				label: 'Emulator Version',
				value: this.activeEnvironment.timeContext ? this.activeEnvironment.timeContext : '',
				readonly: false,
				property: 'timeContext',
				editType: 'select',
				changed: false,
				data: entries
			});
		}
		if (operatingSystemMetadata) {
			this.emulatorLabeledItems.push({
				label: 'Operating System',
				value: this.activeEnvironment.os,
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
				value: this.activeEnvironment.title,
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
				value: this.activeEnvironment.enablePrinting,
				property: 'enablePrinting',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'Relative Mouse (Pointerlock)',
				value: this.activeEnvironment.enableRelativeMouse,
				property: 'enableRelativeMouse',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'WebRTC Audio (Beta)',
				value: this.activeEnvironment.useWebRTC,
				property: 'useWebRTC',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'Requires clean shutdown',
				value: this.activeEnvironment.shutdownByOs,
				property: 'shutdownByOs',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
		];
	}

	_populateNetworkOptions() {
		if (this.activeEnvironment.networking === null || this.activeEnvironment.networking === undefined) {
			this.activeEnvironment.networking = {
				connectEnvs: false,
				enableInternet: false,
				enableSocks: false,
				helpText: '',
				localServerMode: false,
				serverIp: '',
				serverMode: false,
				serverPort: ''
			};
		}
		this.networkLabeledItems = [
			{
				label: 'Enable Networking',
				value: this.activeEnvironment.networking.connectEnvs,
				property: 'connectEnvs',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'Enable Internet Access',
				value: this.activeEnvironment.networking.enableInternet,
				property: 'enableInternet',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'Enable Server Mode',
				value: this.activeEnvironment.networking.serverMode,
				property: 'serverMode',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'Use SOCKS5',
				value: this.activeEnvironment.networking.enableSocks,
				property: 'enableSocks',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'Enable Local Mode',
				value: this.activeEnvironment.networking.localServerMode,
				property: 'localServerMode',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'Internal Server IP',
				value: this.activeEnvironment.networking.serverIp,
				property: 'serverIp',
				changed: false,
				readonly: false,
				editType: 'text-input'
			},
			{
				label: 'Internal Server Port',
				value: this.activeEnvironment.networking.serverPort,
				property: 'serverPort',
				changed: false,
				readonly: false,
				editType: 'text-input'
			},
			{
				label: 'Help Text for the Network',
				value: this.activeEnvironment.networking.helpText,
				property: 'helpText',
				changed: false,
				readonly: false,
				editType: 'text-area'
			}
		];
	}

	goBackToResults() {
		this.$router.push('/resources/explore/');
	}
}

</script>

<style lang="scss">
	.eds-actions {
		button {
			margin: 0.4rem;
		}
	}

	.vrd-content {
		.vrd-subsection {
			padding: 18px 0;
		}
	}

	#thisIncludedIn {
		background-color: lighten($light-neutral, 75%);
	}
</style>