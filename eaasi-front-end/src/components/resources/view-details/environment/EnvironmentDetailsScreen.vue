<template>
	<div id="myResources" v-if="activeEnvironment" :style="actionMenuStyles">
		<div :style="innerStyles">
			<div class="page-title">
				<div class="back-to-results clickable" @click="goBackToResults">
					← Back to All Results
				</div>
				<div class="slide-menu-control-btns pull-right">
					<slide-menu-control-buttons @open="openActionMenu" :tabs="actionMenuTabs" />
				</div>
				<h1>
					{{ resourceTitle }} Details
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
					:is-public="!isLocal"
					:supress-confirmation="isLocal"
				/>
				<environment-metadata-section
					v-show="activeTab === 'Metadata'"
					:resource="activeEnvironment"
					:active-mode="activeMode"
					:emulator-labeled-items="emulatorLabeledItems"
					:ui-option-labeled-items="runtimeOptionLabeledItems"
					:network-labeled-items="networkLabeledItems"
					:installed-software="installedSoftware"
					:config-machine-labeled-items="configMachineLabeledItems"
					:owner-label="ownerLabel"
				/>
				<revision-list
					v-show="activeTab === 'History'"
					:revisions="activeEnvironment.revisions"
					:description="activeEnvironment.description"
					:timestamp="activeEnvironment.timestamp"
					@full-refresh="fullRefresh"
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
		</div>
		<!-- Resources Slide Menu -->
		<resource-slide-menu
			v-if="isActionMenuOpen"
			:active-tab="actionMenuActiveTab"
			:tabs="actionMenuTabs"
			@bookmarks-updated="init"
			@resource-deleted="goBackToResults"
			@resource-published="init"
			@close="closeActionMenu"
			@navigate-to-tab="openActionMenu"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { archiveTypes, resourceTypes } from '@/utils/constants';
import { IEaasiTab } from 'eaasi-nav';
import { IEnvironment, IEaasiResource } from '@/types/Resource';
import { IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';
import { ILabeledEditableItem, ILabeledItem } from '@/types/ILabeledItem';
import EaasiTask from '@/models/task/EaasiTask';
import EnvironmentMetadataSection from './EnvironmentMetadataSection.vue';
import RevisionList from './RevisionList.vue';
import ModeToggle from '../shared/ModeToggle.vue';
import { ROUTES } from '../../../../router/routes.const';
import SlideMenuControlButtons from '@/components/resources/SlideMenuControlButtons.vue';
import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';
import { Sync } from 'vuex-pathify';
import eventBus from '@/utils/event-bus';

@Component({
	name: 'EnvironmentDetailsScreen',
	components: {
		RevisionList,
		EnvironmentMetadataSection,
		ModeToggle,
		ResourceSlideMenu,
		SlideMenuControlButtons,
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
	mods = ['Review Mode', 'Edit Mode'];
	activeMode: string = this.mods[0];
	activeEnvironment: IEnvironment = null;
	confirmAction: string = null;
	// Metadata
	emulatorLabeledItems : ILabeledEditableItem[] = [];
	osLabeledItems: ILabeledEditableItem[] = [];
	runtimeOptionLabeledItems: ILabeledEditableItem[] = [];
	networkLabeledItems: ILabeledEditableItem[] = [];
	installedSoftware: ILabeledItem[] = [];
	configMachineLabeledItems: ILabeledEditableItem[] = [];
	// Slide menu
	actionMenuTabs: IEaasiTab[] = [
		{
			label: 'Actions Menu'
		}
	]
	actionMenuActiveTab: IEaasiTab = null;
	kvmFlag: string = '-enable-kvm';
	ownerLabel: string = null;

    /* Computed
	============================================*/
	@Sync('resource/selectedResources')
	resources: IEaasiResource[];

	get readOnlyMode() {
		return this.activeEnvironment && this.activeEnvironment.archive === 'remote';
	}

	get isRunnable() {
		return [archiveTypes.PUBLIC, archiveTypes.DEFAULT].includes(this.activeEnvironment.archive);
	}

	get isLocal() {
		return this.activeEnvironment.archive === 'default';
	}

	get isActionMenuOpen(): boolean {
		return this.actionMenuActiveTab != null;
	}

	get actionMenuStyles(): string {
		let styles = '';
		if (!this.isActionMenuOpen) return styles;
		let maxWidth = document.body.clientWidth - (430 + 90); // screen width - (action menu width + side menu bar width)
		styles += `overflow-y: scroll; max-width: ${maxWidth}px;`;
		return styles;
	}

	get innerStyles(): string {
		let styles = '';
		if (!this.isActionMenuOpen) return styles;
		let width = '95vw'; // screen width
		styles += `width: ${width};`;
		return styles;
	}

	get resourceTitle(): string {
		return this.activeEnvironment && this.activeEnvironment.title
			? `${this.activeEnvironment.title}` : 'Environment Details';
	}

	get isKvmEnabled(): boolean {
		return this.activeEnvironment.nativeConfig && this.activeEnvironment.nativeConfig.indexOf(this.kvmFlag) >= 0;
	}

    /* Methods
	============================================*/
	async saveDetails() {
		this.emulatorLabeledItems
			.forEach(el => this.activeEnvironment[el.property] = el.value);
		this.runtimeOptionLabeledItems
			.forEach(el => this.activeEnvironment[el.property] = el.value);
		this.networkLabeledItems
			.forEach(el => this.activeEnvironment.networking[el.property] = el.value);

		// HACK: special-case "enableInternet" for now, see <https://gitlab.com/eaasi/eaasi-client-dev/-/issues/857#note_1915159583>
		if (this.activeEnvironment.enableInternet) {
			this.activeEnvironment.networking.connectEnvs = true;
			this.activeEnvironment.networking.enableInternet = true;
		} else {
			this.activeEnvironment.networking = undefined;
		}

		this.activeEnvironment.time =
			new Date(this.activeEnvironment.time)
				.getTime();

		const result = await this.$store.dispatch(
			'resource/updateEnvironmentDetails', this.activeEnvironment);

		if (result && result.id) {
			this.activeMode = this.mods[0];
			if (this.$route.fullPath !== `/resources/environment?resourceId=${result.id}`) {
				await this.$router.replace(`/resources/environment?resourceId=${result.id}`);
			}
			this.$route.query['resourceId'] = result.id;
			await this.init();
		}
	}

	async replicateEnvironment() {
		this.confirmAction = null;
		const result: IEaasiTaskListStatus =
			await this.$store.dispatch(
				'resource/replicateEnvironment',
				this.activeEnvironment
			);

		let task = new EaasiTask(
			result.taskList[0], `Save To My Node: ${this.activeEnvironment.title}`);

		await this.$store.dispatch('task/addTaskToQueue', task);
	}

	async runInEmulator(software) {
		const { id, archiveId } = software;
		if (!id || !archiveId) return;
		const { envId } = this.activeEnvironment as IEnvironment;

		this.$router.push(`${ROUTES.ACCESS_INTERFACE}/${envId}?softwareId=${id}&archiveId=${archiveId}`);
	}

	async fullRefresh() {
		await this.init();
		this.activeMode = 'Review Mode';
		this.activeTab = this.tabs[0].label;
		eventBus.$emit('resource-details:refresh');
		eventBus.$emit('editable-item:refresh');
	}

	async refresh() {
		await this.init();
		this.activeMode = 'Review Mode';
	}

	async init() {
		const { resourceId } = this.$route.query;
		this.activeEnvironment = await this.$store.dispatch('resource/getEnvironment', resourceId);
		if (!this.activeEnvironment.isPublic) {
			this.mods = [this.mods[0]];
		}
		this.resources = [{...this.activeEnvironment, resourceType: resourceTypes.ENVIRONMENT}];
		await this.populateMetadata();
		let owner = await this.$store.dispatch('resource/getResourceOwner', this.activeEnvironment.owner);
		this.ownerLabel = owner.label;
	}

	async populateMetadata() {
		await this._populateEmulatorConfig();
		this._populateOperatingSystemConfig();
		this._populateRuntimeOptions();
		this._populateNetworkOptions();
		this._populateInstalledSoftware();
		if (!this.readOnlyMode) {
			this.mods.push('Edit Mode');
		}
	}

	async runEnvironment() {
		await this.$router.push(`${ROUTES.ACCESS_INTERFACE}/${this.activeEnvironment.envId}`);
	}

	onModeChange(mode: string) {
		this.activeMode = mode;
	}

	openActionMenu(tab: IEaasiTab = this.actionMenuTabs[0]) {
		this.actionMenuActiveTab = tab;
	}

	closeActionMenu() {
		this.actionMenuActiveTab = null;
	}

    /* Lifecycle Hooks
	============================================*/
    async created() {
		await this.init();
	}

	beforeDestroy() {
		this.resources = [];
	}

	/* Helpers
	============================================*/
	_populateInstalledSoftware() {
		if (!this.activeEnvironment.installedSoftwareIds)
			return this.installedSoftware = [];

		this.installedSoftware =
			this.activeEnvironment
				.installedSoftwareIds
				.map(id => {
					return {
						label: '',
						value: id
					} as ILabeledItem;
				});
	}

	async _populateEmulatorConfig() {
		const emulators =
			await this.$store.dispatch('resource/getEmulators');

		const operatingSystemMetadata =
			await this.$store.dispatch('resource/getOperatingSystemMetadata');

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
				readonly: true,
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
				value: this.activeEnvironment.linuxRuntime,
				readonly: false,
				property: 'linuxRuntime',
				editType: 'checkbox',
				changed: false
			}
		];
		if (emulators) {
			const activeEnvironmentEmulator = this.activeEnvironment.containerName;
			let entries = emulators.filter(e => e.name === activeEnvironmentEmulator).map(e => {
				if (e.provenance.tag === 'latest') {
					return { key: `${e.version} (latest)`, value: e.version };
				}
				return { key: e.version, value: e.version };
			});
			this.emulatorLabeledItems.push({
				label: 'Emulator Version',
				value: this.activeEnvironment.containerVersion ? this.activeEnvironment.containerVersion : '',
				readonly: false,
				property: 'containerVersion',
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
				readonly: true,
				editType: 'text-input'
			},
			{
				label: 'Display Resolution',
				value: '800x600',
				changed: false,
				readonly: true,
				editType: 'text-input'
			},
			{
				label: 'Color Depth',
				value: 'True Color',
				changed: false,
				readonly: true,
				editType: 'text-input'
			},
			{
				label: 'Region',
				value: 'U.S.',
				changed: false,
				readonly: true,
				editType: 'text-input'
			},
			{
				label: 'Time Zone',
				value: 'Eastern Standard Time',
				changed: false,
				readonly: true,
				editType: 'text-input'
			},
			{
				label: 'Date–Time',
				value: '5/3/2019–1:19PM', // That's an en-dash
				changed: false,
				readonly: true,
				editType: 'text-input'
			},
			{
				label: 'Language',
				value: 'English',
				changed: false,
				readonly: true,
				editType: 'text-input'
			},
			{
				label: 'Login Name',
				value: '<username>',
				changed: false,
				readonly: true,
				editType: 'text-input'
			},
			{
				label: 'Login password',
				value: '<password>',
				changed: false,
				readonly: true,
				editType: 'text-input'
			},
		];
	}

	_populateRuntimeOptions() {
		this.runtimeOptionLabeledItems = [
			{
				label: 'Environment Can Print',
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
				readonly: true,
				editType: 'checkbox',
				label: 'Virtualize CPU',
				value: this.isKvmEnabled,
			},
			{
				label: 'WebRTC Audio',
				value: this.activeEnvironment.useWebRTC,
				property: 'useWebRTC',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'XPRA Video',
				value: this.activeEnvironment.useXpra,
				property: 'userXpra',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'Requires Clean Shutdown',
				value: this.activeEnvironment.shutdownByOs,
				property: 'shutdownByOs',
				changed: false,
				readonly: false,
				editType: 'checkbox'
			},
			{
				label: 'Internet Enabled',
				value: this.activeEnvironment.networking ? this.activeEnvironment.networking.enableInternet : false,
				property: 'enableInternet',
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
		this.$router.push(`${ROUTES.RESOURCES.EXPLORE}?retrieveQuery=true`);
	}

}

</script>

<style lang="scss">
	.slide-menu-control-btns {
		button {
			font-size: 18px;
			font-weight: bold;
		}
	}

	.vrd-content {
		.vrd-subsection {
			padding: 18px 0;
		}
	}

	#thisIncludedIn {
		background-color: lighten($light-grey, 75%);
	}
</style>