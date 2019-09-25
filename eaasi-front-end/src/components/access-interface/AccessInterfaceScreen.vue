<template>
	<div id="accessInterface" class="flex">
		<access-interface-header
			@click:exit="showConfirmExitModal = true"
			@click:restart="showConfirmRestartModal = true"
			@click:save="save"
		/>
		<environment-menu
			v-if="environment"
			:environment="environment"
		/>
		<div class="flex-adapt padded ai-content">
			<div class="ai-emulator">
				<emulator
					v-if="environment"
					:environment="environment"
					ref="_emulator"
				/>
			</div>
		</div>
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
			confirm-label="Exit"
			@click:cancel="showConfirmRestartModal = false"
			@click:confirm="exit"
			v-if="showConfirmRestartModal"
		>
			<alert type="warning">
				If you restart, all unsaved changes made during this session will be lost.
			</alert>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Get, Sync } from 'vuex-pathify';
import { Component, Prop } from 'vue-property-decorator';
import Emulator from './Emulator.vue';
import { IEnvironment } from '../../types/Resource';
import { Route } from 'vue-router';
import AccessInterfaceHeader from './AccessInterfaceHeader.vue';
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
	}

	/* Computed
	============================================*/

	@Get('resource/activeEnvironment')
	readonly environment: IEnvironment

	@Get('emulatorIsRunning')
	readonly emulatorIsRunning: boolean;

	@Sync('hideLeftMenu')
	hideLeftMenu: boolean

	@Sync('hideAppHeader')
	hideAppHeader: boolean

	/* Data
	============================================*/

	showConfirmExitModal: boolean = false;
	showConfirmRestartModal: boolean = false;

	/* Methods
	============================================*/

	async getEnvironment(envId: string) {
		let environment = await this.$store.dispatch('resource/getEnvironment', envId);
		if(!environment) return;
		this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', environment);
	}

	async exit() {
		this.showConfirmExitModal = false;
		await this.stop();
		this.$router.go(-1);
	}

	restart() {
		this.showConfirmRestartModal = false;
		// TODO
	}

	save() {
		// TODO
	}

	async stop() {
		if(!this.$refs._emulator) return;
		await this.$refs._emulator.stopEnvironment();
		return true;
	}

	/* Lifecycle Hooks
	============================================*/

	beforeRouteEnter(to: Route, from: Route, next: Function) {
		next(vm => {
			vm.getEnvironment(to.params.envId);
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
	background-color: darken($teal, 80%);
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