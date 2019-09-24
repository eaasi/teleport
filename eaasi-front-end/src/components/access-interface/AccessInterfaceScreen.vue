<template>
	<div id="accessInterface" class="flex">
		<access-interface-header
			@click:exit="exit"
			@click:restart="restart"
			@click:save="save"
		/>
		<environment-menu
			v-if="environment"
			:environment="environment"
		/>
		<div class="ai-emulator flex-adapt">
			<emulator
				v-if="environment"
				:environment="environment"
				ref="_emulator"
			/>
		</div>
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

	@Sync('hideLeftMenu')
	hideLeftMenu: boolean

	@Sync('hideAppHeader')
	hideAppHeader: boolean

	/* Methods
	============================================*/

	async getEnvironment(envId: string) {
		let environment = await this.$store.dispatch('resource/getEnvironment', envId);
		if(!environment) return;
		this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', environment);
	}

	async exit() {
		await this.stop();
		this.$router.go(-1);
	}

	restart() {
		// TODO
	}

	save() {
		// TODO
	}

	async stop() {
		if(!this.$refs._emulator) return;
		await this.$refs._emulator.stopEnvironment();
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

.ai-emulator {
	margin-top: $accessHeaderHeight;
	padding: 2rem 3rem;
}
</style>