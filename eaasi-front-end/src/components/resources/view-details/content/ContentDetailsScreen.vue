<template>
	<div id="myResources">
		<h1 class="flex flex-row justify-between" style="display: flex;">
			<span>Content Details</span>
			<ui-button size="md" @click="confirmModal = true">
				Treat as Software
			</ui-button>
		</h1>
		<div v-if="activeContent" class="vrd-content">
			<mode-toggle
				:editable="isEditMode"
				@mode-change="onModeChange"
				@save="saveDetails"
				@refresh="init"
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
		<confirm-modal
			v-if="confirmModal"
			title="Treat as Software?"
			:confirm-label="errorMessage ? 'Try Again' : 'Confirm'"
			@click:cancel="confirmModal = false"
			@click:confirm="moveToSoftware"
			@close="confirmModal = false"
		>
			<alert-card v-if="errorMessage" type="error">
				{{ errorMessage }}
			</alert-card>
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
import { IEaasiResourceSummary, IContent, IContentRequest, ISoftwareObject, IOverrideContentRequest } from '@/types/Resource';
import { ITaskState } from '@/types/Task';
import { IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';
import { resourceTypes } from '@/utils/constants';
import { ILabeledEditableItem } from '@/types/ILabeledItem';
import EditableLabeledItemList from '../shared/EditableLabeledItemList.vue';
import ResourceDetailsSummary from '../shared/ResourceDetailsSummary.vue';
import ModeToggle from '../shared/ModeToggle.vue';
import RenderingEnvironments from '../software/RenderingEnvironments.vue';
import EaasiTask from '@/models/task/EaasiTask';

@Component({
	name: 'ContentDetailsScreen',
	components: {
        EditableLabeledItemList,
        ResourceDetailsSummary,
		ModeToggle,
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

	/* Computed
    ============================================*/
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
			resourceType: resourceTypes.CONTENT
		};
	}

    /* Methods
	============================================*/
	onModeChange(mode: string) {
		this.activeMode = mode;
	}

	async saveDetails() {
		const objectArchive = this.$route.query.archiveId as string;
		const objectId = this.$route.query.resourceId as string;
		const overrideRequest: IOverrideContentRequest = {
			description: null,
			environments: this.renderingEnvs,
			objectArchive,
			objectId
		};
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
		};
		const result = await this.$store.dispatch('software/saveSoftwareObject', softwareObject);
		if (!result || result.status !== '0') {
			this.errorMessage = 'Having troubles saving this object as a software.';
			return;
		}
		this.confirmModal = false;
		this.$router.push(`/resources/software?resourceId=${softwareObject.objectId}&archiveId=${softwareObject.archiveId}`);
	}

	async init() {
		const contentId = this.$route.query.resourceId as string;
		const archiveName = this.$route.query.archiveId as string;
		const contentRequest: IContentRequest = { contentId, archiveName };
		this.activeContent = await this.$store.dispatch('software/getContent', contentRequest);
		await this.$store.commit('resource/SET_RESOURCE_NAME', this.activeContent.metadata.title);
		if (!this.activeContent) return;
		this.activeMode = this.mods[0];
		this._populateObjectDetails();
	}

    /* Lifecycle Hooks
	============================================*/
    created() {
		this.init();
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
}

</script>

<style lang="scss">
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