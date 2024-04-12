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
						<ui-button :disabled="!canRunProject" @click="runEmulationProject">Run project</ui-button>
					</div>
					<div class="emu-project-action">
						<ui-button :disabled="!canSaveProject" @click="openSaveEnvironmentModal">Save project</ui-button>
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
		<save-environment-modal
			v-if="isOpenSaveEnvironmentModal"
			@save="saveEmulationProject"
			@close="closeSaveEnvironmentModal"
		/>
	</div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import EmulationProjectOptions from './EmulationProjectOptions.vue';
import {Get, Sync} from 'vuex-pathify';
import {ICreateEnvironmentPayload} from '@/types/Import';
import {ROUTES} from '@/router/routes.const';
import {IEaasiResource, IEnvironment} from '@/types/Resource';
import {getResourceArchiveId, getResourceId} from '@/helpers/ResourceHelper';
import ResourceSideBar from './ResourceSideBar.vue';
import ConfirmModal from '@/components/global/Modal/ConfirmModal.vue';
import {buildAccessInterfaceQuery} from '@/helpers/AccessInterfaceHelper';
import CreateBaseEnvModal from './base-environment/CreateBaseEnvModal.vue';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import eventBus from '@/utils/event-bus';
import {generateNotificationError} from '@/helpers/NotificationHelper';
import {EmulationProjectMode} from '@/types/EmulationProject';
import SaveEnvironmentModal from '@/components/emulation-project/SaveEnvironmentModal.vue';

@Component({
	name: 'EmulationProjectScreen',
	components : {
		EmulationProjectOptions,
		CreateBaseEnvModal,
		ConfirmModal,
		ResourceSideBar,
		SaveEnvironmentModal
	}
})
export default class EmulationProjectScreen extends Vue {
	private clearProjectErrorMessage = 'There was a problem clearing emulation project, please try again.';
	private retrieveEmulationProjectErrorMessage = 'There was a problem retrieving emulation project environment.';
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

	@Get('emulationProject/canRunProject')
	readonly canRunProject: boolean;

	@Get('emulationProject/canSaveProject')
	readonly canSaveProject: boolean;

	@Get('emulationProject/projectEnvironments')
	environments: IEnvironment[];

	@Get('emulationProject/projectObjects')
	objects: IEaasiResource[];

	@Get('emulationProject/projectImages')
	images: IEaasiResource[];

	@Get('emulationProject/constructedFromBaseEnvironment')
	constructedFromBaseEnvironment: boolean;

	@Get('emulationProject/selectedObjects')
	selectedObjects: IEaasiResource[];

	@Get('emulationProject/mode')
	mode: EmulationProjectMode;

	isOpenSaveEnvironmentModal: boolean = false;

	get clearAllDisabled(): boolean {
		return this.environments.length === 0 && this.objects.length === 0 && this.images.length === 0;
	}

	/* Methods
	============================================*/
	clearAllAlertModal: boolean = false;

	/* Methods
	============================================*/
	async runEmulationProject() {
		try {
			const emulationProjectEnv = this.environment ? await this.prepareEmulationProject(this.environment) : null;

			// Set newly create emulation project environment to active
			this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', emulationProjectEnv);
			this.$store.commit('resource/SET_ACTIVE_EPHEMERAL_ENVIRONMENT', this.createEnvironmentPayload);

			// Route to access interface screen
			this.$router.push(this.buildQuery(emulationProjectEnv?.envId));
		} catch(e) {
			this.handleError(e);
		}
	}

	openSaveEnvironmentModal() {
		this.isOpenSaveEnvironmentModal = true;
	}

	closeSaveEnvironmentModal() {
		this.isOpenSaveEnvironmentModal = false;
	}

	async saveEmulationProject(label: string) {
		try {
			const environment = await this.$store.dispatch('emulationProject/saveBaseEnvironment', { label });
			this.$router.push(`${ROUTES.RESOURCES.ENVIRONMENT}?resourceId=${environment.envId}`);
			this.closeSaveEnvironmentModal();
		} catch (e) {
			this.handleError(e);
		}
	}

	private async prepareEmulationProject(emuProjectEnv: EmulationProjectEnvironment): Promise<IEnvironment> {
		// just use selected environment as-is, without modifications
		const id = emuProjectEnv.envId;
		const environment: IEnvironment = await this.$store.dispatch('resource/getEnvironment', id);
		if (!environment) {
			throw new Error(this.troubleRetrievingErrorMessage);
		}

		return environment;
	}

	private buildQuery(envId: string) {
		return this.selectedObjects.length && !this.constructedFromBaseEnvironment
			? buildAccessInterfaceQuery({
				envId,
				archiveId: getResourceArchiveId(this.selectedObjects[0]),
				objectId: getResourceId(this.selectedObjects[0])
			})
			: buildAccessInterfaceQuery({ envId });
	}

	async init() {
		this.showLoader = true;
		await this.$store.dispatch('emulationProject/loadProject');
		/*if (this.environments.length === 1) {
			this.environment = new EmulationProjectEnvironment(this.environments[0]);
			this.$router.push(ROUTES.EMULATION_PROJECT.DETAILS);
		}
		if (!this.environment) {
			this.$router.push(ROUTES.EMULATION_PROJECT.OPTIONS);
		}*/
		this.$router.push(ROUTES.EMULATION_PROJECT.OPTIONS);
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
		await this.$router.push(ROUTES.EMULATION_PROJECT.ROOT);
	}

}

</script>

<style lang="scss">
.emulation-project-screen {
	min-height: 100%;

	.emulation-project-page-heading {
		background: lighten($light-neutral, 80%);
		border-bottom: solid 3px lighten($light-neutral, 10%);
		padding: 3rem 1.8rem;
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
		gap: 1.8rem;
		margin-left: 3rem;
	}

	.main-content {
		height: 100%;
		margin-left: 0;
		margin-right: 0;

		.emulation-content {
			background-color: lighten($light-neutral, 60%);
			min-height: 100vh;
			padding: 3rem;
		}

		.side-bar {
			width: 39rem;
		}
	}
}
</style>