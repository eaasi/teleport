<!--
<template>
	<div>
		&lt;!&ndash; Error message &ndash;&gt;
		&lt;!&ndash;		<alert
					card
					no-icon
					type="warning"
					class="mb"
				>
					Add a base environment to continue
				</alert>&ndash;&gt;

		<div class="emu-project-content padded" v-if="!emulationProjectMode">
			<selectable-text-card label="Basic" :value="isBasicSelected" @change="selectBasicMode">
				Add content or install software in an existing environment resource.
			</selectable-text-card>
			<selectable-text-card label="Advanced" :value="isAdvancedSelected" @change="selectAdvancedMode">
				Use a system template with no configured operating system or software.
			</selectable-text-card>
		</div>
		<div v-if="emulationProjectMode">
			<emulation-project-mode-screen :mode="emulationProjectMode" @reset="resetMode" />
		</div>

		&lt;!&ndash; Find a Base &ndash;&gt;
		&lt;!&ndash;<div class="emu-option-item flex-row justify-between">
					<div class="content-wrapper">
						<h4>Find a Base</h4>
						<p>Find an existing base environment.</p>
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
				</div>&ndash;&gt;
		&lt;!&ndash; Start from Scratch &ndash;&gt;
		&lt;!&ndash; Not active

		// See: https://gitlab.com/eaasi/program_docs/eaasi/-/issues/1018

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
		&ndash;&gt;
		&lt;!&ndash; Auto Match &ndash;&gt;
		&lt;!&ndash; Not in next release &ndash;&gt;
		&lt;!&ndash; <div class="emu-option-item flex flex-row justify-between">
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
		</div> &ndash;&gt;
		<create-base-env-modal
			v-if="createBaseEnvModal"
			@close="createBaseEnvModal = false"
			@save="saveBaseEnvironment"
		/>
	</div>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import Vue from 'vue';
import BaseEnvironmentWizard from './base-environment/BaseEnvironmentWizard.vue';
import SoftwareResourcesWizard from './SoftwareResourcesWizard.vue';
import ContentResourcesWizard from './ContentResourcesWizard.vue';
import InfoMessage from './shared/InfoMessage.vue';
import {ROUTES} from '@/router/routes.const';
import CreateBaseEnvModal from './base-environment/CreateBaseEnvModal.vue';
import {ICreateEnvironmentPayload, ICreateEnvironmentResponse} from '@/types/Import';
import {Sync} from 'vuex-pathify';
import {generateNotificationError} from '@/helpers/NotificationHelper';
import eventBus from '@/utils/event-bus';
import {IEnvironment} from '@/types/Resource';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import {IUserImportedResource, IUserImportRelationRequest} from '@/types/UserImportRelation';
import {resourceTypes} from '@/utils/constants';
import {EmulationProjectMode} from '@/types/EmulationProject';
import EmulationProjectModeScreen from './EmulationProjectModeScreen.vue';

@Component({
	name: 'EmulationProjectOptions',
	components: {
		EmulationProjectModeScreen,
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

	@Sync('emulationProject/mode')
	emulationProjectMode: EmulationProjectMode;

	createBaseEnvModal: boolean = false;

	get isBasicSelected(): boolean {
		return this.emulationProjectMode === EmulationProjectMode.Basic;
	}

	get isAdvancedSelected(): boolean {
		return this.emulationProjectMode === EmulationProjectMode.Advanced;
	}

	selectBasicMode(value) {
		if (value) {
			this.emulationProjectMode = EmulationProjectMode.Basic;
		} else {
			this.emulationProjectMode = null;
		}
	}

	selectAdvancedMode(value) {
		if (value) {
			this.emulationProjectMode = EmulationProjectMode.Advanced;
		} else {
			this.emulationProjectMode = null;
		}
	}

	resetMode() {
		this.emulationProjectMode = null;
	}

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
		if (!response || !response.id) {
			eventBus.$emit('notification:show', generateNotificationError(`Having troubles creating ${this.createEnvironmentPayload.label} environment, please try again.`));
			return;
		}
		let userImportRelationRequest: IUserImportRelationRequest = {
			resourceType: resourceTypes.ENVIRONMENT,
			resourceId: response.id,
		};
		const baseEnv: IEnvironment = await this.$store.dispatch('resource/getEnvironment', response.id);
		await this.$store.dispatch('emulationProject/addResources', [baseEnv]);
		this.environment = new EmulationProjectEnvironment(baseEnv);
		this.createBaseEnvModal = false;
		// mutate base env at this point
		await this.$router.push(ROUTES.EMULATION_PROJECT.OPTIONS);
	}

	@Watch('environment')
	handleSelectedEnvironment(nextEnvironment: EmulationProjectEnvironment) {
		if (nextEnvironment) {
			this.selectBasicMode(true);
		}
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
		color: $dark-light-grey;
		font-weight: 500;
	}

	p {
		color: $dark-light-grey;
	}

	.emu-option-item {
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

</style>
-->
