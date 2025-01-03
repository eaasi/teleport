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
				<ui-button color-preset="white" @click="reset">Cancel</ui-button>
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
import { ROUTES } from '@/router/routes.const';
import { IUserImportRelationRequest } from '@/types/UserImportRelation';
import { generateNotificationError, generateNotificationSuccess } from '@/helpers/NotificationHelper';
import eventBus from '@/utils/event-bus';
import { ITaskState } from '@/types/Task';
import ContentImportResource from '@/models/import/ContentImportResource';
import { IEnvironment, ResourceType } from '@/types/Resource';

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
		userImportRequest: IUserImportRelationRequest = null;

		/* Computed
        ============================================*/

		@Sync('import/importStep')
		step: number;

		@Sync('import/importType')
		importType: ImportType;

		@Get('import/software')
		software: SoftwareImportResource;

		@Get('import/content')
		content: ContentImportResource;

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

		@Sync('resource/activeEnvironment')
		activeEnvironment: IEnvironment;

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
			/*let resourceName = '';
			if (this.importType === importTypes.IMAGE) {
				resourceName = this.environment.title;
			} else if (this.importType === importTypes.SOFTWARE) {
				resourceName = this.software.title;
			} else if (this.importType === importTypes.CONTENT) {
				resourceName = this.content.title;
			}
			const taskWithDescription: ITaskState = {
				...task,
				description: `Import ${this.importType}: ${resourceName}`
			};*/
			this.activeTask = await this.$store.dispatch('task/addTaskToQueue', task);
		}

		reset() {
			this.$store.commit('import/RESET');
		}

		async onTaskComplete(taskResult: ITaskState) {
			const responseData = this.parseUserData(taskResult.userData);
			const { imageId, objectId } = responseData;
			if (!imageId && !objectId) {
				this.scheduleNotificationFailure('Something went wrong during import, please try again.');
			}
			switch(this.importType) {
				case importTypes.IMAGE:
					await this.onImportImage(imageId);
					break;
				case importTypes.CONTENT:
					await this.onImportContentTask(objectId);
					break;
				case importTypes.SOFTWARE:
					// This path occurs when a user uploads a Software Object
					await this.onImportSoftwareTask(objectId);
					break;
			}
		}

		private parseUserData(userData: string | object) {
			if (!userData) return {};
			return typeof userData  === 'string' ? JSON.parse(userData) : userData;
		}

		async onImportImage(imageId: string) {
			this.notifyUserOnImportedResource(imageId, resourceTypes.CONTENT);
			await this.$router.push({
				name: 'My Resources',
				params: { defaultTab: 'Imported Resources' }}
			);
		}

		async onImportContentTask(objectId: string) {
			await this.notifyUserOnImportedResource(objectId, resourceTypes.CONTENT);
			// This path occurs when a user uploads a Content Object
			await this.$router.push({
				name: 'My Resources',
				params: { defaultTab: 'Imported Resources' }}
			);
		}

		async onImportSoftwareTask(objectId: string) {
			const result = await this.$store.dispatch('import/saveSoftwareObject', {
				allowedInstances: -1,
				archiveId: 'zero conf',
				exportFMTs: [],
				importFMTs: [],
				isOperatingSystem: false,
				label: this.software.title,
				licenseInformation: '',
				nativeFMTs: [],
				objectId
			});

			await this.notifyUserOnImportedResource(objectId, resourceTypes.SOFTWARE);

			await this.$router.push({
				name: 'My Resources',
				params: { defaultTab: 'Imported Resources' }}
			);
		}

		notifyUserOnImportedResource(resourceId: string, resourceType: ResourceType) {
			resourceId != null
				? this.scheduleNotificationSuccess(`${resourceType} has been successfully imported to "My Resources"`)
				: this.scheduleNotificationFailure(`Having troubles importing requested ${resourceType}.`);
		}

		scheduleNotificationFailure(message: string) {
			const notification = generateNotificationError(message);
			eventBus.$emit('notification:show', notification);
		}

		scheduleNotificationSuccess(message: string) {
			const notification = generateNotificationSuccess(message);
			eventBus.$emit('notification:show', notification);
		}

		mounted() {
			this.userImportRequest = {
				resourceId: null,
				resourceType: null
			};
		}

	}

</script>

<style lang="scss">

	.import-progress {
		background-color: $medium-grey;
		border-left: none;
		border-right: none;
		min-height: 10rem;
	}

	.ip-actions {
		flex: 0 0 $tipLaneWidth;
		> div {
			padding: $defaultScreenPadding;
		}
	}

	.ip-content {
		min-width: 0;
	}

	@media screen and (max-width: 1050px) {
		.import-progress {
			flex-direction: column;

			.padded {
				padding: 15px;
			}
			
			.ip-actions {
				flex:1;
			}
		}
	}
</style>