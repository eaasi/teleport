<template>
	<div class="emulation-project-mode-screen">
		<a class="back-link txt-sm" @click="backToStart">
			<span class="fas fa-arrow-left"></span>
			Back to start
		</a>
		<emulation-project-basic-mode-screen v-if="isBasicMode" />
		<emulation-project-advanced-mode-screen v-if="isAdvancedMode" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {EmulationProjectMode} from '@/types/EmulationProject';
import {Get, Sync} from 'vuex-pathify';
import {IEaasiResource, IEnvironment} from '@/types/Resource';
import Draggable from 'vuedraggable';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import EmulationProjectEnvironmentMetadata
	from '@/components/emulation-project/metadata/EmulationProjectEnvironmentMetadata.vue';
import EmulationProjectBasicModeScreen from '@/components/emulation-project/EmulationProjectBasicModeScreen.vue';
import EmulationProjectAdvancedModeScreen from '@/components/emulation-project/EmulationProjectAdvancedModeScreen.vue';
import {ICreateEnvironmentPayload} from '@/types/Import';

@Component({
	name: 'EmulationProjectModeScreen',
	components: {
		EmulationProjectAdvancedModeScreen,
		EmulationProjectBasicModeScreen,
		EmulationProjectEnvironmentMetadata,
		Draggable
	}
})
export default class EmulationProjectModeScreen extends Vue {

	@Prop({ type: String })
	mode: EmulationProjectMode;

	@Sync('emulationProject/selectingResourceTypes')
	selectingResourceTypes: string[];

	@Sync('emulationProject/environment')
	environment: EmulationProjectEnvironment;

	@Sync('emulationProject/selectedResources')
	selected: IEaasiResource[];

	@Sync('emulationProject/selectedResourcesPerDrive')
	selectedResourcesPerDrive: IEaasiResource[][];

	@Sync('emulationProject/selectedTemplateId')
	selectedTemplateId: string;

	@Sync('emulationProject/createEnvironmentPayload')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	@Get('emulationProject/projectEnvironments')
	readonly environments: IEnvironment[];

	get isBasicMode() {
		return this.mode === EmulationProjectMode.Basic;
	}

	get isAdvancedMode() {
		return this.mode === EmulationProjectMode.Advanced;
	}

	setSelectingResourceTypes(types: ResponseType[]) {
		this.selectingResourceTypes = types;
	}

	setSelectedResources(resources: IEaasiResource[]) {
		this.selected = resources;
	}

	setEnvironment(environment: EmulationProjectEnvironment) {
		this.environment = environment;
	}

	backToStart() {
		this.environment = null;
		this.selected = [];
		this.$emit('reset');
		this.selectingResourceTypes = [];
		this.createEnvironmentPayload = null;
		this.selectedTemplateId = null;
		this.selectedResourcesPerDrive = [];
	}

}
</script>

<style lang="scss">

.emulation-project-mode-screen {
	.emu-project-content {
		margin-bottom: 2rem;
	}

	.back-link {
		cursor: pointer;
		display: block;
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
		border: 2px dashed $light-green-background;
		border-radius: 0.5rem;
		height: max-content;
		position: relative;
		width: max-content;

		.placeholder {
			align-items: center;
			display: flex;
			height: 100%;
			justify-content: center;
			pointer-events: none;
			position: absolute;
			width: 100%;
			z-index: 5;
		}
	}

	.drop-zone {
		background-color: $green-background;
		min-height: 9rem;
		height: fit-content;
		position: relative;
		width: 37rem;

		.ghost {
			margin-bottom: 0;

			.remove-resource-button {
				display: none;
			}
		}

		.resource-object-container {
			border: none;
		}
	}

	.clear-dropzone-btn {
		padding: 2px 5px 0 5px;

		a > span {
			padding-left: 0.4rem;
		}
	}

	.environment-selection-zone {
		border: solid 2px $medium-grey;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 1.5rem 1rem;
	}

	.environment-selection-controls {
		margin-bottom: 1rem;
		width: 385px;
	}
}

</style>