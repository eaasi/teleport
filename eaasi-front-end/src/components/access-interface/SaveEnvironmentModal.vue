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
		<div class="save-env-title" v-if="saveEnvOptions.saveType === 0 || isConstructedEnvironment">
			<h3>Title</h3>
			<text-input
				v-model="saveEnvOptions.title"
				placeholder="Title of the new environment..."
			/>
		</div>
		<div class="save-env-description">
			<h3>Description</h3>
			<text-area-input
				v-model="saveEnvOptions.description"
				placeholder="Description of changes made to this environment..."
			/>
		</div>
		<div class="save-env-type" v-if="!isConstructedEnvironment">
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
	import {Get} from 'vuex-pathify';

	@Component({
		name: 'SaveEnvironmentModal',
		components: {
			DescriptiveRadios,
		}
	})
	export default class SaveEnvironmentModal extends Vue {

		@Get('import/environmentType')
		environmentType: string;

		@Get('import/isConstructedEnvironment')
		isConstructedEnvironment: boolean;

		get saveTitle() {
			return this.isConstructedEnvironment
				? 'Save New Content Environment'
				: 'Save Environment';
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
			if (this.environmentType == 'objectEnvironment') {
				this.saveEnvOptions.saveType = SaveEnvironmentOption.objectEnvironment;
			}
		}
	}
</script>

<style lang='scss'>
	.save-env-header {
		margin: 1.2rem 0;
	}
</style>