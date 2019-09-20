<template>
	<section id="emulatorWrapper" class="padded">
		<h2>{{ environment && environment.title || 'Access Interface' }}</h2>
		<div ref="_emulatorContainer"></div>
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

	/* Computed
	============================================*/

	@Get('resource/activeEnvironment')
	readonly environment: IEnvironment

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
		vm.bwfla = (window as any).BWFLA as IbwflaController;
		if (vm.client.params.pointerLock === 'true') {
			vm.bwfla.requestPointerLock(vm.client.guac.getDisplay().getElement(), 'click');
		}
	}

	confirmStop() {
		// TODO;
		this.stopClient();
	}

	handleError(message: string) {
		this.error = { message };
	}

	async init() {
		let vm = this;
		let container = vm.$refs._emulatorContainer;
		let EaasClient = (window as any).EaasClient || null;
		if(!EaasClient) return;
		await fetch(config.EAASI_HOST + '/EmilEnvironmentData/init');
		vm.client = new EaasClient.Client(config.EAASI_HOST, container);
		vm.setupListeners();
		vm.startClient();
	}

	async startClient() {
		let vm = this;
		vm.loading = true;
		if(!vm.client || !vm.environment) return;
		await vm.client.startEnvironment(vm.environment.envId, {
			archive: vm.environment.archive,
			keyboardLayout: 'us',
			keyboardModel: 'pc105',
			type: 'machine'
		});
		await vm.client.connect();
		vm.attachUserControls();
		setTimeout(() => vm.loading = false, 1000);
	}

	async stopClient() {
		console.log('STOPPING CLIENT');
		let vm = this;
		if(!vm.client) return;
		vm.loading = true;
		window.onbeforeunload = null;
		vm.client.disconnect();
		await vm.client.release();
		vm.loading = false;
	}

	setupListeners() {
		let vm = this;

		vm.client.onError = (err) => vm.handleError(err);
		window.onbeforeunload = () => vm.confirmStop();
	}

	/* Hooks
	============================================*/

	mounted() {
		this.init();
	}

	beforeDestroy() {
		this.stopClient();
	}
}
</script>
