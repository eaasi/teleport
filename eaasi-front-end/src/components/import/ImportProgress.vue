<template>
	<div class="import-progress flex align-stretch">
		<div class="ip-content flex flex-adapt align-center padded">
			<p v-if="step <= 0">
				Import files to use them as a resource in EaaSI. You can choose to make a resource
				temporary—for only this session, saved to your node library for others to use
				and/or published to the node network.
			</p>
			<numbered-steps v-if="step > 0" :steps="steps" v-model="step" />
		</div>
		<div class="ip-actions flex flex-center">
			<div class="flex-center">
				<ui-button
					@click="doImport()"
					:disabled="step < 3"
					style="margin-right: 2rem;"
				>
					{{ nextButtonLabel }}
				</ui-button>
				<ui-button color-preset="light-blue" @click="reset">Cancel</ui-button>
			</div>
		</div>
		<task-modal
			v-if="activeTask"
			:task="activeTask"
			@close="activeTask = null"
			@success="onTaskComplete"
		/>
	</div>
</template>

<script lang="ts">
import { ImportType } from '@/types/Import';
import {importTypes, resourceTypes} from '@/utils/constants';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import EnvironmentImportResource from '@/models/import/EnvironmentImportResource';
import SoftwareImportResource from '@/models/import/SoftwareImportResource';
import { NumberedSteps, UiButton } from '@/components/global';
import { INumberedStep } from '@/types/NumberedStep';
import TaskModal from '@/components/admin/running-tasks/TaskModal.vue';
import EaasiTask from '@/models/task/EaasiTask';

	@Component({
		name: 'ImportProgress',
		components: {
			NumberedSteps,
			UiButton,
			TaskModal
		}
	})
	export default class ImportProgress extends Vue {

		/* Data
        ============================================*/

		steps: INumberedStep[] = [
			{
				stepNumber: 1,
				description: 'METADATA'
			},
			{
				stepNumber: 2,
				description: 'FILES'
			},
			{
				stepNumber: 3,
				description: 'FINISH'
			},
		];
		activeTask: EaasiTask = null;

		/* Computed
        ============================================*/

		@Sync('import/importStep')
		step: number;

		@Sync('import/importType')
		importType: ImportType;

		@Get('import/software')
		software: SoftwareImportResource;

		@Get('import/environment')
		environment: EnvironmentImportResource;

		@Get('import/environment@chosenTemplateId')
		chosenTemplateId:  string;

		@Sync('import/environment@eaasiID')
		environmentEaasiID: string;

		@Sync('import/environment@isUrlSource')
		isUrlSource: boolean;

		@Get('import/environment@isKvmEnabled')
		isKvmEnabled: boolean;

		@Get('import/environment@diskSize')
		diskSize: string;

		@Get('import/environment@chosenTemplateId')
		chosenTemplate: string;

		@Get('import/environment@nativeConfig')
		nativeConfig: string;

		@Get('import/environment@nativeFMTs')
		nativeFMTs: string;

		get nextButtonLabel() {
			if (this.step == this.steps.length) return 'Finish Import';
			return 'Next';
		}

		/* Methods
        ============================================*/

		/**
		 *  Starts the import process for Environment, Software, or Content resource(s)
		 **/
		async doImport() {
			let task = await this.$store.dispatch('import/import');
			if (!task) return;
			const activeTask = await this.$store.dispatch('task/addTaskToQueue', task);
			this.activeTask = activeTask;
		}

		reset() {
			this.$store.commit('import/RESET');
		}

		async onTaskComplete(taskResult: EaasiTask) {
			// Environment Import
			let contentType = resourceTypes.CONTENT.toLowerCase();
			let softwareType = resourceTypes.SOFTWARE.toLowerCase();
			if (this.importType === importTypes.ENVIRONMENT && taskResult.userData && taskResult.userData.environmentId) {
				// This path occurs when a user imports an Environment Object from URL
				// When an import task is complete, get the environmentId and push into Access Interface
				this.environmentEaasiID = taskResult.userData.environmentId;
				this.$router.push(`/access-interface/${this.environmentEaasiID}`);

			} else if (this.importType === contentType) {
				// This path occurs when a user uploads a Content Object
				this.$router.push({name: 'My Resources', params: {defaultTab: 'Imported Resources'}});

			} else if (this.importType === softwareType ) {
				// This path occurs when a user uploads a Software Object
				let objectId = taskResult.userData.objectId;

				await this.$store.dispatch('import/saveSoftwareObject', {
					allowedInstances: -1,
					archiveId: 'zero conf',
					exportFMTs: [],
					importFMTs: [],
					isOperatingSystem: false,
					label: this.software.title,
					licenseInformation: '',
					nativeFMTs: [],
					objectId: objectId
				});

				this.$router.push({name: 'My Resources', params: {defaultTab: 'Imported Resources'}});

			} else if (this.importType === importTypes.ENVIRONMENT) {
				// This path occurs when a user uploads an Environment Object

				// First, we get the ID of the 'Content' ISO Upload
				// And save it as a Software Object
				let objectId = taskResult.userData.objectId;

				let savePayload = {
					allowedInstances: -1,
					archiveId: 'zero conf',
					exportFMTs: [],
					importFMTs: [],
					isOperatingSystem: true, // We mark the ISO as an OS
					label: this.environment.title,
					licenseInformation: '',
					nativeFMTs: this.nativeFMTs ? this.nativeFMTs.split(',') : [],
					objectId: objectId
				};

				await this.$store.dispatch('import/saveSoftwareObject', savePayload);

				// Then we create an environment based on the user input
				let nativeConfig = this.nativeConfig;
				if (this.isKvmEnabled) nativeConfig += ' -enable-kvm';

				let res = await this.$store.dispatch('import/createEnvironment', {
					size: this.diskSize + 'M',
					nativeConfig: nativeConfig,
					templateId: this.chosenTemplateId
				});

				this.$router.push(`/access-interface/${res.id}?softwareId=${objectId}&archiveId=zero%20conf`);
			}
		}
	}

</script>

<style lang="scss">

	.import-progress {
		background-color: lighten($light-neutral, 60%);
		border: solid 2px darken($light-neutral, 10%);
		border-left: none;
		border-right: none;
		min-height: 10rem;
	}

	.ip-actions {
		background-color: lighten($light-neutral, 90%);
		flex: 0 0 $tipLaneWidth;
		> div {
			padding: $defaultScreenPadding;
		}
	}

	.ip-content {
		min-width: 0;
	}
</style>