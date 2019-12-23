<template>
	<div id="myResources">
		<h1>Software Details</h1>
		<div v-if="activeSoftware" class="vrd-content">
			<mode-toggle
				:editable="isEditMode"
				@mode-change="onModeChange"
				@save="saveDetails"
				@refresh="init"
				:toggle-value="toggleValue"
				:toggle-options="toggleOptions"
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
						<section-heading
							title="Software details"
							size="large"
						/>
						<editable-labeled-item-list
							:readonly="!isEditMode"
							:labeled-items="objectDetailsItems"
							edit-type="text-input"
						/>
					</div>
					<div class="col-md-8">
						<section-heading
							title="Rendering Environments"
							size="large"
						/>
						<rendering-environments
							:archive-id="$route.query.archiveId"
							:resource-id="$route.query.resourceId"
							:readonly="!isEditMode"
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
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
					<div class="col-md-4" v-if="softwareMetadata && softwareMetadata.mediaItems && softwareMetadata.mediaItems.file">
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
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IEaasiResourceSummary, ISoftwarePackage, ISoftwareObject, IContentFile } from '@/types/Resource';
import { ITaskState } from '@/types/Task';
import { IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';
import { resourceTypes } from '@/utils/constants';
import { ILabeledEditableItem, ILabeledItem } from '@/types/ILabeledItem';
import EditableLabeledItemList from '../shared/EditableLabeledItemList.vue';
import ResourceDetailsSummary from '../shared/ResourceDetailsSummary.vue';
import ModeToggle from '../shared/ModeToggle.vue';
import RenderingEnvironments from './RenderingEnvironments.vue';
import SoftwareProperties from './SoftwareProperties.vue';
import EaasiTask from '@/models/task/EaasiTask';
import MediaFilesList from './MediaFilesList.vue';

@Component({
	name: 'SoftwareDetailsScreen',
	components: {
		MediaFilesList,
		SoftwareProperties,
        EditableLabeledItemList,
        ResourceDetailsSummary,
		ModeToggle,
		RenderingEnvironments
	}
})
export default class SoftwareDetailsScreen extends Vue {

    /* Data
	============================================*/
	activeSoftware: ISoftwareObject = null;
	softwareMetadata = null;
	toggleOptions = ['Review Mode', 'Edit Mode'];
	toggleValue: string = this.toggleOptions[0];
	objectDetailsItems: ILabeledEditableItem[] = [];
	renderingEnvs: ILabeledEditableItem[] = [];
	softwareProperties: ILabeledEditableItem[] = [];

	/* Computed
    ============================================*/
	get isEditMode(): boolean {
		return this.toggleValue === 'Edit Mode';
	}

	get resourceSummary(): IEaasiResourceSummary {
		return {
			id: this.activeSoftware.objectId,
			title: this.softwareMetadata ? this.softwareMetadata.metadata.title : '',
			description: this.softwareMetadata ? this.softwareMetadata.description : '',
			content: null,
			subContent: null,
			tagGroup: [],
			resourceType: resourceTypes.SOFTWARE
		};
	}

    /* Methods
	============================================*/
	onModeChange(mode: string) {
		this.toggleValue = mode;
	}

	async saveDetails() {
		this.softwareProperties.forEach(el => this.activeSoftware[el.property] = el.value);
		const result = await this.$store.dispatch('software/saveSoftwareObject', this.activeSoftware);
		if (result && result.status === '0') this.toggleValue = this.toggleOptions[0];
	}

	async init() {
		const { resourceId, archiveId } = this.$route.query;
		const softwareMetadata = await this.$store.dispatch('software/getSoftwareMetadata', { archiveId, objectId: resourceId });
		if (softwareMetadata && softwareMetadata.metadata) {
			this.softwareMetadata = softwareMetadata;
		}
		this.activeSoftware = await this.$store.dispatch('software/getSoftwareObject', resourceId);
		if (!this.activeSoftware || !this.softwareMetadata) return;
		this.toggleValue = this.toggleOptions[0];
		this._populateObjectDetails();
		this._populateSoftwareProperties();
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

    /* Lifecycle Hooks
	============================================*/
    created() {
		this.init();
	}

	/* Helpers
	============================================*/

	_populateSoftwareProperties() {
		this.softwareProperties = [
			{
				label: 'License information',
				value: this.activeSoftware.licenseInformation,
				property: 'licenseInformation',
				readonly: false,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Allowed number of instances (for unlimited choose -1)',
				value: this.activeSoftware.allowedInstances,
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
				label: 'This is an Operating System',
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