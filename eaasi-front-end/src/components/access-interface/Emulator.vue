<template>
	<section id="emulatorWrapper" ref="_wrapper">
		<!-- Do not change this div's ID, eeas-client looks for '#emulator-container' -->
		<div ref="_container" id="emulator-container"></div>
		<div class="emulator-actions" v-show="isStarted">
			<p>Emulator Actions</p>
			<div class="flex-row justify-between">
				<ui-button
					icon="camera"
					collapse
					size="sm"
					@click="takeScreenShot()"
				>
					Take Screenshot
				</ui-button>
				<ui-button
					icon="keyboard"
					collapse
					size="sm"
					@click="sendEscape()"
				>
					Esc
				</ui-button>
				<ui-button
					icon="keyboard"
					collapse
					size="sm"
					@click="sendCtrlAltDelete()"
				>
					Ctrl/Alt/Del
				</ui-button>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import config from '@/config';
import { Component, Prop } from 'vue-property-decorator';
import { IAppError } from '@/types/AppError';
import { IEaasClient, IbwflaController, IMachineComponentRequest } from '@/types/Eaas';
import { IEnvironment } from '@/types/Resource';
import { Get, Sync } from 'vuex-pathify';
import { saveAs } from 'file-saver';
import { slugify } from '@/utils/functions';
import MachineComponentRequest from '@/models/eaas/emil/MachineComponentRequest';
import StartEnvironmentParams from '@/models/eaas/emil/StartEnvironmentParams';
import cookies from 'js-cookie';

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
		if(!vm.bwfla) return;
		if (vm.client.params.pointerLock === 'true') {
			vm.bwfla.requestPointerLock(vm.client.guac.getDisplay().getElement(), 'click');
		}
	}

	confirmStop() {
		// TODO: Have user confirm that they want to stop environment before leaving
		this.stopEnvironment();
	}

	handleError(message: string) {
		this.error = { message };
	}

	getKeyboardPreferences() {
		let prefs = cookies.getJSON('kbLayoutPrefs');
		if(!prefs) return null;
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
		try {
			let vm = this;
			let container = vm.$refs._container;
			let EaasClient = (window as any).EaasClient || null;
			if(!EaasClient) return;
			if(!vm.client) {
				await fetch(config.EAASI_HOST + '/EmilEnvironmentData/init');
				vm.client = new EaasClient.Client(config.EAASI_HOST, container);
			}
			if(!vm.bwfla) {
				vm.bwfla = (window as any).BWFLA as IbwflaController;
			}
			vm.setupListeners();
			vm.startEnvironment();
		} catch(e) {
			this.handleError(e.message);
		}
	}

	async startEnvironment() {
		try {
			let vm = this;
			vm.loading = true;
			let data = new MachineComponentRequest(vm.environment);
			let params = new StartEnvironmentParams(vm.environment);
			let keyboardPrefs = vm.getKeyboardPreferences();
			if(keyboardPrefs) data = { ...data, ...keyboardPrefs };
			await vm.client.start([{data, vizualize: true}], params);
			vm.isStarted = true;
			await vm.client.connect();
			vm.attachUserControls();
			setTimeout(() => vm.loading = false, 1000);
		} catch(e) {
			this.handleError(e.message);
		}
	}

	async stopEnvironment() {
		let vm = this;
		if(!vm.client || vm.isStopping) return;
		vm.isStopping = true;
		window.onbeforeunload = null;
		await vm.client.release();
		vm.isStopping = false;
		vm.isStarted = false;
	}

	sendCtrlAltDelete() {
		if(!this.client) return;
		this.client.sendCtrlAltDel();
	}

	sendEscape() {
		if(!this.client) return;
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
		if(!canvas) return;
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
	background-color: rgba(0, 0, 0, 0.5);
	color: #AAAAAA;
	margin: 2rem auto 0;
	padding: 1rem 2rem 2rem;
	width: 45rem;
}

</style>
