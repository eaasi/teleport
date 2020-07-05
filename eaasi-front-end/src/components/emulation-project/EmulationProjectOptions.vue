<template>
	<div class="emu-project-content padded">
		<!-- Error message -->
		<alert
			card
			no-icon
			type="warning"
			class="mb"
		>
			Add a base environment to continue
		</alert>
		<!-- Find a Base -->
		<div class="emu-option-item flex-row justify-between">
			<div class="content-wrapper">
				<h4>Find a Base</h4>
				<p>Find an exisating base environment.</p>
			</div>
			<div class="btn-wrapper flex-row">
				<ui-button
					@click="search"
					style="margin-right: 3rem;"
					sub-label="…node or network saved resources"
				>
					Search/Browse
				</ui-button>
				<ui-button
					@click="myResources"
					sub-label="…imported or bookmarked resources"
				>
					My Resources
				</ui-button>
			</div>
		</div>
		<!-- Start from Scratch -->
		<div class="emu-option-item flex flex-row justify-between">
			<div class="content-wrapper">
				<h4>Start from Scratch</h4>
				<p>Use a system template with no configured operating system or software.</p>
			</div>
			<div class="btn-wrapper flex flex-row">
				<ui-button
					@click="createBaseEnvironment"
					sub-label="…from your node’s system templates"
				>
					Create Base Environment
				</ui-button>
			</div>
		</div>
		<!-- Auto Match -->
		<!-- Not in next release -->
		<!-- <div class="emu-option-item flex flex-row justify-between">
			<div class="content-wrapper">
				<h4>Auto Match <span class="bg-red">BETA</span></h4>
				<p>Try to find a base environment match for your objects automatically.</p>
			</div>
			<div class="btn-wrapper flex flex-row">
				<ui-button
					@click="autoMatch"
					sub-label="…feature in BETA"
				>
					Try Auto Match
				</ui-button>
			</div>
		</div> -->
		<create-base-env-modal 
			v-if="createBaseEnvModal" 
			@close="createBaseEnvModal = false" 
			@save="saveBaseEnvironment"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import Vue from 'vue';
import BaseEnvironmentWizard from './base-environment/BaseEnvironmentWizard.vue';
import SoftwareResourcesWizard from './SoftwareResourcesWizard.vue';
import ContentResourcesWizard from './ContentResourcesWizard.vue';
import EmulationProjectScreen from './EmulationProjectScreen.vue';
import InfoMessage from './shared/InfoMessage.vue';
import { ROUTES } from '../../router/routes.const';
import CreateBaseEnvModal from './base-environment/CreateBaseEnvModal.vue';
import { ICreateEnvironmentPayload, ICreateEnvironmentResponse } from '@/types/Import';
import { Get, Sync } from 'vuex-pathify';
import { generateNotificationError } from '../../helpers/NotificationHelper';
import eventBus from '@/utils/event-bus';
import { IEnvironment } from '@/types/Resource';
import EmulationProjectEnvironment from '../../models/emulation-project/EmulationProjectEnvironment';
import { IUserImportRelationRequest, IUserImportedResource } from '@/types/UserImportRelation';
import { resourceTypes } from '../../utils/constants';

@Component({
	name: 'EmulationProjectOptions',
	components : {
		BaseEnvironmentWizard,
		SoftwareResourcesWizard,
		InfoMessage,
		CreateBaseEnvModal,
		ContentResourcesWizard
	}
})
export default class EmulationProjectOptions extends Vue {

	@Sync('emulationProject/createEnvironmentPayload')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	@Sync('emulationProject/environment')
	environment: EmulationProjectEnvironment;

	createBaseEnvModal: boolean = false;

	search() {
		this.$router.push(ROUTES.RESOURCES.EXPLORE);
	}

	myResources() {
		this.$router.push(ROUTES.RESOURCES.MY_RESOURCES);
	}

	createBaseEnvironment() {
		this.createEnvironmentPayload = {
			nativeConfig: '',
			templateId: '',
			driveSettings: [],
			operatingSystemId: '',
			label: ''
		};
		this.createBaseEnvModal = true;
	}

	async saveBaseEnvironment() {
		const response: ICreateEnvironmentResponse = await this.$store.dispatch('import/createEnvironment', this.createEnvironmentPayload);
		if (!response.id) {
			eventBus.$emit('notification:show', generateNotificationError('Having troubles creating base environment, please try again.'));
			return;
		}
		let userImportRelationRequest: IUserImportRelationRequest = {
			resourceType: resourceTypes.ENVIRONMENT,
			resourceId: response.id,
		};
		let { id }: IUserImportedResource = await this.$store.dispatch('import/createUserImportRelation', userImportRelationRequest);
		if (!id) {
			eventBus.$emit('notification:show', generateNotificationError('Failed to save Base Environment to My Resources.'));
		}
		const baseEnv: IEnvironment = await this.$store.dispatch('resource/getEnvironment', response.id);
		this.$store.dispatch('emulationProject/addResources', [baseEnv]);
		this.environment = new EmulationProjectEnvironment(baseEnv);
		this.createBaseEnvModal = false;
		// mutate base env at this point 
		this.$router.push(ROUTES.EMULATION_PROJECT.DETAILS);
	}

}

</script>

<style lang="scss">
.emu-project-content {
	background: #ffffff;
	padding: 3rem;

	.bg-red {
		background: darken($red, 20%);
		border-radius: 0.6rem;
		color: #ffffff;
		font-size: 1rem;
		margin-left: 0.5rem;
		padding: 0.2rem 0.8rem;
	}

	h4 {
		color: $dark-blue;
		font-weight: 500;
	}

	p {
		color: darken($dark-neutral, 80%);
	}

	.emu-option-item {
		border: 1px solid lighten($light-blue, 60%);
		border-radius: 1rem;
		margin-bottom: 1.5rem;
		padding: 3rem;

		.btn-wrapper {
			button {
				font-size: 1.4rem;
				font-weight: 400;
				width: 20rem;
			}
		}
	}
}

.emu-project-actions {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.emu-project-action {
	margin: 0 1.2rem;
}

</style>
