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
						<ui-button color-preset="light-blue" @click="clear">Clear Project</ui-button>
					</div>
					<div class="emu-project-action">
						<ui-button :disabled="canRunProject">Run</ui-button>
					</div>
				</div>
			</template>
		</view-header>
		<div class="row main-content">
			<div class="col-md-9 emulation-content">
				<router-view />
			</div>
			<div class="col-md-3 side-bar">
				<resource-side-bar />
			</div>
		</div>
		<!-- <div class="emu-project-content padded">
			<div>
				<section-heading title="Base Environment" icon="fa-box" />
				<new-base-environment-wizard />
			</div>
		</div> -->
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

@Component({
	name: 'EmulationProjectScreen',
	components : {
		EmulationProjectOptions,
		ResourceSideBar
	}
})
export default class EmulationProjectScreen extends Vue {

	@Sync('emulationProject/createEnvironmentPayload')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	@Sync('emulationProject/selectedSoftwareId')
	selectedSoftwareId: string;

	@Sync('emulationProject/environment')
	environment: IEnvironment;

	@Sync('resource/activeEnvironment')
	activeEnvironment: IEnvironment;

	@Get('emulationProject/canRunProject')
	readonly canRunProject: boolean;

	get isReadyToRun(): boolean {
		return !!this.selectedSoftwareId && !!this.createEnvironmentPayload.size && !!this.createEnvironmentPayload.templateId;
	}

	async run() {
		this.createEnvironmentPayload.size += 'M';
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
			padding: 0;
		}
	}
}
</style>