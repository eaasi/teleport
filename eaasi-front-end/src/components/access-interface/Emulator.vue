<template>
	<div>
		<section id="emulatorWrapper" ref="_wrapper">
			<!-- Do not change this div's ID, eaas-client looks for '#emulator-container' -->
			<div v-show="isStarted" ref="_container" id="emulator-container"></div>
		</section>
	</div>
</template>

<script lang="ts">
	import eventBus from '@/utils/event-bus';
	import Vue from 'vue';
	import config from '@/config';
	// noinspection TypeScriptCheckImport
	import { saveAs } from 'file-saver';
	// noinspection TypeScriptCheckImport
	import cookies from 'js-cookie';
	import { Component, Prop } from 'vue-property-decorator';
	import { IAppError } from '@/types/AppError';
	import { IEaasClient } from '@/types/Eaas';
	import { IEaasiResource, IEnvironment } from '@/types/Resource';
	import { Sync } from 'vuex-pathify';
	import { slugify } from '@/utils/functions';
	import StartEnvironmentParams from '@/models/eaas/emil/StartEnvironmentParams';
	import { INotification } from '@/types/Notification';
	import { generateId } from '@/utils/functions';
	import { getUserToken } from '@/utils/auth';

	import {
		EphemeralMachineComponentBuilder,
		ImageDataSource,
		MachineComponentBuilder,
		ObjectDataSource,
		SoftwareDataSource
	} from 'EaasClient/lib/componentBuilder';
	import { NetworkBuilder } from 'EaasClient/lib/networkBuilder';
	import { ROUTES } from '@/router/routes.const';
	import { ISaveEnvOptions } from '@/types/SaveEnvironment';
	import { SaveEnvironmentOption } from '@/types/SaveEnvironmentOption';
	import { ICreateEnvironmentPayload } from '@/types/Import';
	import {
		SaveNewEnvironmentRequest,
		SaveObjectEnvironmentRequest,
		SaveRevisionRequest
	} from 'EaasClient/lib/componentSession';

	/**
	 * Component contains screen in which an emulated environment is presented.
	 */
	@Component({
		name: 'Emulator'
	})
	export default class Emulator extends Vue {

		$refs!: {
			_wrapper: HTMLElement,
			_container: HTMLElement
		};

		/* Props
        ============================================*/

		@Prop({type: Object as () => IEnvironment, required: true})
		readonly environment: IEnvironment;

		@Prop({type: Object as () => ICreateEnvironmentPayload, required: true})
		readonly createEnvironmentPayload: ICreateEnvironmentPayload;

		@Prop({type: String, required: false})
		readonly driveId: string;

		/* Computed
        ============================================*/

		@Sync('showLoader')
		showLoader: boolean;

		@Sync('appError')
		error: IAppError;

		@Sync('emulatorIsRunning')
		isStarted: boolean;

		@Sync('resource/clientComponentId')
		clientComponentId: string;

		@Sync('emulationProject/selectedResourcesPerDrive')
		selectedResourcesPerDrive: IEaasiResource[][];

		/* Data
        ============================================*/

		//TODO: commented until BWFLA is imported
		//bwfla: IbwflaController = null;
		client: IEaasClient = null;
		timeOutTimer = null;
		clientReadyInterval = null;
		isStopping: boolean = false;

		/* Methods
        ============================================*/

		attachUserControls() {
			let vm = this;
			const activeSession = vm.client.getActiveSession();
			if (activeSession) {
				activeSession.setPointerLock();
			}
		}

		handleError(error: string | Error) {
			if (typeof error === 'string') {
				this.error = { message: error };
			} else if (typeof error === 'object') {
				this.error = error;
			} else {
				console.warn('handleError received:', error);
				this.error = {
					message: 'An unknown error has occurred. We apologize for the inconvenience.'
				};
			}
		}

		getKeyboardPreferences() {
			let prefs = cookies.getJSON('kbLayoutPrefs');
			if (!prefs) return null;
			return {
				keyboardLayout: prefs.language.name,
				keyboardModel: prefs.layout.name
			};
		}

		async getContainerOutput() {
			const activeSession = this.client.getActiveSession();
			if (activeSession) {
				let containerOutput = await fetch(await activeSession.getContainerResultUrl());
				let containerOutputBlob = await containerOutput.blob();
				let downloadLink = document.createElement('a');
				downloadLink.href = URL.createObjectURL(containerOutputBlob);
				downloadLink.download = 'output-data.zip';
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
			}
		};

		changeMedia(changeMediaRequest) {
			const activeSession = this.client.getActiveSession();
			if (activeSession) {
				activeSession.changeMedia(changeMediaRequest);
			}
		}

		async init() {
			let vm = this;
			try {
				let EaasClient = (window as any).EaasClient || null;
				if (!EaasClient) return;
				if (!vm.client) {
					await fetch(config.EMIL_SERVICE_ENDPOINT + '/EmilEnvironmentData/init');
					vm.client = new EaasClient.Client(config.EMIL_SERVICE_ENDPOINT, getUserToken);
				}
				//TODO: commented until BWFLA is imported
				/*if (!vm.bwfla) {
				  vm.bwfla = (window as any).BWFLA;
				}*/
				vm.setupListeners();
				vm.startEnvironment();

			} catch(e) {
				this.handleError(e);
			}
		}

		async startEnvironment() {
			let vm = this;
			this.showLoaderWithTimeout();
			try {
				let machine;
				if (vm.environment) {
					machine = new MachineComponentBuilder(
						vm.environment.envId,
						vm.environment.archive
					);
				} else if (vm.createEnvironmentPayload) {
					this.setResourcesToEnvironmentConfigDrives(vm.createEnvironmentPayload);
					machine = new EphemeralMachineComponentBuilder(
						vm.createEnvironmentPayload
					);
				}
				if (!machine) {
					throw new Error('Failed to initialize the machine component builder');
				}

				machine.setInteractive(true);

				const { softwareId, archiveId, objectId } = vm.$route.query;
				if (objectId) {
					machine.setObject(objectId, archiveId);
				} else if (softwareId) {
					machine.setSoftware(softwareId, archiveId);
				}
				this.setResourcesToDrives(machine);

				let components, clientOptions;
				if (vm.environment && vm.environment.enableInternet) {
					let networkBuilder = new NetworkBuilder(config.EMIL_SERVICE_ENDPOINT, getUserToken);
					networkBuilder.addComponent(machine);
					components =  await networkBuilder.getComponents();
					clientOptions =  await networkBuilder.getDefaultClientOptions();
					clientOptions.getNetworkConfig().enableInternet(true);
					clientOptions.getNetworkConfig().enableSlirpDhcp(true);
				} else if (vm.environment) {
					components = [machine];
					clientOptions = new StartEnvironmentParams(vm.environment);
				} else {
					components = [machine];
				}

				const keyboardPrefs = vm.getKeyboardPreferences();
				if (keyboardPrefs) {
					machine.setKeyboard(keyboardPrefs.keyboardLayout, keyboardPrefs.keyboardModel);
				}

				await vm.client.start(components, clientOptions);
				vm.isStarted = true;
				const container = vm.$refs._container;
				await vm.client.connect(container);
				vm.attachUserControls();
				const activeSession = vm.client.getActiveSession();
				this.clientComponentId = activeSession ? activeSession.getId() : null;
				this.setClientReadyTimeout();

				this.initPrintListeners();
			} catch(e) {
				vm.handleError(e);
			}
			vm.showLoader = false;
		}

		private setResourcesToEnvironmentConfigDrives(createEnvironmentPayload: ICreateEnvironmentPayload) {
			this.selectedResourcesPerDrive.forEach((resources, index) => {
				if (!resources || resources.length === 0) {
					return;
				}
				const resource = resources[0];
				switch (resource.resourceType) {
					case 'Software':
					case 'Content':
						createEnvironmentPayload.driveSettings[index].objectId = resource.id;
						createEnvironmentPayload.driveSettings[index].objectArchive = resource.archiveId || 'default';
						break;
					case 'Image':
						createEnvironmentPayload.driveSettings[index].imageId = resource.id;
						createEnvironmentPayload.driveSettings[index].imageArchive = resource.archiveId || 'default';
						break;
					default:
						break;
				}
			});
		}

		private setResourcesToDrives(machine: MachineComponentBuilder) {
			if (this.selectedResourcesPerDrive.length === 0) {
				return;
			}
			this.selectedResourcesPerDrive.forEach((resources, index) => {
				if (!resources || resources.length === 0) {
					return;
				}
				const resource = resources[0];
				switch (resource.resourceType) {
					case 'Software':
						machine.setDriveAssignment(index, new SoftwareDataSource(resource.id));
						break;
					case 'Content':
						machine.setDriveAssignment(index, new ObjectDataSource(resource.id, resource.archive));
						break;
					case 'Image':
						machine.setDriveAssignment(index, new ImageDataSource(resource.id));
						break;
					default:
						break;
				}
			});
		}

		private setClientReadyTimeout() {
			clearInterval(this.clientReadyInterval);
			this.clientReadyInterval = setInterval(() => {
				if (this.client.getActiveSession() && this.client.getActiveSession().getRemovableMediaList()) {
					eventBus.$emit('emulator:set-media', this.client.getActiveSession().getRemovableMediaList());
					clearInterval(this.clientReadyInterval);
				}
			}, 1000);
		}

		private showLoaderWithTimeout() {
			clearTimeout(this.timeOutTimer);
			this.showLoader = true;
			this.timeOutTimer = setTimeout(() => {
				if (this.showLoader) {
					const e = new Error('Connection timed out.');
					this.handleError(e);
					this.showLoader = false;
					clearTimeout(this.timeOutTimer);
				}
			}, config.TIME_OUT_DURATION);
		}

		async stopEnvironment() {
			clearInterval(this.clientReadyInterval);
			let vm = this;
			if (!vm.client || vm.isStopping) return;
			vm.isStopping = true;
			window.onbeforeunload = null;
			await vm.client.release();
			vm.isStopping = false;
			vm.isStarted = false;
		}

		async sendCtrlAltDelete() {
			if (!(window as any).EaasClient) return;
			await (window as any).EaasClient.sendCtrlAltDel();
		}

		async sendEscape() {
			if (!(window as any).EaasClient) return;
			await (window as any).EaasClient.sendEsc();
		}

		setupListeners() {
			let vm = this;
			vm.client.addEventListener('error',(err) => {
				if (err.detail !== 'STOPPED') {
					vm.handleError(err);
				}
			});
			window.onbeforeunload = () => ''; // Show generic browser warning
			window.onunload = () => vm.stopEnvironment();
			vm.client.onEmulatorStopped = () => {
				// @ts-ignore
				document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
				document.exitPointerLock();
				this.isStarted = false;
			};
		}

		takeScreenShot() {
			let canvas = document.querySelector('#emulatorWrapper canvas') as HTMLCanvasElement;
			if (!canvas) return;
			let envTitle = this.environment?.title || this.createEnvironmentPayload?.label;
			let filename = slugify(envTitle + '-screenshot-' + new Date().toLocaleString());
			canvas.toBlob(blob => saveAs(blob, filename));
		}

		saveEmulator() {
			console.log('TODO: saveEmulator');
		}

		async downloadPrintJob(label: string) {
			const activeSession = this.client.getActiveSession();
			if (activeSession) {
				// without getPrintJobs() call, downloadPrint() is not working as expected
				activeSession.getPrintJobs();
				const pdfUrl = activeSession.downloadPrint(label);
				window.open(pdfUrl);
			}
		}

		async saveEnvironmentImport({ description, title }) {  // TODO: arg will be object when metadata is ready
			let importData = {
				description,
				title,
				componentId: this.clientComponentId,
				environmentId: this.$route.params.envId
			};

			// TODO: Handle saveResult failure modes
			let saveResult = await this.$store.dispatch('import/saveEnvironmentImport', importData);

			if (saveResult) {
				await this.stopEnvironment();
			}

			this.$router.push({ name: 'My Resources', params: { defaultTab: 'Imported Resources'}});
		}

		async saveNewEnvironment(options: ISaveEnvOptions) {
			if (this.createEnvironmentPayload) {
				return;
			}

			let snapshotRequest;
			switch (options.saveType) {
				case SaveEnvironmentOption.newEnvironment:
					snapshotRequest = new SaveNewEnvironmentRequest(options.title, options.description);
					break;
				case SaveEnvironmentOption.objectEnvironment:
					snapshotRequest = new SaveObjectEnvironmentRequest(options.title, options.description);
					break;
				case SaveEnvironmentOption.createRevision:
					snapshotRequest = new SaveRevisionRequest(options.description);
					break;
				default:
					break;
			}
			if (!snapshotRequest) {
				return;
			}

			snapshotRequest.removeVolatileDrives(options.saveType != SaveEnvironmentOption.objectEnvironment);
			let task = await this.client.getActiveSession().createSnapshot(snapshotRequest);
			if (!task) {
				return;
			}
			await this.$store.dispatch('task/addTaskToQueue', task);
		}

		async saveEphemeralEnvironment(options: ISaveEnvOptions) {
			const environment = await this.$store.dispatch('emulationProject/saveBaseEnvironmentFromEmulator', { label: options.title });
			this.$router.push(`${ROUTES.RESOURCES.ENVIRONMENT}?resourceId=${environment.envId}`);
		}

		async saveSnapshot(options: ISaveEnvOptions) {
			if (this.createEnvironmentPayload) {
				await this.saveEphemeralEnvironment(options);
			} else {
				await this.saveNewEnvironment(options);
			}
		}

		initBusListeners() {
			eventBus.$on('emulator:save', () => this.saveEmulator());
			eventBus.$on('emulator:saveEnvironmentImport', (importDetails) => this.saveEnvironmentImport(importDetails));
			eventBus.$on('emulator:takeScreenshot', () => this.takeScreenShot());
			eventBus.$on('emulator:send:escape', () => this.sendEscape());
			eventBus.$on('emulator:send:ctrlAltDelete', () => this.sendCtrlAltDelete());
			eventBus.$on('emulator:change-media', (changeMediaRequest) => this.changeMedia(changeMediaRequest));
			eventBus.$on('emulator:print:download-print-job', (label: string) => this.downloadPrintJob(label));
			eventBus.$on('emulator:saveSnapshot', (options: ISaveEnvOptions) => this.saveSnapshot(options));
		}

		initPrintListeners() {
			this.client.addEventListener('print-job', e => {
				//@ts-ignore
				var res = JSON.parse(e.data);
				let notification: INotification = {
					label: `Print job has failed: ${res.filename}`,
					time: 5000,
					type: 'danger',
					id: generateId()
				};
				if (res.status === 'done') {
					notification.label = `Print job has been completed successfully: ${res.filename}`;
					notification.type = 'success';
					eventBus.$emit('emulator:print:add-print-job', res.filename);
				}
				eventBus.$emit('notification:show', notification);
			});
		}

		removeBusListeners() {
			eventBus.$off('emulator:save');
			eventBus.$off('emulator:saveEnvironmentImport');
			eventBus.$off('emulator:takeScreenshot');
			eventBus.$off('emulator:send:escape');
			eventBus.$off('emulator:send:ctrlAltDelete');
			eventBus.$off('emulator:print:download-print-job');
			eventBus.$off('emulator:saveSnapshot');
		}

		/* Lifecycle Hooks
        ============================================*/

		async mounted() {
			await this.init();
			this.initBusListeners();
		}

		async beforeDestroy() {
			await this.stopEnvironment();
			this.removeBusListeners();
			this.isStarted = false;
			this.selectedResourcesPerDrive = [];
		}

	}
</script>

<style lang="scss">
	#emulatorWrapper {
		display: inline-block;

		#emulator-container {
			display: inline-block;
		}

		canvas {
			/* stylelint-disable declaration-no-important */
			z-index: 1 !important; // Override z-index: -1 given by eaas-client
		}
	}

	.emulator-actions {
		background-color: darken($teal, 80%);
		margin: 0 auto 2rem;
		padding: 1.2rem 2rem 2rem;
		width: 50rem;

		.header {
			color: darken($teal, 50%);
			padding-bottom: 1rem;
			text-align: left;
		}
	}

</style>
