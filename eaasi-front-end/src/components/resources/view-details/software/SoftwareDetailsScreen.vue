<template>
	<div id="myResources" :style="actionMenuStyles">
		<div :style="innerStyles">
			<div class="page-title">
				<div class="back-to-results clickable" @click="goBackToResults">
					← Back to All Results
				</div>
				<div class="slide-menu-control-btns pull-right">
					<slide-menu-control-buttons @open="openActionMenu" :tabs="actionMenuTabs" />
				</div>
				<h1>
					{{ label }} Details
				</h1>
			</div>
			<div v-if="activeSoftware" class="vrd-content">
				<mode-toggle
					:editable="isEditMode"
					@mode-change="onModeChange"
					@save="saveDetails"
					@refresh="refresh"
					:toggle-value="activeMode"
					:toggle-options="mods"
					is-public
				/>
				<div class="rdm-container">
					<div class="row" style="margin-bottom: 1rem;">
						<div class="col-md-5">
							<resource-details-summary
								:summary-data="resourceSummary"
								:readonly="!isEditMode"
							/>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5">
							<section-heading
								title="Software Properties"
								size="large"
							/>
							<software-properties
								:readonly="!isEditMode"
								:items="softwareProperties"
								@add-fmt="addFmt"
								@remove-fmt="removeFmt"
							/>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5" v-if="softwareMetadata && softwareMetadata.mediaItems && softwareMetadata.mediaItems.file">
							<section-heading
								title="Attached Files"
								size="large"
							/>
							<media-files-list
								readonly
								:files="softwareMetadata.mediaItems.file"
							/>
						</div>
					</div>
				</div>
			</div>
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
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IEaasiResourceSummary, ISoftwareObject, IEaasiResource, ISoftwareMetadataResponse } from '@/types/Resource';
import { resourceTypes } from '@/utils/constants';
import { ILabeledEditableItem } from '@/types/ILabeledItem';
import EditableLabeledItemList from '../shared/EditableLabeledItemList.vue';
import ResourceDetailsSummary from '../shared/ResourceDetailsSummary.vue';
import ModeToggle from '../shared/ModeToggle.vue';
import SoftwareProperties from './SoftwareProperties.vue';
import MediaFilesList from './MediaFilesList.vue';
import SlideMenuControlButtons from '@/components/resources/SlideMenuControlButtons.vue';
import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';
import { ROUTES } from '@/router/routes.const';
import { IEaasiTab } from 'eaasi-nav';
import {Get, Sync} from 'vuex-pathify';

@Component({
	name: 'SoftwareDetailsScreen',
	components: {
		MediaFilesList,
		SoftwareProperties,
        EditableLabeledItemList,
        ResourceDetailsSummary,
		ModeToggle,
		SlideMenuControlButtons,
		ResourceSlideMenu,
	}
})
export default class SoftwareDetailsScreen extends Vue {

    /* Data
	============================================*/
	activeSoftware: ISoftwareObject = null;
	softwareMetadata: ISoftwareMetadataResponse = null;
	mods = ['Review Mode', 'Edit Mode'];
	activeMode: string = this.mods[0];
	objectDetailsItems: ILabeledEditableItem[] = [];
	softwareProperties: ILabeledEditableItem[] = [];
	label: string = '';

	// Slide menu
	actionMenuTabs: IEaasiTab[] = [
		{
			label: 'Actions Menu'
		}
	];

	actionMenuActiveTab: IEaasiTab = null;

	/* Computed
	============================================*/
	@Sync('resource/selectedResources')
	resources: IEaasiResource[];

	@Get('resource/query')
	query: ResourceSearchQuery;

	get isEditMode(): boolean {
		return this.activeMode === 'Edit Mode';
	}

	get resourceSummary(): IEaasiResourceSummary {
		return {
			id: this.activeSoftware.objectId,
			title: this.label || '',
			description: this.softwareMetadata ? this.softwareMetadata.metadata.description : '',
			content: null,
			subContent: null,
			tagGroup: [],
			resourceType: resourceTypes.SOFTWARE,
			isPublic: false
		};
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

    /* Methods
	============================================*/
	onModeChange(mode: string) {
		this.activeMode = mode;
	}

	async saveDetails() {
		this.softwareProperties.forEach(el => this.activeSoftware[el.property] = el.value);
		const result = await this.$store.dispatch('software/saveSoftwareObject', this.activeSoftware);
		if (result && result.status === '0') this.activeMode = this.mods[0];
	}

	async refresh() {
		await this.init();
		this.activeMode = 'Review Mode';
	}

	async init() {
		const resourceId = this.$route.query.resourceId as string;
		const archiveId = this.$route.query.archiveId as string;
		this.label = this.$route.query.label as string;
		const softwareMetadata = await this.$store.dispatch('software/getSoftwareMetadata', { archiveId, objectId: resourceId });
		if (softwareMetadata && softwareMetadata.metadata) {
			this.softwareMetadata = softwareMetadata;
		}
		this.activeSoftware = await this.$store.dispatch('software/getSoftwareObject', resourceId);
		if (!this.activeSoftware || !this.softwareMetadata) return;
		if (!this.activeSoftware.isPublic) {
			this.mods = [this.mods[0]];
		}
		this.activeMode = this.mods[0];
		this._populateObjectDetails();
		this._populateSoftwareProperties();
		const softwareResource: IEaasiResource = {
			id: this.softwareMetadata.metadata.id,
			title: this.softwareMetadata.metadata.title,
			archiveId,
			resourceType: resourceTypes.SOFTWARE,
			isPublic: false
		};
		this.resources = [{...softwareResource, resourceType: resourceTypes.SOFTWARE }];
		this.$store.commit('resource/SET_RESOURCE_NAME', this.softwareMetadata.metadata.title);
	}

	addFmt(fmt: string) {
		let nativeFMTs = this.softwareProperties.find(i => i.property === 'nativeFMTs').value;
		this.softwareProperties = this.softwareProperties.map(
			p => p.property === 'nativeFMTs' ? {...p, value: [...nativeFMTs, fmt]} : p
		);
	}

	removeFmt(fmt: string) {
		let nativeFMTs = this.softwareProperties.find(i => i.property === 'nativeFMTs').value.filter(v => v !== fmt);
		this.softwareProperties = this.softwareProperties.map(
			p => p.property === 'nativeFMTs' ? {...p, value: nativeFMTs} : p
		);
	}

	openActionMenu(tab: IEaasiTab = this.actionMenuTabs[1]) {
		this.actionMenuActiveTab = tab;
	}

	closeActionMenu() {
		this.actionMenuActiveTab = null;
	}

    /* Lifecycle Hooks
	============================================*/
    created() {
		this.init();
	}

	beforeDestroy() {
		this.resources = [];
	}

	/* Helpers
	============================================*/
	_aliasAllowedNumberOfInstances(allowedInstances: number) {
		if (allowedInstances === -1) {
			return 'unlimited';
		}
		return allowedInstances;
	}

	_populateSoftwareProperties() {
		this.softwareProperties = [
			{
				label: 'Object ID',
				value: this.softwareMetadata.metadata.id,
				property: 'id',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Object Label',
				value: this.softwareMetadata.metadata.title,
				property: 'label',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'License information',
				value: this.activeSoftware.licenseInformation,
				property: 'licenseInformation',
				readonly: false,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Allowed number of instances',
				value: this._aliasAllowedNumberOfInstances(this.activeSoftware.allowedInstances),
				property: 'allowedInstances',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'QID',
				value: this.activeSoftware.qid,
				property: 'qid',
				readonly: false,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Is Operating System',
				value: this.activeSoftware.isOperatingSystem,
				property: 'isOperatingSystem',
				readonly: false,
				editType: 'checkbox',
				changed: false
			},
			{
				label: 'Rendering Capabilities: Native FMTs',
				value: this.activeSoftware.nativeFMTs,
				property: 'nativeFMTs',
				readonly: false,
				editType: 'custom',
				changed: false
			}
		];
	}

	_populateObjectDetails() {
		if (!this.softwareMetadata) return;
		this.objectDetailsItems = [
			{
				label: 'Object ID',
				value: this.softwareMetadata.metadata.id,
				property: 'id',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Object Label',
				value: this.softwareMetadata.metadata.title,
				property: 'label',
				readonly: true,
				editType: 'text-input',
				changed: false
			}
		];
	};

	async goBackToResults() {
		await this.$router.push(`${ROUTES.RESOURCES.EXPLORE}?retrieveQuery=true`);
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

.back-to-results {
	color: lighten($dark-blue, 20%);
	font-size: 1.3rem;
	font-weight: normal;
	margin-bottom: 1rem;
}
</style>