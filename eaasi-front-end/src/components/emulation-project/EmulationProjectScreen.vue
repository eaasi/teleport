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
						<ui-button :disabled="!canRunProject" @click="run">Run</ui-button>
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
import { IEmulatorComponentRequest } from '@/types/EmulationProject';
import { IKeyboardSettings } from 'eaasi-admin';
import { buildAccessInterfaceQuery } from '@/helpers/AccessInterfaceHelper';
import { IEmulationProject, ITempEnvironmentRecord } from '../../types/Emulation';

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

	async runEmulationProject() { 
		// TODO: test env dummy json needs to be removed
		const testEnv: IEnvironment = JSON.parse('{"networking":{"enableInternet":false,"serverMode":false,"localServerMode":false,"enableSocks":false,"serverPort":"","serverIp":"","connectEnvs":false,"helpText":""},"envId":"6b4c9691-b5d3-4f76-ac92-6541b0bdee0d","title":"Alpine base test save after import","description":"test","emulator":"Qemu","enableRelativeMouse":false,"enablePrinting":false,"shutdownByOs":false,"timeContext":"1589924959722","canProcessAdditionalFiles":false,"archive":"default","owner":"shared","envType":"base","revisions":[],"installedSoftwareIds":[],"nativeConfig":"-m 1024 -soundhw ac97 -net nic,model=rtl8139 -net user -usb -usbdevice tablet","useXpra":false,"useWebRTC":false,"drives":[{"data":"binding://main_hdd","iface":"ide","bus":"0","unit":"0","type":"disk","boot":true,"plugged":true},{"data":"","iface":"ide","bus":"0","unit":"1","type":"cdrom","filesystem":"ISO","boot":false,"plugged":false},{"data":"","iface":"floppy","bus":"0","unit":"0","type":"floppy","filesystem":"fat12","boot":false,"plugged":false}],"timestamp":"2020-05-19T21:49:23.069Z","isLinuxRuntime":false,"isServiceContainer":false,"resourceType":"Environment"}');
		this.environment = testEnv;
		const keyboardSettings: IKeyboardSettings = await this.$store.dispatch('admin/getKeyboardSettings');
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
		console.log(tempEnvRecord, tempEnvironment);
		tempEnvironment.title += ' [TMP]';
		// update the copy with emulation project properties
		const emulationProjectEnv = await this.$store.dispatch('resource/updateEnvironmentDetails', tempEnvironment);

		this.activeEnvironment = tempEnvironment;

		// Route to access interface screen
		this.$router.push(buildAccessInterfaceQuery(tempEnvironment.envId));
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