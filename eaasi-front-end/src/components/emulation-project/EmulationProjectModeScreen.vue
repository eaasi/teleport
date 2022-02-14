<template>
	<div class="emulation-project-mode-screen">
		<a class="back-link txt-sm" @click="backToStart">
			<span class="fas fa-arrow-left"></span>
			Back to start
		</a>
		<div class="emu-project-content padded">
			<div class="environment-selection-zone">
				<h2>Environment resource</h2>
				<div class="selecting-action-button" v-if="!environment">
					<ui-button @click="startSelectingEnvironment" :disabled="isSelectingEnvironment">Select Environment</ui-button>
					<ui-button color-preset="light-blue" @click="resetSelectingResourceType" v-if="isSelectingEnvironment">Cancel</ui-button>
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
		<div class="emu-project-content padded" v-if="environment">
			<div class="environment-selection-zone">
				<h2>Object resource</h2>
				<div class="selecting-action-button" v-if="selected.length === 0">
					<ui-button @click="startSelectingObject" :disabled="isSelectingObject">Select Resource</ui-button>
					<ui-button color-preset="light-blue" @click="resetSelectingObjectType" v-if="isSelectingObject">Cancel</ui-button>
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
import {Component, Prop} from 'vue-property-decorator';
import {EmulationProjectMode} from '@/types/EmulationProject';
import {Get, Sync} from 'vuex-pathify';
import {IEaasiResource, IEnvironment, ResourceType} from '@/types/Resource';
import Draggable from 'vuedraggable';
import {archiveTypes, EMULATION_PROJECT_RESOURCE_TYPES, resourceTypes, translatedIcon} from '@/utils/constants';
import {getResourceTypeTags} from '@/helpers/ResourceHelper';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import EmulationProjectEnvironmentMetadata
	from '@/components/emulation-project/environment/EmulationProjectEnvironmentMetadata.vue';

@Component({
	name: 'EmulationProjectModeScreen',
	components: {
		EmulationProjectEnvironmentMetadata,
		Draggable
	}
})
export default class EmulationProjectModeScreen extends Vue {

	selectedEnvironment: IEnvironment[] = [];

	@Prop({ type: String })
	mode: EmulationProjectMode;

	@Sync('emulationProject/selectingResourceType')
	selectingResourceType: string;

	@Sync('emulationProject/environment')
	environment: EmulationProjectEnvironment;

	@Sync('emulationProject/selectedResources')
	selected: IEaasiResource[];

	@Get('emulationProject/projectEnvironments')
	readonly environments: IEnvironment[];

	startSelectingEnvironment() {
		this.selectingResourceType = EMULATION_PROJECT_RESOURCE_TYPES.ENVIRONMENT;
	}

	resetSelectingResourceType() {
		this.selectingResourceType = null;
		this.selectedEnvironment = [];
	}

	get isSelectingEnvironment() {
		return this.selectingResourceType === EMULATION_PROJECT_RESOURCE_TYPES.ENVIRONMENT;
	}

	get isEnvironmentSelected() {
		return this.selectedEnvironment.length !== 0;
	}

	startSelectingObject() {
		this.selectingResourceType = EMULATION_PROJECT_RESOURCE_TYPES.OBJECT;
	}

	resetSelectingObjectType() {
		this.selectingResourceType = null;
		this.selected = [];
	}

	get isSelectingObject() {
		return this.selectingResourceType === EMULATION_PROJECT_RESOURCE_TYPES.OBJECT;
	}

	get isObjectSelected() {
		return this.selected.length !== 0;
	}

	getTypeTags(resource: IEaasiResource) {
		return getResourceTypeTags(resource);
	}

	getArchiveTags(resource: IEaasiResource) {
		let tagGroup = [];
		if (resource.archive === archiveTypes.PUBLIC) {
			tagGroup.push({
				icon: translatedIcon('map-marker'),
				color: 'green',
				text: 'Saved Locally'
			});
		} else if (resource.archive === archiveTypes.REMOTE) {
			tagGroup.push({
				icon: 'fa-cloud',
				color: 'white',
				text: 'Remote'
			});
		} else if (resource.archive === archiveTypes.DEFAULT) {
			tagGroup.push({
				color: 'yellow',
				text: 'Local'
			});
		}
		return tagGroup;
	}

	backToStart() {
		this.$emit('reset');
	}

	updateEnvironmentList(evt) {
		if (evt.added) {
			this.environment = new EmulationProjectEnvironment(evt.added.element);
			this.selectingResourceType = null;
		}
	}

	updateObjectsList(evt) {
		if (evt.added) {
			this.selected = [evt.added.element];
			this.selectingResourceType = null;
		}
	}

	clearEnvironment() {
		this.environment = null;
		this.selectedEnvironment = [];
		this.selected = [];
	}

	clearObject() {
		this.selected = [];
	}

	beforeMount() {
		if (this.environment) {
			this.selectedEnvironment = [this.environments.find(env => env.envId === this.environment.envId)];
		}
	}


}
</script>

<style lang="scss">

.emulation-project-mode-screen {
	.emu-project-content {
		margin-bottom: 2rem;
	}

	.back-link {
		display: block;
		cursor: pointer;
		margin: 1rem 0.5rem;

		span {
			padding-right: 0.5rem;
		}
	}

	.selecting-action-button {
		display: flex;
		gap: 2rem;
	}

	.emu-project-content-drop-zone {
		width: max-content;
	}

	.drop-zone-container {
		width: max-content;
		height: max-content;
		border: 2px dashed lighten($dark-neutral, 80%);
		border-radius: 0.5rem;
		margin: 2rem 0 0 0;
		position: relative;

		.placeholder {
			position: absolute;
			z-index: 5;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			pointer-events: none;
		}
	}

	.drop-zone {
		background-color: lighten($light-neutral, 50%);
		width: 37rem;
		min-height: 9rem;
		position: relative;

		.ghost {
			margin-bottom: 0;

			.remove-resource-button {
				display: none;
			}
		}
	}

	.clear-dropzone-btn {
		padding: 2px 5px 0 5px;

		a > span {
			padding-left: 0.4rem;
		}
	}

	.environment-selection-zone {
		border: solid 2px lighten($dark-neutral, 80%);
		padding: 1rem;
	}
}

</style>