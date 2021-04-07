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
					{{ resourceTitle }}
				</h1>
			</div>
			<div v-if="activeContent" class="vrd-content">
				<mode-toggle
					:editable="isEditMode"
					@mode-change="onModeChange"
					@save="saveDetails"
					@refresh="refresh"
					:toggle-value="activeMode"
					:toggle-options="mods"
				/>
				<div class="rdm-container">
					<div class="row" style="margin-bottom: 1rem;">
						<div class="col-md-4">
							<resource-details-summary
								:summary-data="resourceSummary"
								:readonly="!isEditMode"
							/>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							<section-heading title="Content Details" size="large" />
							<editable-labeled-item-list
								:readonly="!isEditMode"
								:labeled-items="objectDetailsItems"
								edit-type="text-input"
							/>
						</div>
						<div class="col-md-8">
							<section-heading title="Rendering Environments" size="large" />
							<rendering-environments
								:archive-id="$route.query.archiveId"
								:resource-id="$route.query.resourceId"
								:readonly="!isEditMode"
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
			@resource-published="init"
			@resource-deleted="goBackToResults"
			@close="closeActionMenu"
			@treat-as-software="confirmModal = true"
			@navigate-to-tab="openActionMenu"
		/>

		<confirm-modal
			v-if="confirmModal"
			title="Treat as Software?"
			:confirm-label="errorMessage ? 'Try Again' : 'Confirm'"
			@click:cancel="confirmModal = false"
			@click:confirm="moveToSoftware"
			@close="confirmModal = false"
		>
			<alert card v-if="errorMessage" type="error">
				{{ errorMessage }}
			</alert>
			<alert v-else type="info">
				<span class="ers-rep-msg">
					Are you sure you want to treat this object as software?
				</span>
			</alert>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IEaasiResourceSummary, IContent, IContentRequest, ISoftwareObject, IEaasiResource } from '@/types/Resource';
import { resourceTypes } from '@/utils/constants';
import { ILabeledEditableItem } from '@/types/ILabeledItem';
import EditableLabeledItemList from '../shared/EditableLabeledItemList.vue';
import ResourceDetailsSummary from '../shared/ResourceDetailsSummary.vue';
import ModeToggle from '../shared/ModeToggle.vue';
import RenderingEnvironments from '../software/RenderingEnvironments.vue';
import SlideMenuControlButtons from '@/components/resources/SlideMenuControlButtons.vue';
import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';
import { ROUTES } from '@/router/routes.const';
import { IEaasiTab } from 'eaasi-nav';
import { Sync } from 'vuex-pathify';

@Component({
	name: 'ContentDetailsScreen',
	components: {
        EditableLabeledItemList,
        ResourceDetailsSummary,
		ModeToggle,
		SlideMenuControlButtons,
		ResourceSlideMenu,
		RenderingEnvironments
	}
})
export default class ContentDetailsScreen extends Vue {

    /* Data
	============================================*/
	activeContent: IContent = null;
	mods = ['Review Mode', 'Edit Mode'];
	activeMode: string = this.mods[0];
	objectDetailsItems: ILabeledEditableItem[] = [];
	renderingEnvs: [] = [];
	confirmModal: boolean = false;
	errorMessage: string = null;

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

	get isEditMode(): boolean {
		return this.activeMode === 'Edit Mode';
	}

	get resourceSummary(): IEaasiResourceSummary {
		return {
			id: this.activeContent.metadata.id,
			title: this.activeContent.metadata.title,
			description: null,
			content: null,
			subContent: null,
			tagGroup: [],
			resourceType: resourceTypes.CONTENT,
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

	get resourceTitle(): string {
		return this.activeContent && this.activeContent.metadata && this.activeContent.metadata.title
			? `${this.activeContent.metadata.title}` : 'Content Details';
	}

    /* Methods
	============================================*/
	onModeChange(mode: string) {
		this.activeMode = mode;
	}

	async saveDetails() {
		const result = await this.$store.dispatch('software/saveContent', this.activeContent);
		if (result && result.status === '0') this.activeMode = this.mods[0];
	}

	async moveToSoftware() {
		this.errorMessage = null;
		const softwareObject: ISoftwareObject = {
			allowedInstances: -1,
			archiveId: 'zero conf',
			exportFMTs: [],
			importFMTs: [],
			isOperatingSystem: false,
			label: this.activeContent.metadata.title,
			licenseInformation: '',
			nativeFMTs: [],
			objectId: this.activeContent.metadata.id,
			isPublic: false
		};
		const result = await this.$store.dispatch('software/saveSoftwareObject', softwareObject);
		if (!result || result.status !== '0') {
			this.errorMessage = 'Having troubles saving this object as a software.';
			return;
		}
		this.confirmModal = false;
		this.$router.replace(`/resources/software?resourceId=${softwareObject.objectId}&archiveId=${softwareObject.archiveId}`);
	}

	async refresh() {
		this.activeMode = 'Review Mode';
		await this.init();
	}

	async init() {
		const contentId = this.$route.query.resourceId as string;
		const archiveName = this.$route.query.archiveId as string;
		const contentRequest: IContentRequest = { contentId, archiveName };
		this.activeContent = await this.$store.dispatch('software/getContent', contentRequest);
		await this.$store.commit('resource/SET_RESOURCE_NAME', this.activeContent.metadata.title);
		const contentResource: IEaasiResource = {
			id: this.activeContent.metadata.id,
			title: this.activeContent.metadata.title,
			archiveId: archiveName,
			resourceType: resourceTypes.CONTENT,
			isPublic: false
		};
		this.resources = [{...contentResource, resourceType: resourceTypes.CONTENT }];
		if (!this.activeContent) return;
		this.activeMode = this.mods[0];
		this._populateObjectDetails();
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
	_populateObjectDetails() {
		this.objectDetailsItems = [
			{
				label: 'Object ID',
				value: this.activeContent.metadata.id,
				property: 'id',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Object Label',
				value: this.activeContent.metadata.title,
				property: 'label',
				readonly: true,
				editType: 'text-input',
				changed: false
			}
		];
	};

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
	background-color: lighten($light-neutral, 75%);
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
</style>