<template>
	<div class="emulation-project-basic-mode-screen">
		<div class="emu-project-content padded">
			<div class="environment-selection-zone">
				<div class="environment-selection-controls">
					<h2>Environment resource</h2>
					<div class="selecting-action-button" v-if="!environment">
						<ui-button @click="startSelectingEnvironment" :disabled="isSelectingEnvironment">Select Environment</ui-button>
						<ui-button color-preset="light-blue" @click="resetSelectingEnvironmentType" v-if="isSelectingEnvironment">Cancel</ui-button>
					</div>
				</div>
				<div class="emu-project-content-drop-zone">
					<div v-if="isSelectingEnvironment || !!environment" class="drop-zone-container">
						<div v-if="!isEnvironmentSelected" class="placeholder"><span>Drag objects here to add</span></div>
						<draggable
							group="environment"
							:class="['drop-zone']"
							handle=".drag-handler"
							drag-class="drag"
							ghost-class="ghost"
							:list="selectedEnvironment"
							@change="updateEnvironmentList"
						>
							<div
								v-for="env in selectedEnvironment"
								:key="env.envId"
							>
								<draggable-card
									footer
									:data="env"
									is-clickable
									hide-details
									class="flex-grow no-mb"
									hide-grip-lines
								>
									<template #tagsLeft>
										<tag-group position="left" :tags="getTypeTags(env)" />
									</template>
									<template #tagsRight>
										<tag-group position="right" :tags="getArchiveTags(env)" />
									</template>
								</draggable-card>
							</div>
						</draggable>
					</div>
					<div class="clear-dropzone-btn text-right">
						<a v-if="!!environment" class="clickable txt-sm" @click="clearEnvironment"> Empty <span
							class="fas fa-times"
						></span></a>
					</div>
				</div>
			</div>
			<emulation-project-environment-metadata :environment="environment" />
		</div>
		<div class="emu-project-content padded">
			<div class="environment-selection-zone">
				<div class="environment-selection-controls">
					<h2>Object resource</h2>
					<div class="selecting-action-button" v-if="selected.length === 0">
						<ui-button @click="startSelectingObject" :disabled="isSelectingObject">Select Resource</ui-button>
						<ui-button color-preset="light-blue" @click="resetSelectingObjectType" v-if="isSelectingObject">Cancel</ui-button>
					</div>
				</div>
				<div class="emu-project-content-drop-zone">
					<div v-if="isSelectingObject || selected.length !== 0" class="drop-zone-container">
						<div v-if="!isObjectSelected" class="placeholder"><span>Drag objects here to add</span></div>
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
					<div class="clear-dropzone-btn text-right">
						<a v-if="selected.length !== 0" class="clickable txt-sm" @click="clearObject"> Empty <span
							class="fas fa-times"
						></span></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {IEaasiResource, IEnvironment, ResourceType} from '@/types/Resource';
import Draggable from 'vuedraggable';
import {archiveTypes, resourceTypes, translatedIcon} from '@/utils/constants';
import {getResourceTypeTags} from '@/helpers/ResourceHelper';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import EmulationProjectEnvironmentMetadata
	from '@/components/emulation-project/metadata/EmulationProjectEnvironmentMetadata.vue';
import _ from 'lodash';
import {Get, Sync} from 'vuex-pathify';

@Component({
	name: 'EmulationProjectBasicModeScreen',
	components: {
		EmulationProjectEnvironmentMetadata,
		Draggable
	}
})
export default class EmulationProjectBasicModeScreen extends Vue {

	selectedEnvironment: IEnvironment[] = [];

	@Sync('emulationProject/selectingResourceTypes')
	selectingResourceTypes: ResourceType[];

	@Sync('emulationProject/environment')
	environment: EmulationProjectEnvironment;

	@Sync('emulationProject/selectedResources')
	selected: IEaasiResource[];

	@Get('emulationProject/projectEnvironments')
	readonly environments: IEnvironment[];

	startSelectingEnvironment() {
		this.selectingResourceTypes = _.uniq([...this.selectingResourceTypes, resourceTypes.ENVIRONMENT]);
	}

	resetSelectingEnvironmentType() {
		this.selectingResourceTypes = _.filter(this.selectingResourceTypes, type => type !== resourceTypes.ENVIRONMENT);
		this.selectedEnvironment = [];
	}

	get isSelectingEnvironment() {
		return this.selectingResourceTypes.includes(resourceTypes.ENVIRONMENT);
	}

	get isEnvironmentSelected() {
		return this.selectedEnvironment.length !== 0;
	}

	startSelectingObject() {
		this.selectingResourceTypes = _.uniq([...this.selectingResourceTypes, resourceTypes.CONTENT, resourceTypes.SOFTWARE]);
	}

	resetSelectingObjectType() {
		this.selectingResourceTypes = _.filter(this.selectingResourceTypes, type => type !== resourceTypes.CONTENT && type !== resourceTypes.SOFTWARE);
		this.selected = [];
	}

	get isSelectingObject() {
		return this.selectingResourceTypes.includes(resourceTypes.CONTENT) || this.selectingResourceTypes.includes(resourceTypes.SOFTWARE);
	}

	get isObjectSelected() {
		return this.selected.length !== 0;
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

	updateEnvironmentList(evt) {
		if (evt.added) {
			this.environment = new EmulationProjectEnvironment(evt.added.element);
			this.selectingResourceTypes = _.filter(this.selectingResourceTypes, type => type !== resourceTypes.ENVIRONMENT);
		}
	}

	updateObjectsList(evt) {
		if (evt.added) {
			this.selected = [evt.added.element];
			this.selectingResourceTypes = _.filter(this.selectingResourceTypes, type => type !== resourceTypes.CONTENT && type !== resourceTypes.SOFTWARE);
		}
	}

	clearEnvironment() {
		this.environment = null;
		this.selectedEnvironment = [];
	}

	clearObject() {
		this.selected = [];
	}

	beforeMount() {
		if (this.environment) {
			this.selectedEnvironment = [this.environments.find(env => env.envId === this.environment.envId)];
		}
	}

	@Watch('environment')
	setSelectedEnvironment(nextEnvironment: EmulationProjectEnvironment) {
		if (nextEnvironment) {
			this.selectedEnvironment = [this.environments.find(env => env.envId === nextEnvironment.envId)];
		} else {
			this.selectedEnvironment = [];
		}
	}


}
</script>

<style lang="scss">

</style>