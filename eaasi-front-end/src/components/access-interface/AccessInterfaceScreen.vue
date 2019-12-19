<template>
	<div id="accessInterface" class="flex">
		<access-interface-header
			@click:exit="showConfirmExitModal = true"
			@click:restart="showConfirmRestartModal = true"
			@click:save="save"
		/>

		<environment-menu v-if="environment" />

		<div class="flex-adapt padded ai-content">
			<div class="ai-emulator">
				<emulator
					v-if="environment"
					:environment="environment"
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

		/* Data
        ============================================*/

		showConfirmExitModal: boolean = false;
		showConfirmRestartModal: boolean = false;

		/* Methods
        ============================================*/

		async getEnvironment(envId: string) {
			let environment = await this.$store.dispatch('resource/getEnvironment', envId);
			if (!environment) return;
			this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', environment);
		}

		async getImportedEnvironment(envId: string) {
			let environment = {
				archive: 'default',
				envId: envId,
				keyboardLayout: 'us',
				keyboardModel: 'pc105',
				object: null,
				objectArchive: null,
				software: null,
				title: this.importedTitle,
				type: 'machine',
				isImport: true,
			};

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
			await vm.$refs._emulator.stopEnvironment();
			vm.environment = null;
			vm.$nextTick(() => {
				vm.environment = environment;
			});
		}

		save() {
			console.log('TODO: ::: AccessInterfaceScreen ::: save');
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
				from.name === 'Import Resource'
					? await vm.getImportedEnvironment(envId)
					: await vm.getEnvironment(envId);
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
	}

</script>

<style lang="scss">
	#accessInterface {
		background-color: darken($teal, 72%);
		min-height: 100vh;
	}

	.ai-content {
		margin-top: $accessHeaderHeight;
		text-align: center;
	}

	.ai-emulator {
		display: inline-block;
		margin: 0 auto;
	}
</style>