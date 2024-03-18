<template>
	<div id="accessInterface" class="flex">
		<access-interface-header
			@click:exit="createEnvironmentPayload ? exit() : showConfirmExitModal = true"
			@click:restart="showConfirmRestartModal = true"
		/>

		<environment-menu v-if="environment || createEnvironmentPayload" />

		<div class="flex-adapt padded ai-content">
			<div class="ai-emulator">
				<emulator
					v-if="environment || createEnvironmentPayload"
					:environment="environment"
					:create-environment-payload="createEnvironmentPayload"
					ref="_emulator"
				/>
			</div>
		</div>

		<!-- Modals -->
		<confirm-modal
			title="Exit Emulation?"
			confirm-label="Exit"
			@click:cancel="showConfirmExitModal = false"
			@click:confirm="exit"
			v-if="showConfirmExitModal"
		>
			<alert type="warning">
				If you exit, all unsaved changes made during this session will be lost.
			</alert>
		</confirm-modal>

		<confirm-modal
			title="Restart Emulation?"
			confirm-label="Restart"
			@click:cancel="showConfirmRestartModal = false"
			@click:confirm="restart"
			v-if="showConfirmRestartModal"
		>
			<alert type="warning">
				If you restart, all unsaved changes made during this session will be lost.
			</alert>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
	import { jsonCopy } from '@/utils/functions';
	import Vue from 'vue';
	import { Component } from 'vue-property-decorator';
	import { Route } from 'vue-router';
	import { Get, Sync } from 'vuex-pathify';
	import { IEnvironment } from '@/types/Resource';
	import AccessInterfaceHeader from './AccessInterfaceHeader.vue';
	import Emulator from './Emulator.vue';
	import EnvironmentMenu from './EnvironmentMenu.vue';
	import { IEaasiUser } from 'eaasi-admin';
	import {ICreateEnvironmentPayload} from '@/types/Import';

	@Component({
		name: 'AccessInterfaceScreen',
		components: {
			AccessInterfaceHeader,
			EnvironmentMenu,
			Emulator
		}
	})
	export default class AccessInterfaceScreen extends Vue {

		$refs!: {
			_emulator: Emulator
		};

		/* Computed
        ============================================*/

		@Sync('resource/activeEnvironment')
		environment: IEnvironment;

		@Sync('emulationProject/createEnvironmentPayload')
		createEnvironmentPayload: ICreateEnvironmentPayload;

		@Get('emulatorIsRunning')
		readonly emulatorIsRunning: boolean;

		@Sync('hideLeftMenu')
		hideLeftMenu: boolean;

		@Sync('hideAppHeader')
		hideAppHeader: boolean;

		@Get('import/environment@title')
		importedTitle: string;

		@Get('import/environment')
		importedEnvironment: string;

		@Get('import/isImportedEnvironment')
		isImportedEnvironment: boolean;

		@Get('import/isConstructedEnvironment')
		isConstructedEnvironment: boolean;

		@Get('import/environmentType')
		environmentImportType: string;

		@Get('import/environmentSoftwareId')
		environmentSoftwareId: string;

		@Get('import/environmentContentId')
		environmentContentId: string;

		@Get('import/constructedTitle')
		constructedTitle: string;

		@Get('resource/resourceName')
		runningResourceName: string;

		@Get('loggedInUser')
		loggedInUser: IEaasiUser;

		/* Data
        ============================================*/
		showConfirmExitModal: boolean = false;
		showConfirmRestartModal: boolean = false;

		/* Methods
        ============================================*/

		async getEnvironment(envId: string) {
			if (this.$route.query.createBaseEnvironment) {
				await this.runImportedEnvironment(envId, `Base Environment [${this.loggedInUser.firstName} ${this.loggedInUser.lastName}]`);
			} else if (this.isImportedEnvironment) {
				await this.runImportedEnvironment(envId, this.importedTitle);
			} else if (this.isConstructedEnvironment) {
				await this.runConstructedEnvironment(envId);
			} else {
				await this.runBaseEnvironment(envId);
			}
		}

		async runConstructedEnvironment(envId: string) {
			let environment = await this.$store.dispatch('resource/getEnvironment', envId);

			await this.$store.commit('import/SET_CONSTRUCTED_TITLE',
				`${environment.title} running ${this.runningResourceName}`);

			let constructedEnvironment = {
				archive: 'public',
				envId: envId,
				keyboardLayout: 'us',
				keyboardModel: 'pc105',
				object: this.environmentContentId,
				objectArchive: 'zero conf',
				software: this.environmentSoftwareId,
				title: this.constructedTitle,
				type: 'machine',
			};

			this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', constructedEnvironment);
		}

		async runImportedEnvironment(envId: string, title: string) {
			let environment = {
				archive: 'default',
				envId: envId,
				keyboardLayout: 'us',
				keyboardModel: 'pc105',
				object: null,
				objectArchive: null,
				software: null,
				title,
				type: 'machine',
				isImport: true,
				userId: null
			};

			this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', environment);
		}

		async runBaseEnvironment(envId: string) {
			let environment = await this.$store.dispatch('resource/getEnvironment', envId);
			if (!environment) return;
			this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', environment);
		}

		async exit() {
			this.showConfirmExitModal = false;
			const result = await this.stop();
			if (result) this.$router.go(-1);
		}

		async restart() {
			let vm = this;
			vm.showConfirmRestartModal = false;
			if (!vm.$refs._emulator) return;
			let environment = jsonCopy(vm.environment) as IEnvironment;
			let createEnvironmentPayload = jsonCopy(vm.createEnvironmentPayload) as ICreateEnvironmentPayload;
			await vm.$refs._emulator.stopEnvironment();
			vm.environment = null;
			vm.createEnvironmentPayload = null;
			vm.$nextTick(() => {
				vm.environment = environment;
				vm.createEnvironmentPayload = createEnvironmentPayload;
			});
		}

		async stop() {
			if (!this.$refs._emulator) return;
			await this.$refs._emulator.stopEnvironment();
			return true;
		}

		/* Lifecycle Hooks
        ============================================*/

		beforeRouteEnter(to: Route, from: Route, next: Function) {
			next(async vm => {
				const { envId } = to.params;
				if (envId !== 'undefined') {
					await vm.getEnvironment(envId);
				}
				vm.hideAppHeader = true;
				vm.hideLeftMenu = true;
			});
		}

		beforeRouteLeave(to: Route, from: Route, next: Function) {
			this.hideAppHeader = false;
			this.hideLeftMenu = false;
			this.stop().then(() => {
				next();
			});
		}

		async destroyed() {
			// Clear constructed / imported environment state
			await this.$store.dispatch('import/clearEnvironment');
		}
	}

</script>

<style lang="scss">
	#accessInterface {
		background-color: darken($teal, 72%);
		min-height: 100vh;
	}

	.ai-content {
		margin-top: $accessHeaderHeight;
		overflow-x: scroll;
		text-align: center;
	}

	.ai-emulator {
		display: inline-block;
		margin: 0 auto;
	}
</style>