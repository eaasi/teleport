<template>
	<section id="emulatorWrapper">
		<div ref="_emulatorContainer" id="emulator-container"></div>
		<div class="emulator-actions">
			<p>Emulator Actions</p>
			<div class="flex-row justify-between">
				<ui-button
					icon="camera"
					collapse
					size="sm"
				>
					Take Screenshot
				</ui-button>
				<ui-button
					icon="keyboard"
					collapse
					size="sm"
				>
					Esc
				</ui-button>
				<ui-button
					icon="keyboard"
					collapse
					size="sm"
				>
					Ctrl/Alt/Dele
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
import { IEaasClient, IbwflaController } from '@/types/Eaas';
import { IEnvironment } from '@/types/Resource';
import { Get, Sync } from 'vuex-pathify';
@Component({
	name: 'Emulator'
})
export default class Emulator extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IEnvironment, required: true})
	readonly environment: IEnvironment

	/* Computed
	============================================*/

	get environmentParams() {
		// TODO: this should not be static
		return {
			archive: this.environment.archive,
			keyboardLayout: 'us',
			keyboardModel: 'pc105',
			type: 'machine'
		};
	}

	@Sync('showLoader')
	loading: boolean;

	@Sync('appError')
	error: IAppError

	/* Data
	============================================*/

	bwfla: IbwflaController = null;
	client: IEaasClient = null;
	controller: IbwflaController = null;
	isStarted: boolean = false;

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

	async init() {
		try {
			let vm = this;
			let container = vm.$refs._emulatorContainer;
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
			// return; // TODO;
			vm.startEnvironment();
		} catch(e) {
			this.handleError(e.message);
		}
	}

	async startEnvironment() {
		try {
			let vm = this;
			vm.loading = true;
			await vm.client.startEnvironment(vm.environment.envId, vm.environmentParams);
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
		if(!vm.client || !vm.isStarted) return;
		window.onbeforeunload = null;
		await vm.client.release();
		vm.isStarted = false;
	}

	setupListeners() {
		let vm = this;
		vm.client.onError = (err) => vm.handleError(err);
		window.onbeforeunload = () => vm.stopEnvironment();
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.init();
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
	width: 46rem;
}

</style>
