<template>
	<div class="emulation-project-screen width-lg">
		<view-header title="Emulation Project">
			<div class="head-text">
				Choose hardware and/or emulator settings, add imported or discovered resources, and run
				your emulation. Save a new resource from this project by using the RUN emulation interface.
			</div>
			<template v-slot:actions>
				<div class="emu-project-actions">
					<div class="emu-project-action">
						<ui-button color-preset="light-blue" @click="clear">
							Clear Project
						</ui-button>
					</div>
					<div class="emu-project-action">
						<ui-button :disabled="!canRunProject" @click="run">Run</ui-button>
					</div>
				</div>
			</template>
		</view-header>
		<div class="flex main-content">
			<div class="emulation-content flex-adapt">
				<router-view />
			</div>
			<div class="side-bar">
				<resource-side-bar />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import EmulationProjectOptions from './EmulationProjectOptions.vue';
import { Get, Sync } from 'vuex-pathify';
import { ICreateEnvironmentPayload, ICreateEnvironmentResponse } from '../../types/Import';
import { ROUTES } from '../../router/routes.const';
import { IEnvironmentList, IEnvironment } from '../../types/Resource';
import ResourceSideBar from './ResourceSideBar.vue';
import { IEmulatorComponentRequest } from '@/types/Emulation';
import { IKeyboardSettings } from 'eaasi-admin';
import { buildAccessInterfaceQuery } from '@/helpers/AccessInterfaceHelper';
import { IEmulationProject, ITempEnvironmentRecord } from '../../types/Emulation';
import CreateBaseEnvModal from './base-environment/CreateBaseEnvModal.vue';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import { Route } from 'vue-router/types/router';

@Component({
	name: 'EmulationProjectScreen',
	components : {
		EmulationProjectOptions,
		CreateBaseEnvModal,
		ResourceSideBar
	}
})
export default class EmulationProjectScreen extends Vue {

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

	get isReadyToRun(): boolean {
		return !!this.selectedSoftwareId && !!this.createEnvironmentPayload.templateId;
	}

	/* Methods
	============================================*/
	async run() {
		const { path } = this.$route;
		switch (path) {
			case ROUTES.EMULATION_PROJECT.CREATE_BASE_ENVIRONMENT:
				return await this.runBaseEnvironment();
				break;
			case ROUTES.EMULATION_PROJECT.DETAILS:
				return await this.runEmulationProject();
				break;
		}
	}

	async runBaseEnvironment() {
		const response: ICreateEnvironmentResponse = await this.$store.dispatch('emulationProject/createEnvironment', this.createEnvironmentPayload);
		if (response.status === '0') {
			this.environment.envId = response.id;
		}
		let route = `${ROUTES.ACCESS_INTERFACE}/${response.id}`;
		if (this.selectedSoftwareId) {
			route += `?softwareId=${this.selectedSoftwareId}&archiveId=zero%20conf&createBaseEnvironment=true`;
		}
		// @ts-ignore
		let environment: IEnvironment = {
			archive: 'default',
			envId: response.id,
		};

		this.activeEnvironment = environment;

		this.$router.push(route);
	}

	async runEmulationProject() {
		const keyboardSettings: IKeyboardSettings = await this.$store.dispatch('admin/getKeyboardSettings');
		// add selected resources to the payload
		const payload: IEmulatorComponentRequest = {
			archive: this.environment.archive,
			emulatorVersion: 'latest',
			environment: this.environment.envId,
			keyboardLayout: keyboardSettings.language.name,
			keyboardModel: keyboardSettings.layout.name,
			type: 'machine' // TODO: Only have seen machine being type here, could there be another option?
		};
		// create a copy of active environment
		const tempEnvRecord: ITempEnvironmentRecord = await this.$store.dispatch('resource/addEnvironmentToTempArchive', payload);
		let tempEnvironment: IEnvironment = await this.$store.dispatch('resource/getEnvironment', tempEnvRecord.envId);
		// update the copy with emulation project properties
		const emulationProjectEnv = await this.$store.dispatch('resource/updateEnvironmentDetails', tempEnvironment);
		this.activeEnvironment = tempEnvironment;
		await this.$store.dispatch('resource/refreshTempEnvs');
		// Route to access interface screen
		this.$router.push(buildAccessInterfaceQuery({ envId: tempEnvironment.envId }));
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

	beforeMount() {
		this.init();
	}

	clear() {
		this.$store.commit('emulationProject/RESET');
		this.$router.push(ROUTES.EMULATION_PROJECT.ROOT);
	}

}

</script>

<style lang="scss">
.emulation-project-screen {
	height: 100%;

	.vh-sub-section,
	.vh-description {
		background-color: lighten($light-neutral, 80%);
	}

	.vh-title {
		box-shadow: none;
	}

	.vh-description {
		padding: 0 20rem 1rem 1.4rem;
		width: auto;
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

	.header-text {
		font-size: 1.6rem;
		height: 100%;
	}

	.main-content {
		height: 100%;
		margin-left: 0;
		margin-right: 0;

		.emulation-content {
			background-color: lighten($light-neutral, 60%);
			padding: 3rem;
		}

		.side-bar {
			width: 39rem;
		}
	}
}
</style>