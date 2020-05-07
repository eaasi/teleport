<template>
	<div class="emulation-project-screen width-lg">
		<view-header title="Emulation Project">
			<div class="header-text flex flex-center">
				Create a NEW base environment to emulate and save as a new resource
			</div>
			<template v-slot:actions>
				<div class="emu-project-actions">
					<div class="emu-project-action">
						<ui-button :disabled="!isReadyToRun" @click="run">
							Run
						</ui-button>
					</div>
					<div class="emu-project-action">
						<ui-button color-preset="light-blue" @click="clear">Clear Project</ui-button>
					</div>
				</div>
			</template>
		</view-header>
		<div class="emu-project-content padded">
			<div>
				<section-heading title="Base Environment" icon="fa-box" />
				<new-base-environment-wizard />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import BaseEnvironmentWizard from './base-environment/BaseEnvironmentWizard.vue';
import NewBaseEnvironmentWizard from './base-environment/NewBaseEnvironmentWizard.vue';
import SoftwareResourcesWizard from '@/components/emulation-project/SoftwareResourcesWizard.vue';
import ContentResourcesWizard from '@/components/emulation-project/ContentResourcesWizard.vue';
import { Sync } from 'vuex-pathify';
import { ICreateEnvironmentPayload, ICreateEnvironmentResponse } from '../../types/Import';
import { ROUTES } from '../../router/routes.const';
import { IEnvironmentList, IEnvironment } from '../../types/Resource';

@Component({
	name: 'EmulationProjectScreen',
	components : {
		BaseEnvironmentWizard,
		NewBaseEnvironmentWizard,
		SoftwareResourcesWizard,
		ContentResourcesWizard
	}
})
export default class EmulationProjectScreen extends Vue {

	@Sync('emulationProject/createEnvironmentPayload')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	@Sync('emulationProject/selectedSoftwareId')
	selectedSoftwareId: string;

	@Sync('emulationProject/environment')
	environment: IEnvironment;

	@Sync('resource/activeEnvironment')
	activeEnvironment: IEnvironment;

	get isReadyToRun(): boolean {
		return !!this.selectedSoftwareId && !!this.createEnvironmentPayload.size && !!this.createEnvironmentPayload.templateId;
	}

	async run() {
		this.createEnvironmentPayload.size += 'M';
		const response: ICreateEnvironmentResponse = await this.$store.dispatch('emulationProject/createEnvironment', this.createEnvironmentPayload);
		if (response.status === '0') {
			this.environment.envId = response.id;
		}
		let route = `${ROUTES.ACCESS_INTERFACE}/${response.id}`;
		if (this.selectedSoftwareId) {
			route += `?softwareId=${this.selectedSoftwareId}&archiveId=zero%20conf&createBaseEnvironment=true`;
		}
		// @ts-ignore
		let environment: IEnvironment = {
			archive: 'default',
			envId: response.id,
		};

		this.activeEnvironment = environment;
		
		this.$router.push(route);
	}
	
	clear() {
		this.$store.commit('emulationProject/RESET');
	}

	beforeDestroy() {
		this.clear();
	}
 
}

</script>

<style lang="scss">
.emulation-project-screen {

	.emu-project-actions {
		border-left: 2px solid darken($light-neutral, 10%);
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 2rem;
	}

	.emu-project-action {
		margin: 0 1.2rem;
	}

	.header-text {
		font-size: 1.6rem;
		height: 100%;
	}
}
</style>