<template>
	<form-modal
		:title="saveTitle"
		save-text="Save"
		@close="$emit('close')"
		@click:cancel="$emit('close')"
		@save="$emit('save-environment', saveEnvOptions)"
		size="sm"
		class="software-picker-modal"
	>
		<div class="save-env-title" v-if="!environment || saveEnvOptions.saveType === 0 || isObjectEnvironment">
			<h3>Title</h3>
			<text-input
				rules="required"
				v-model="saveEnvOptions.title"
				placeholder="Title of the new environment..."
			/>
		</div>
		<div class="save-env-description" v-if="!isEphemeral">
			<h3>Description</h3>
			<text-area-input
				rules="required"
				v-model="saveEnvOptions.description"
				placeholder="Description of changes made to this environment..."
			/>
		</div>
		<div class="save-env-type" v-if="environment && !isObjectEnvironment">
			<h3>Save Options</h3>
			<descriptive-radios
				:options="radioOptions"
				v-model="saveEnvOptions.saveType"
			/>
		</div>
	</form-modal>
</template>

<script lang="ts">
import DescriptiveRadios from '@/components/global/forms/DescriptiveRadios.vue';
import {IRadioOption} from '@/types/Forms';
import {ISaveEnvOptions} from '@/types/SaveEnvironment';
import {SaveEnvironmentOption} from '@/types/SaveEnvironmentOption';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {Get, Sync} from 'vuex-pathify';
import {IEnvironment} from '@/types/Resource';
import {ICreateEnvironmentPayload} from '@/types/Import';

@Component({
	name: 'SaveEnvironmentModal',
	components: {
		DescriptiveRadios,
	}
})
export default class SaveEnvironmentModal extends Vue {

	@Get('emulationProject/isObjectEnvironment')
	isObjectEnvironment: boolean;

	@Sync('resource/activeEnvironment')
	environment: IEnvironment;

	@Get('resource/activeEphemeralEnvironment')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	@Get('import/isImportedEnvironment')
	isImportedEnvironment: boolean;

	get saveTitle() {
		if (this.isEphemeral) {
			return 'Save Environment';
		}
		return this.isObjectEnvironment
			? 'Save New Content Environment'
			: 'Save Environment';
	}

	get isEphemeral() {
		return !this.environment && this.createEnvironmentPayload;
	}

	get radioOptions(): IRadioOption[] {
		return [
			{
				value: SaveEnvironmentOption.newEnvironment,
				label: 'New Environment',
				description: 'Create a New Environment Resource'
			},
			{
				value: SaveEnvironmentOption.createRevision,
				label: 'Create Revision',
				description: 'Create a Revision of this Environment Resource'
			}
		];
	}

	saveEnvOptions: ISaveEnvOptions = {
		description: '',
		saveType: 0,
		title: ''
	};

	created() {
		if (this.isObjectEnvironment) {
			this.saveEnvOptions.saveType = SaveEnvironmentOption.objectEnvironment;
		} else if (this.isImportedEnvironment) {
			this.saveEnvOptions.saveType = SaveEnvironmentOption.imageImport;
		}
		if (this.isEphemeral) {
			this.saveEnvOptions.title = this.createEnvironmentPayload.label;
		}
	}
}
</script>

<style lang='scss'>
	.save-env-header {
		margin: 1.2rem 0;
	}
</style>