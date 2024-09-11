<template>
	<div class="emulation-project-advanced-mode-screen">
		<div class="emu-project-content padded">
			<h2 class="hardware-select-header">Hardware</h2>
			<div class="hardware-select-container row">
				<div class="col-sm-5">
					<div class="txt-sm">System Template</div>
					<select-list :value="selectedTemplateId" @input="selectTemplate">
						<option :value="null" selected disabled>
							Choose a system template...
						</option>
						<option v-for="template in availableTemplates" :key="template.id" :value="template.id">
							{{ template.description.title }}
						</option>
					</select-list>
				</div>
				<div class="col-sm">
					<tips-for-success>
						Make sure that your operating system matches any software resources you plan to install.
					</tips-for-success>
				</div>
			</div>
			<emulation-project-hardware-metadata :template="selectedTemplate" />
		</div>
		<div class="emu-project-content padded" v-if="createEnvironmentPayload && driveSettings && driveSettings.length > 0">
			<h2 class="disk-select-header">Drives</h2>
			<div v-for="driveSetting in driveSettings" :key="driveSetting.driveIndex">
				<div class="disk-select-card">
					<div class="disk-label">{{ getDiskLabel(driveSetting.drive.type) }}</div>
					<div class="selecting-action-button" v-if="!isResourceSelected(driveSetting)">
						<ui-button @click="startSelectingResource(driveSetting)" :disabled="!isSelectionAvailable(driveSetting) || selectingResourceForDiskIndex === driveSetting.driveIndex">Select Resource</ui-button>
						<ui-button color-preset="light-blue" @click="stopSelectingResource(driveSetting)" v-if="selectingResourceForDiskIndex === driveSetting.driveIndex">Cancel</ui-button>
						<div class="disk-select-note" v-if="!isSelectionAvailable(driveSetting)">No matching resources for this drive.</div>
					</div>
					<div class="emu-project-content-drop-zone">
						<div v-if="isSelectionAvailable(driveSetting) && isDropzoneVisible(driveSetting)" class="drop-zone-container">
							<div v-if="!isResourceSelected(driveSetting)" class="placeholder"><span>Drag objects here to add</span></div>
							<draggable
								:group="{name: 'object', push: 'clone'}"
								:class="['drop-zone']"
								handle=".drag-handler"
								drag-class="drag"
								ghost-class="ghost"
								:list="selectedResourcesPerDrive[driveSetting.driveIndex]"
								@change="updateObjectsList"
							>
								<div
									v-for="object in selectedResourcesPerDrive[driveSetting.driveIndex]"
									:key="object.id"
								>
									<draggable-card
										footer
										:data="object"
										is-clickable
										hide-details
										class="flex-grow no-mb"
										hide-grip-lines
									>
										<template #tagsLeft>
											<tag-group position="left" :tags="getTypeTags(object)" />
										</template>
										<template #tagsRight>
											<tag-group position="right" :tags="getArchiveTags(object)" />
										</template>
									</draggable-card>
								</div>
							</draggable>
						</div>
						<div class="clear-dropzone-btn text-right">
							<a v-if="isResourceSelected(driveSetting)" class="clickable txt-sm" @click="clearObject(driveSetting)"> Empty <span
								class="fas fa-times"
							></span></a>
						</div>
					</div>
					<div class="boot-drive-checkbox">
						<checkbox
							label="Boot Drive"
							v-model="driveSetting.bootDrive"
							:disabled="!isSelectionAvailable(driveSetting)"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {Get, Sync} from 'vuex-pathify';
import {ICreateEnvironmentPayload, ITemplate} from '@/types/Import';
import EmulationProjectHardwareMetadata
	from '@/components/emulation-project/metadata/EmulationProjectHardwareMetadata.vue';
import { IDriveSetting, IEaasiResource, ResourceType } from '@/types/Resource';
import Checkbox from '@/components/global/forms/Checkbox.vue';
import Draggable from 'vuedraggable';
import _ from 'lodash';
import {archiveTypes, AVAILABLE_RESOURCES_BY_DISK_TYPE, translatedIcon} from '@/utils/constants';
import {getResourceTypeTags} from '@/helpers/ResourceHelper';

@Component({
	name: 'EmulationProjectAdvancedModeScreen',
	components: {
		EmulationProjectHardwareMetadata,
		Checkbox,
		Draggable
	}
})
export default class EmulationProjectAdvancedModeScreen extends Vue {

	@Sync('emulationProject/selectedTemplateId')
	selectedTemplateId: string;

	selectingResourceForDiskIndex: number = -1;

	@Sync('emulationProject/selectedResourcesPerDrive')
	selectedResourcesPerDrive: IEaasiResource[][];

	@Sync('resource/availableTemplates')
	availableTemplates: ITemplate[];

	@Sync('emulationProject/createEnvironmentPayload')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	@Sync('emulationProject/createEnvironmentPayload@driveSettings')
	driveSettings: IDriveSetting[];

	@Sync('emulationProject/selectingResourceTypes')
	selectingResourceTypes: ResourceType[];

	@Get('emulationProject/projectObjects')
	objects: IEaasiResource[];

	@Get('emulationProject/projectImages')
	images: IEaasiResource[];

	get selectedTemplate() {
		return this.availableTemplates.find(template => template.id === this.selectedTemplateId);
	}

	isDropzoneVisible(driveSetting: IDriveSetting) {
		return this.selectingResourceForDiskIndex === driveSetting.driveIndex || this.isResourceSelected(driveSetting);
	}

	isResourceSelected(driveSetting: IDriveSetting) {
		return !_.isEmpty(this.selectedResourcesPerDrive[driveSetting.driveIndex]);
	}

	isSelectionAvailable(driveSetting: IDriveSetting) {
		try {
			return [...this.objects, ...this.images].some(object => AVAILABLE_RESOURCES_BY_DISK_TYPE[driveSetting.drive.type].includes(object.resourceType));
		} catch (e) {
			return false;
		}
	}

	getDiskLabel(type: string) {
		switch (type) {
			case 'disk':
				return 'Hard Drive';
			case 'cdrom':
				return 'CD-ROM';
			case 'floppy':
				return 'Floppy Disk';
			default:
				return '';
		}
	}

	startSelectingResource(driveSetting: IDriveSetting) {
		this.selectingResourceForDiskIndex = driveSetting.driveIndex;
		this.selectingResourceTypes = _.uniq([...this.selectingResourceTypes, ...AVAILABLE_RESOURCES_BY_DISK_TYPE[driveSetting.drive.type]]);
	}

	stopSelectingResource(driveSetting: IDriveSetting) {
		this.selectingResourceForDiskIndex = -1;
		this.selectingResourceTypes = _.filter(this.selectingResourceTypes, type => !AVAILABLE_RESOURCES_BY_DISK_TYPE[driveSetting.drive.type].includes(type));
	}

	selectTemplate(template: string) {
		this.selectedTemplateId = template;
		this.createEnvironmentPayload = {
			nativeConfig: this.selectedTemplate?.nativeConfig?.value || '',
			driveSettings: this.selectedTemplate?.drive.map((drive, index) => ({ drive: drive, driveIndex: index, bootDrive: false })),
			templateId: this.selectedTemplate?.id,
			operatingSystemId: this.selectedTemplate?.operatingSystemId || 'default',
			label: this.selectedTemplate?.description.title,
		};
		this.selectingResourceForDiskIndex = -1;
		this.selectedResourcesPerDrive = this.selectedTemplate?.drive.map(() => []);
	}

	updateObjectsList(evt) {
		if (evt.added) {
			this.selectedResourcesPerDrive[this.selectingResourceForDiskIndex] = [evt.added.element];
			this.selectingResourceTypes = _.filter(this.selectingResourceTypes, type =>
				!AVAILABLE_RESOURCES_BY_DISK_TYPE[this.driveSettings[this.selectingResourceForDiskIndex].drive.type].includes(type));
			this.selectingResourceForDiskIndex = -1;
		}
	}

	getTypeTags(resource: IEaasiResource) {
		return getResourceTypeTags(resource);
	}

	getArchiveTags(resource: IEaasiResource) {
		const archive = resource.archive || resource.archiveId;
		let tagGroup = [];
		if (archive === archiveTypes.PUBLIC) {
			tagGroup.push({
				icon: translatedIcon('map-marker'),
				color: 'green',
				text: 'Saved Locally'
			});
		} else if (archive === archiveTypes.REMOTE) {
			tagGroup.push({
				icon: 'fa-cloud',
				color: 'white',
				text: 'Remote'
			});
		} else if (archive === archiveTypes.DEFAULT) {
			tagGroup.push({
				color: 'yellow',
				text: 'Local'
			});
		}
		return tagGroup;
	}

	clearObject(driveSetting: IDriveSetting) {
		this.selectedResourcesPerDrive = this.selectedResourcesPerDrive.map((resources, index) => index === driveSetting.driveIndex ? [] : resources);
	}

	async init() {
		await this.$store.dispatch('resource/getTemplates');
		if (this.createEnvironmentPayload) {
			this.selectedTemplateId = this.createEnvironmentPayload.templateId;
		}
		this.selectingResourceForDiskIndex = -1;
	}

	async created() {
		await this.init();
	}

}
</script>

<style lang="scss">

.hardware-select-container {
	margin-bottom: 1rem;
}

.hardware-select-header {
	margin-bottom: 2rem;
}

.disk-select-card {
	border: solid 2px lighten($dark-neutral, 80%);
	margin-bottom: 1rem;
	padding: 2rem;

	.disk-label,
	.selecting-action-button,
	.emu-project-content-drop-zone {
		margin-bottom: 1rem;
	}

	.boot-drive-checkbox {
		width: max-content;
	}
}

.disk-select-note {
	align-items: center;
	border-left: solid 2px $dark-neutral;
	display: flex;
	padding-left: 1rem;
}

</style>