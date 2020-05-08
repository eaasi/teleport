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
import { ROUTES } from '../../router/routes.const';
import { IUserImportRelationRequest, IUserImportedResource } from '../../types/UserImportRelation';
import { IEaasiUser } from 'eaasi-admin';
import { generateNotificationError, generateCompletedNotificationWithMessage, generateNotificationSuccess } from '../../helpers/NotificationHelper';
import eventBus from '../../utils/event-bus';
import { ITaskState } from '../../types/Task';
import ContentImportResource from '../../models/import/ContentImportResource';

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

		@Get('loggedInUser')
		loggedInUser: IEaasiUser;

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
			if (this.importType === importTypes.ENVIRONMENT) {
				this.$store.commit('import/SET_IS_CONSTRUCTED_ENVIRONMENT', true);
			}
			let task = await this.$store.dispatch('import/import');
			if (!task) return;
			let resourceName = '';
			if (this.importType === importTypes.ENVIRONMENT) {
				resourceName = this.environment.title;
			} else if (this.importType === importTypes.SOFTWARE) {
				resourceName = this.software.title;
			} else if (this.importType === importTypes.CONTENT) {
				resourceName = this.content.title;
			}
			const taskWithDescription: ITaskState = {...task, description: `Import ${this.importType}: ${resourceName}`};
			this.activeTask = await this.$store.dispatch('task/addTaskToQueue', taskWithDescription);
		}

		reset() {
			this.$store.commit('import/RESET');
		}

		async onTaskComplete(taskResult: ITaskState) {
			const { environmentId, objectId } = taskResult.userData;
			if (environmentId || objectId) {
				this.scheduleNotificationFailure('Someting went wrong during import, please try again.');
			}
			
			switch(this.importType) {
				case importTypes.ENVIRONMENT:
					if (environmentId) {
						// This path occurs when a user imports an Environment Object from URL
						// When an import task is complete, get the environmentId and push into Access Interface
						await this.onImportEnvFromURLTask(environmentId);
					}
					// This path occurs when a user uploads an Environment Object
					// First, we get the ID of the 'Content' ISO Upload
					// And save it as a Software Object
					await this.onImportEnvObjectTask(objectId);
					break;
				case importTypes.CONTENT:
					this.onImportContentTask(objectId);
					break;
				case importTypes.SOFTWARE:
					// This path occurs when a user uploads a Software Object
					this.onImportSoftwareTask(objectId);
					break;
			}
		}

		async onImportEnvFromURLTask(environmentId: string) {
			this.environmentEaasiID = environmentId;
			this.userImportRequest.resourceId = environmentId;
			this.userImportRequest.resourceType = resourceTypes.ENVIRONMENT;
			const { eaasiID }: IUserImportedResource = await this.$store.dispatch('import/createUserImportRelation', this.userImportRequest);
			this.notifyUserOnImportedResource(eaasiID, importTypes.ENVIRONMENT);
			this.$router.push(`${ROUTES.ACCESS_INTERFACE}/${this.environmentEaasiID}`);
		}

		async onImportEnvObjectTask(objectId: string) {
			let savePayload = {
				allowedInstances: -1,
				archiveId: 'zero conf',
				exportFMTs: [],
				importFMTs: [],
				isOperatingSystem: true, // We mark the ISO as an OS
				label: this.environment.title,
				licenseInformation: '',
				nativeFMTs: this.nativeFMTs ? this.nativeFMTs.split(',') : [],
				objectId
			};
			const savedSoftwareObject = await this.$store.dispatch('import/saveSoftwareObject', savePayload);

			this.userImportRequest.resourceId = objectId;
			this.userImportRequest.resourceType = resourceTypes.SOFTWARE;
			const importedSoftware = await this.$store.dispatch('import/createUserImportRelation', this.userImportRequest);
			this.notifyUserOnImportedResource(importedSoftware.eaasiID, importTypes.CONTENT);

			// Then we create an environment based on the user input
			let nativeConfig = this.nativeConfig;
			if (this.isKvmEnabled) nativeConfig += ' -enable-kvm';

			let { id } = await this.$store.dispatch('import/createEnvironment', {
				size: this.diskSize + 'M',
				nativeConfig: nativeConfig,
				templateId: this.chosenTemplateId
			});

			this.userImportRequest.resourceId = id;
			this.userImportRequest.resourceType = resourceTypes.ENVIRONMENT;
			const environmentResponse = await this.$store.dispatch('import/createUserImportRelation', this.userImportRequest);
			
			this.notifyUserOnImportedResource(environmentResponse.eaasiID, importTypes.ENVIRONMENT);
			
			this.$router.push(`${ROUTES.ACCESS_INTERFACE}/${id}?softwareId=${objectId}&archiveId=zero%20conf`);
		}

		async onImportContentTask(objectId: string) {
			this.userImportRequest.resourceId = objectId;
			this.userImportRequest.resourceType = resourceTypes.CONTENT;
			const { eaasiID } = await this.$store.dispatch('import/createUserImportRelation', this.userImportRequest);
			this.notifyUserOnImportedResource(eaasiID, importTypes.CONTENT);
			// This path occurs when a user uploads a Content Object
			this.$router.push({ name: 'My Resources', params: { defaultTab: 'Imported Resources' }});
		}

		async onImportSoftwareTask(objectId: string) {
			await this.$store.dispatch('import/saveSoftwareObject', {
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

			this.userImportRequest.resourceId = objectId;
			this.userImportRequest.resourceType = resourceTypes.SOFTWARE;
			const { eaasiID } = await this.$store.dispatch('import/createUserImportRelation', this.userImportRequest);
			this.notifyUserOnImportedResource(eaasiID, importTypes.SOFTWARE);
			
			this.$router.push({ name: 'My Resources', params: { defaultTab: 'Imported Resources' } });
		}

		notifyUserOnImportedResource(resourceId: string, importType: ImportType) {
			resourceId != null
				? this.scheduleNotificationSuccess(`${importType} has been successfully imported to "My Resources"`)
				: this.scheduleNotificationFailure(`Having troubles importing requested ${importType}.`);
		}

		scheduleNotificationFailure(message: string) {
			const notif = generateNotificationError(message);
			eventBus.$emit('notificaiton:show', notif);
		}

		scheduleNotificationSuccess(message: string) {
			const notif = generateNotificationSuccess(message);
			eventBus.$emit('notificaiton:show', notif);
		}

		mounted() {
			this.userImportRequest = {
				userId: this.loggedInUser.id,
				resourceId: null,
				resourceType: null
			};
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