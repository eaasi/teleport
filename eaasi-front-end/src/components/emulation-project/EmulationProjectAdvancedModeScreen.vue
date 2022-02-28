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
					<div class="selecting-action-button" v-if="!driveSetting.imageId && !driveSetting.objectId">
						<ui-button @click="startSelectingResource(driveSetting.driveIndex)" :disabled="selectingResourceForDiskIndex === driveSetting.driveIndex">Select Resource</ui-button>
						<ui-button color-preset="light-blue" @click="stopSelectingResource" v-if="selectingResourceForDiskIndex === driveSetting.driveIndex">Cancel</ui-button>
					</div>
					<div class="emu-project-content-drop-zone">
						<div v-if="selectingResourceForDiskIndex === driveSetting.driveIndex || driveSetting.imageId || driveSetting.objectId" class="drop-zone-container">
							<div v-if="!driveSetting.imageId && !driveSetting.objectId" class="placeholder"><span>Drag objects here to add</span></div>
							<draggable
								group="object"
								:class="['drop-zone']"
								handle=".drag-handler"
								drag-class="drag"
								ghost-class="ghost"
								:list="selected"
								@change="updateObjectsList"
							>
								<div
									v-for="object in selected"
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
					</div>
					<div class="boot-drive-checkbox">
						<checkbox
							label="Boot Drive"
							v-model="driveSetting.bootDrive"
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
import {Sync} from 'vuex-pathify';
import {ICreateEnvironmentPayload, ITemplate} from '@/types/Import';
import EmulationProjectHardwareMetadata
	from '@/components/emulation-project/metadata/EmulationProjectHardwareMetadata.vue';
import {IDriveSetting} from '@/types/Resource';
import Checkbox from '@/components/global/forms/Checkbox.vue';
import Draggable from 'vuedraggable';

@Component({
	name: 'EmulationProjectAdvancedModeScreen',
	components: {
		EmulationProjectHardwareMetadata,
		Checkbox,
		Draggable
	}
})
export default class EmulationProjectAdvancedModeScreen extends Vue {

	selectedTemplateId: string = null;

	selectingResourceForDiskIndex: number = -1;

	@Sync('resource/availableTemplates')
	availableTemplates: ITemplate[];

	@Sync('emulationProject/createEnvironmentPayload')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	@Sync('emulationProject/createEnvironmentPayload@driveSettings')
	driveSettings: IDriveSetting[];

	get selectedTemplate() {
		return this.availableTemplates.find(template => template.id === this.selectedTemplateId);
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

	startSelectingResource(index: number) {
		this.selectingResourceForDiskIndex = index;
	}

	stopSelectingResource() {
		this.selectingResourceForDiskIndex = -1;
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
	}

	updateObjectsList() {

	}

	getTypeTags() {

	}

	getArchiveTags() {

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
	padding: 2rem;
	margin-bottom: 1rem;

	.disk-label, .selecting-action-button, .emu-project-content-drop-zone {
		margin-bottom: 1rem;
	}

	.boot-drive-checkbox {
		width: max-content;
	}
}

</style>