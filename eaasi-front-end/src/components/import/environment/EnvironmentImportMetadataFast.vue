<template>
	<div class="environment-import-metadata-fast">
		<div class="row">
			<div class="col-md-12">
				<text-input
					label="Name"
					rules="required"
					placeholder="Enter a name or title for this resource"
					:readonly="readonly"
					v-model="title"
				/>
			</div>

			<div class="col-md-6">
				<select-list
					v-model="chosenTemplateId"
					class="no-mb flex-adapt"
					label="Choose a System"
					rules="required"
				>
					<option value="" selected disabled>Please Choose a System</option>
					<option
						v-for="template in availableTemplates"
						:key="template.id"
						:value="template.id"
					>
						{{ template.label }}
					</option>
				</select-list>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6">
				<text-input
					v-if="chosenTemplateId"
					readonly
					label="System Architecture"
					:value="chosenTemplateArchitecture"
				/>

				<text-input
					v-if="chosenTemplateId"
					readonly
					label="Emulator"
					:value="chosenTemplateEmulator"
				/>

				<text-input
					v-if="chosenTemplateId"
					:readonly="readonly"
					label="Config"
					v-model="nativeConfig"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Component, Prop, Watch } from 'vue-property-decorator';
	import { Get, Sync } from 'vuex-pathify';
	import { operatingSystems } from '@/models/admin/OperatingSystems';
import { ITemplate } from '../../../types/Import';

	@Component({
		name: 'EnvironmentImportMetadataFast',
	})
	export default class EnvironmentImportMetadataFast extends Vue {

		/* Props
        ============================================*/

		/**
		 * Pass-through as readonly attribute to all form fields
		 */
		@Prop({ type: Boolean, required: false })
		readonly readonly: boolean;

		/* Computed
        ============================================*/

		@Sync('import/environment@title')
		title: string;

		@Sync('import/environment@chosenTemplateId')
		chosenTemplateId: string;

		@Sync('import/environment@nativeConfig')
		nativeConfig: string;

		@Sync('resource/availableTemplates')
		availableTemplates: ITemplate[];

		@Sync('import/filesToUpload')
		filesToUpload: any[];

		get activeTemplate(): ITemplate {
			return this.availableTemplates.find(template => template.id === this.chosenTemplateId);
		}

		get chosenTemplateEmulator(): string {
			const { value } = this.activeTemplate.properties.find(prop => prop.name === 'EmulatorContainer');
			return value;
		}

		get chosenTemplateArchitecture(): string {
			const { value } = this.activeTemplate.properties.find(prop => prop.name === 'Architecture');
			return value;
		}

		/* Lifecycle Hooks
        ============================================*/
		async created() {
			await this.$store.dispatch('resource/getTemplates');
		}

		@Watch('activeTemplate')
		onActiveTemplate(nextTemplate: ITemplate, prevTemplate: ITemplate) {
			if (!prevTemplate || (nextTemplate && nextTemplate.id !== prevTemplate.id)) {
				this.nativeConfig = this.activeTemplate.native_config;
			}
		}
	}

</script>

<style lang="scss"></style>