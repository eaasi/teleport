<template>
	<div class="emulation-project-screen width-lg">
		<div class="emulation-project-page-heading">
			<div class="emulation-project-page-title">
				<h1>
					Emulation Project
				</h1>
			</div>
			<div class="emulation-project-heading-content">
				<div class="emulation-project-heading-content-text">
					Choose hardware and/or emulator settings, add imported or discovered resources, and run
					your emulation. Save a new resource from this project by using the RUN emulation interface.
				</div>
				<div class="emu-project-actions">
					<div class="emu-project-action">
						<ui-button
							color-preset="light-blue"
							@click="clearAllAlertModal=true"
							:disabled="clearAllDisabled"
						>
							Clear Project
						</ui-button>
					</div>
					<div class="emu-project-action">
						<ui-button :disabled="!canRunProject" @click="runEmulationProject">Run</ui-button>
					</div>
				</div>
			</div>
		</div>
		<div class="flex main-content">
			<div class="emulation-content flex-adapt">
				<router-view />
			</div>
			<div class="side-bar">
				<resource-side-bar />
			</div>
		</div>
		<confirm-modal
			v-if="clearAllAlertModal"
			title="Clear All Resources"
			confirm-label="Clear Project"
			@close="clearAllAlertModal=false"
			@click:cancel="clearAllAlertModal=false"
			@click:confirm="clear"
		>
			<p>
				Are you sure you want to clear all your resources that are attached to emulation project?
			</p>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import EmulationProjectOptions from './EmulationProjectOptions.vue';
import { Get, Sync } from 'vuex-pathify';
import { ICreateEnvironmentPayload } from '@/types/Import';
import { ROUTES } from '@/router/routes.const';
import { IEnvironment, IEaasiResource } from '@/types/Resource';
import ResourceSideBar from './ResourceSideBar.vue';
import ConfirmModal from '@/components/global/Modal/ConfirmModal.vue';
import { IEmulatorComponentRequest } from '@/types/Emulation';
import { IKeyboardSettings } from 'eaasi-admin';
import { buildAccessInterfaceQuery } from '@/helpers/AccessInterfaceHelper';
import { ITempEnvironmentRecord } from '@/types/Emulation';
import CreateBaseEnvModal from './base-environment/CreateBaseEnvModal.vue';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import eventBus from '@/utils/event-bus';
import { generateNotificationError } from '@/helpers/NotificationHelper';
import { jsonCopy } from '@/utils/functions';

@Component({
	name: 'EmulationProjectScreen',
	components : {
		EmulationProjectOptions,
		CreateBaseEnvModal,
		ConfirmModal,
		ResourceSideBar
	}
})
export default class EmulationProjectScreen extends Vue {
	private clearProjectErrorMessage = 'There was a problem clearing emulation project, please try again.';
	private retrieveEmulationProjectErrorMessage = 'There was a problem retrieving emulation project environment.';
	private temporaryEnvironmentCreateErrorMessage = 'There was a problem creating temporary environment resource.';
	private temporaryRecordErrorMessage = 'There was a problem creating temporary environment resource.';
	private noRemoteEnvironmentsErrorMessage = 'Emulation project does not support remote environments.';
	private troubleRetrievingErrorMessage = 'There was a problem retrieving emulation project environment.';

	/* Computed
	============================================*/
	@Sync('emulationProject/createEnvironmentPayload')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	@Sync('showLoader')
	showLoader: boolean;

	@Sync('emulationProject/selectedSoftwareId')
	selectedSoftwareId: string;

	@Sync('emulationProject/environment')
	environment: EmulationProjectEnvironment;

	@Sync('resource/activeEnvironment')
	activeEnvironment: IEnvironment;

	@Get('emulationProject/canRunProject')
	readonly canRunProject: boolean;

	@Get('emulationProject/projectEnvironments')
	environments: IEnvironment[];

	@Get('emulationProject/projectObjects')
	objects: IEaasiResource[];

	@Get('emulationProject/constructedFromBaseEnvironment')
	constructedFromBaseEnvironment: boolean;

	@Get('emulationProject/selectedObjects')
	selectedObjects: IEaasiResource[];

	get clearAllDisabled(): boolean {
		return this.environments.length === 0 && this.objects.length === 0;
	}

	/* Methods
	============================================*/
	clearAllAlertModal: boolean = false;

	/* Methods
	============================================*/
	async runEmulationProject() {
		try {
			const emulationProjectEnv = await this.prepareEmulationProject(this.environment);

			// Set newly create emulation project environment to active
			this.activeEnvironment = emulationProjectEnv;

			// refresh temporary environment lib
			await this.$store.dispatch('resource/refreshTempEnvs');

			// Route to access interface screen
			this.$router.push(this.buildQuery(emulationProjectEnv.envId));
		} catch(e) {
			this.handleError(e);
		}
	}

	private async prepareEmulationProject(env: EmulationProjectEnvironment): Promise<IEnvironment> {
		if (env.archive === 'public') {
			return await this.preparePublicEnvironment(env);
		} else if (env.archive === 'default') {
			return await this.preparePrivateEnvironment(env);
		}
		throw new Error(this.noRemoteEnvironmentsErrorMessage);
	}

	private buildQuery(envId: string) {
		return this.selectedObjects.length && !this.constructedFromBaseEnvironment
			? buildAccessInterfaceQuery({
				envId,
				archiveId: this.selectedObjects[0].archiveId,
				objectId: this.selectedObjects[0].id
			})
			: buildAccessInterfaceQuery({ envId });
	}

	async preparePublicEnvironment(environment: EmulationProjectEnvironment): Promise<IEnvironment> {
		const envCopy = jsonCopy<IEnvironment>(environment);
		// update the copy with emulation project properties
		let emuProjEnv: IEnvironment = this.prepareEnvironment(envCopy);
		const response = await this.$store.dispatch('resource/updateEnvironmentDetails', emuProjEnv);
		if (response.error) {
			throw new Error(response.error);
		}
		let emulationProjectEnv: IEnvironment =
			await this.$store.dispatch('resource/getEnvironment', response.id);
		if (!emulationProjectEnv) {
			throw new Error(this.troubleRetrievingErrorMessage);
		}
		const tempEnvRecord: ITempEnvironmentRecord =
			await this.$store.dispatch(
				'resource/addEnvironmentToTempArchive',
				{ environment: emulationProjectEnv.envId }
			);
		if (!tempEnvRecord) {
			throw new Error(this.temporaryEnvironmentCreateErrorMessage);
		}
		return emulationProjectEnv;
	}

	async preparePrivateEnvironment(environment: EmulationProjectEnvironment): Promise<IEnvironment> {

		const keyboardSettings: IKeyboardSettings =
			await this.$store.dispatch('admin/getKeyboardSettings');
		// add selected resources to the payload

		const payload: IEmulatorComponentRequest = {
			archive: environment.archive,
			emulatorVersion: 'latest',
			environment: environment.envId,
			keyboardLayout: keyboardSettings.language.name,
			keyboardModel: keyboardSettings.layout.name,
			type: 'machine' // TODO: Only have seen machine being type here, could there be another option?
		};

		// create a copy of active environment
		const tempEnvRecord: ITempEnvironmentRecord =
			await this.$store.dispatch('resource/createAndAddEnvironmenttoTempArchive', payload);
		if (!tempEnvRecord) {
			throw new Error(this.temporaryRecordErrorMessage);
		}

		let tempEnvironment: IEnvironment =
			await this.$store.dispatch('resource/getEnvironment', tempEnvRecord.envId);
		if (!tempEnvironment) {
			throw new Error(this.temporaryEnvironmentCreateErrorMessage);
		}

		// update the copy with emulation project properties
		let emuProjEnv: IEnvironment = this.prepareEnvironment(tempEnvironment);
		const { id, error } =
			await this.$store.dispatch('resource/updateEnvironmentDetails', emuProjEnv);

		if (error) {
			throw new Error(error);
		}

		let emulationProjectEnv: IEnvironment =
			await this.$store.dispatch('resource/getEnvironment', id);

		if (!emulationProjectEnv) {
			throw new Error(this.retrieveEmulationProjectErrorMessage);
		}

		return emulationProjectEnv;
	}

	async init() {
		this.showLoader = true;
		await this.$store.dispatch('emulationProject/loadProject');
		if (this.environments.length === 1) {
			this.environment = new EmulationProjectEnvironment(this.environments[0]);
			this.$router.push(ROUTES.EMULATION_PROJECT.DETAILS);
		}
		if (!this.environment) {
			this.$router.push(ROUTES.EMULATION_PROJECT.OPTIONS);
		}
		this.showLoader = false;
	}

	prepareEnvironment(env: IEnvironment): IEnvironment {
		let emulationProjectEnvironment: IEnvironment = {
			...env,
			drives: this.environment.drives.map(d => d.drive),
			driveSettings: this.environment.drives
		};
		if (this.constructedFromBaseEnvironment) {
			emulationProjectEnvironment.driveSettings.forEach(d => {
				let selectedObject = this.objects.find(o => o.id === d.objectId);
				if (selectedObject) d.objectArchive = selectedObject.archiveId;
			});
		}
		return emulationProjectEnvironment;
	}

	handleError(err: string) {
		eventBus.$emit('notification:show', generateNotificationError(err));
	}

	beforeMount() {
		this.init();
	}

	async clear() {
		this.clearAllAlertModal = false;
		const result = await this.$store.dispatch('emulationProject/clearAll');
		if (!result) {
			eventBus.$emit('notification:show', generateNotificationError(this.clearProjectErrorMessage));
		}
		this.createEnvironmentPayload = null;
		await this.$router.push(ROUTES.EMULATION_PROJECT.ROOT);
	}

}

</script>

<style lang="scss">
.emulation-project-screen {

	.emulation-project-page-heading {
		background: lighten($light-neutral, 80%);
		border-bottom: solid 3px lighten($light-neutral, 10%);
		padding: 3rem 3rem 1rem;
		.emulation-project-page-title {
			padding-bottom: 3px;
		}

		.emulation-project-heading-content {
			display: flex;
			line-height: 2rem;
			.emulation-project-heading-content-text {
				font-weight: 300;
				height: 100%;
			}
		}
	}

	.emu-project-actions {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 2rem;
	}

	.emu-project-action {
		margin: 0 1.2rem;
	}

	.main-content {
		height: 100%;
		margin-left: 0;
		margin-right: 0;

		.emulation-content {
			background-color: lighten($light-neutral, 60%);
			height: 100vh;
			padding: 3rem;
		}

		.side-bar {
			width: 39rem;
		}
	}
}
</style>