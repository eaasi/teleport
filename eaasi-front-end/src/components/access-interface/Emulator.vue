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
	import { IEaasClient, IbwflaController } from '@/types/Eaas';
	import { IEnvironment } from '@/types/Resource';
	import { Sync } from 'vuex-pathify';
	import { slugify } from '@/utils/functions';
	import MachineComponentRequest from '@/models/eaas/emil/MachineComponentRequest';
	import StartEnvironmentParams from '@/models/eaas/emil/StartEnvironmentParams';
import { INotification } from '../../types/Notification';
import { generateId } from '@/utils/functions';

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

		@Prop({type: String, required: false})
		readonly driveId: string;

		/* Computed
        ============================================*/

		@Sync('showLoader')
		loading: boolean;

		@Sync('appError')
		error: IAppError;

		@Sync('emulatorIsRunning')
		isStarted: boolean;

		@Sync('resource/clientComponentId')
		clientComponentId: string;

		/* Data
        ============================================*/

		bwfla: IbwflaController = null;
		client: IEaasClient = null;
		isStopping: boolean = false;

		/* Methods
        ============================================*/

		attachUserControls() {
			let vm = this;
			if (!vm.bwfla) return;
			if (vm.client.params.pointerLock === 'true') {
				vm.bwfla.requestPointerLock(vm.client.guac.getDisplay().getElement(), 'click');
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
			let containerOutput = await fetch(this.client.getContainerResultUrl());
			let containerOutputBlob = await containerOutput.blob();
			let downloadLink = document.createElement('a');
			downloadLink.href = URL.createObjectURL(containerOutputBlob);
			downloadLink.download = 'output-data.zip';
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		};

		changeMedia(changeMediaRequest) {
			this.client.changeMedia(changeMediaRequest, () => {});
		}

		async init() {
			let vm = this;
			try {
				let container = vm.$refs._container;
				let EaasClient = (window as any).EaasClient || null;
				if (!EaasClient) return;
				if (!vm.client) {
					await fetch(config.EAASI_HOST + '/EmilEnvironmentData/init');
					vm.client = new EaasClient.Client(config.EAASI_HOST, container);
				}
				if (!vm.bwfla) {
					vm.bwfla = (window as any).BWFLA as IbwflaController;
				}
				vm.setupListeners();
				vm.startEnvironment();

			} catch(e) {
				this.handleError(e);
			}
		}

		async startEnvironment() {
			let vm = this;
			vm.loading = true;
			try {
				let data = new MachineComponentRequest(vm.environment);
				let params = new StartEnvironmentParams(vm.environment);
				const { softwareId, archiveId, objectId, driveId } = vm.$route.query;
				if (objectId && archiveId) {
					data.objectArchive = archiveId as string;
					data.object = objectId as string;

					// TODO: Uncertain:
					data.driveId = driveId as string;

				} else if (softwareId && archiveId) {
					data.objectArchive = archiveId as string;
					data.software = softwareId as string;
				}
				let keyboardPrefs = vm.getKeyboardPreferences();
				if (keyboardPrefs) data = { ...data, ...keyboardPrefs };
				await vm.client.start([{data, visualize: true}], params);
				vm.isStarted = true;
				await vm.client.connect();
				vm.attachUserControls();
				this.clientComponentId = vm.client['componentId'];

				if (vm.client.driveId) {
					this.$store.commit('SET_DRIVE_ID', vm.client.driveId);
				}

				this.initPrintListeners();
			} catch(e) {
				vm.handleError(e);
			}
			vm.loading = false;
		}

		async stopEnvironment() {
			let vm = this;
			if (!vm.client || vm.isStopping) return;
			vm.isStopping = true;
			window.onbeforeunload = null;
			await vm.client.release();
			vm.isStopping = false;
			vm.isStarted = false;
		}

		async sendCtrlAltDelete() {
			if (!this.client) return;
			await this.client.sendCtrlAltDel();
		}

		sendEscape() {
			if (!this.client) return;
			this.client.sendEsc();
		}

		setupListeners() {
			let vm = this;
			vm.client.onError = (err) => vm.handleError(err);
			window.onbeforeunload = () => ''; // Show generic browser warning
			window.onunload = () => vm.stopEnvironment();
			vm.client.onEmulatorStopped = () => {
				this.isStarted = false;
			};
		}

		takeScreenShot() {
			let canvas = document.querySelector('#emulatorWrapper canvas') as HTMLCanvasElement;
			if (!canvas) return;
			let envTitle = this.environment.title;
			let filename = slugify(envTitle + '-screenshot-' + new Date().toLocaleString());
			canvas.toBlob(blob => saveAs(blob, filename));
		}

		saveEmulator() {
			console.log('TODO: saveEmulator');
		}

		async downloadPrintJob(label: string) {
			// without getPrintJobs() call, downloadPrint() is not working as expected
			this.client.getPrintJobs(() => {},() => {});
			const pdfUrl = this.client.downloadPrint(label);
			window.open(pdfUrl);
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

		initBusListeners() {
			eventBus.$on('emulator:save', () => this.saveEmulator());
			eventBus.$on('emulator:saveEnvironmentImport', (importDetails) => this.saveEnvironmentImport(importDetails));
			eventBus.$on('emulator:takeScreenshot', () => this.takeScreenShot());
			eventBus.$on('emulator:send:escape', () => this.sendEscape());
			eventBus.$on('emulator:send:ctrlAltDelete', () => this.sendCtrlAltDelete());
			eventBus.$on('emulator:change-media', (changeMediaRequest) => this.changeMedia(changeMediaRequest));
			eventBus.$on('emulator:print:download-print-job', (label: string) => this.downloadPrintJob(label));
		}

		initPrintListeners() {
			this.client.eventSource.addEventListener('print-job', e => {
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
