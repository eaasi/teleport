<template>
	<div>
		<div class="emulator-actions" v-show="isStarted">
			<div class="header">EMULATOR ACTIONS</div>
			<div class="flex-row justify-between">
				<ui-button
					icon="camera"
					green
					size="sm"
					@click="takeScreenShot()"
				>
					Save Screen Image
				</ui-button>
				<ui-button
					icon="keyboard"
					green
					size="sm"
					@click="sendEscape()"
				>
					Esc
				</ui-button>
				<ui-button
					icon="keyboard"
					green
					size="sm"
					@click="sendCtrlAltDelete()"
				>
					Ctrl/Alt/Del
				</ui-button>
			</div>
		</div>
		<section id="emulatorWrapper" ref="_wrapper">
			<!-- Do not change this div's ID, eaas-client looks for '#emulator-container' -->
			<div ref="_container" id="emulator-container"></div>
		</section>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import config from '@/config';
	import { saveAs } from 'file-saver';
	import cookies from 'js-cookie';
	import { Component, Prop } from 'vue-property-decorator';
	import { IAppError } from '@/types/AppError';
	import { IEaasClient, IbwflaController } from '@/types/Eaas';
	import { IEnvironment } from '@/types/Resource';
	import { Sync } from 'vuex-pathify';
	import { slugify } from '@/utils/functions';
	import MachineComponentRequest from '@/models/eaas/emil/MachineComponentRequest';
	import StartEnvironmentParams from '@/models/eaas/emil/StartEnvironmentParams';

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
		}

		/* Props
        ============================================*/

		@Prop({type: Object as () => IEnvironment, required: true})
		readonly environment: IEnvironment

		/* Computed
        ============================================*/

		@Sync('showLoader')
		loading: boolean;

		@Sync('appError')
		error: IAppError

		@Sync('emulatorIsRunning')
		isStarted: boolean;

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
				let keyboardPrefs = vm.getKeyboardPreferences();
				if (keyboardPrefs) data = { ...data, ...keyboardPrefs };
				await vm.client.start([{data, vizualize: true}], params);
				vm.isStarted = true;
				await vm.client.connect();
				vm.attachUserControls();
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

		sendCtrlAltDelete() {
			if (!this.client) return;
			this.client.sendCtrlAltDel();
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
		}

		takeScreenShot() {
			let canvas = document.querySelector('#emulatorWrapper canvas') as HTMLCanvasElement;
			if (!canvas) return;
			let envTitle = this.environment.title;
			let filename = slugify(envTitle + '-screenshot-' + new Date().toLocaleString());
			canvas.toBlob(blob => saveAs(blob, filename));
		}

		/* Lifecycle Hooks
        ============================================*/

		mounted() {
			this.init();
		}

		beforeDestroy() {
			this.stopEnvironment();
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
