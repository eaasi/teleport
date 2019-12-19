<template>
	<form-modal
		title="Save Environment"
		save-text="Save"
		@close="$emit('cancel')"
		@click:cancel="$emit('cancel')"
		@save="$emit('save-environment', saveEnvOptions)"
		size="sm"
		class="software-picker-modal"
	>
		<div class="save-env-title" v-if="saveEnvOptions.saveType === 1">
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
		<div class="save-env-type">
			<h3>Save Options</h3>
			<descriptive-radios
				:options="saveOptions"
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

	@Component({
    name: 'SaveEnvironmentModal',
	components: {
    	DescriptiveRadios,
	}
})
export default class SaveEnvironmentModal extends Vue {
    saveEnvOptions: ISaveEnvOptions = {
    	description: '',
		saveType: SaveEnvironmentOption.createRevision,
		title: ''
    };

	get saveOptions(): IRadioOption[] {
		return [
			{
				value: SaveEnvironmentOption.createRevision,
				label: 'Create Revision',
				description: 'Create a Revision of this Environment Resource'
			},
			{
				value: SaveEnvironmentOption.newEnvironment,
				label: 'New Environment',
				description: 'Create a New Environment Resource'
			},
		];
	}
}
</script>

<style lang='scss'>
	.save-env-header {
		margin: 1.2rem 0;
	}
</style>