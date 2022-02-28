<template>
	<div class="emulation-project-basic-mode-screen">
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
import {Component, Prop, Watch} from 'vue-property-decorator';
import {IEaasiResource, IEnvironment} from '@/types/Resource';
import Draggable from 'vuedraggable';
import {archiveTypes, EMULATION_PROJECT_RESOURCE_TYPES, translatedIcon} from '@/utils/constants';
import {getResourceTypeTags} from '@/helpers/ResourceHelper';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import EmulationProjectEnvironmentMetadata
	from '@/components/emulation-project/metadata/EmulationProjectEnvironmentMetadata.vue';

@Component({
	name: 'EmulationProjectBasicModeScreen',
	components: {
		EmulationProjectEnvironmentMetadata,
		Draggable
	}
})
export default class EmulationProjectBasicModeScreen extends Vue {

	selectedEnvironment: IEnvironment[] = [];

	@Prop({ type: String })
	selectingResourceType: string;

	@Prop()
	environment: EmulationProjectEnvironment;

	@Prop()
	selected: IEaasiResource[];

	@Prop()
	readonly environments: IEnvironment[];

	startSelectingEnvironment() {
		this.$emit('set-selecting-resource-type', EMULATION_PROJECT_RESOURCE_TYPES.ENVIRONMENT);
	}

	resetSelectingResourceType() {
		this.$emit('set-selecting-resource-type', null);
		this.selectedEnvironment = [];
	}

	get isSelectingEnvironment() {
		return this.selectingResourceType === EMULATION_PROJECT_RESOURCE_TYPES.ENVIRONMENT;
	}

	get isEnvironmentSelected() {
		return this.selectedEnvironment.length !== 0;
	}

	startSelectingObject() {
		this.$emit('set-selecting-resource-type', EMULATION_PROJECT_RESOURCE_TYPES.OBJECT);
	}

	resetSelectingObjectType() {
		this.$emit('set-selecting-resource-type', null);
		this.$emit('set-selected-resources', []);
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
			this.$emit('set-environment', new EmulationProjectEnvironment(evt.added.element));
			this.$emit('set-selecting-resource-type', null);
		}
	}

	updateObjectsList(evt) {
		if (evt.added) {
			this.$emit('set-selected-resources', [evt.added.element]);
			this.$emit('set-selecting-resource-type', null);
		}
	}

	clearEnvironment() {
		this.$emit('set-environment', null);
		this.selectedEnvironment = [];
		this.$emit('set-selected-resources', []);
	}

	clearObject() {
		this.$emit('set-selected-resources', []);
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