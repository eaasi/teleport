<template>
	<div class="base-env-wiz-container">
		<!-- BASE ENVIRONMENT WIZARD LEFT SIDE -->
		<div class="base-env-wiz-left">
			<!-- EXISTING BASE ENVIRONMENT -->
			<div class="base-env-wiz-opt">
				<options-box option-name="Find a Base" header="Recommended" style="height: 100%;">
					Find an existing base environment.
					<template v-slot:footer>
						<labeled-ui-button
							label-text="...node or network saved resources"
							@btnClicked="searchForEnvironment"
						>
							Search/Browse
						</labeled-ui-button>

						<labeled-ui-button
							label-text="...imported or bookmarked resources"
							@btnClicked="openMyResources"
						>
							My Resources
						</labeled-ui-button>
					</template>
				</options-box>
			</div>
			<!-- EXISTING BASE ENVIRONMENT /-->

			<!-- CREATE BASE ENVIRONMENT -->
			<div class="base-env-wiz-opt">
				<options-box option-name="Start from Scratch" header="Less Common" style="height: 100%;">
					Use a system template with no configured operating system or software.
					<template v-slot:footer>
						<labeled-ui-button
							label-text="...from your node's system templates"
							@clicked="chooseTemplate"
						>
							Choose Template
						</labeled-ui-button>
					</template>
				</options-box>
			</div>
			<!-- CREATE BASE ENVIRONMENT /-->
		</div>
		<!-- BASE ENVIRONMENT WIZARD LEFT SIDE /-->

		<!-- BASE ENVIRONMENT WIZARD RIGHT SIDE -->
		<div class="base-env-wiz-right">
			<div v-if="showTips">
				<tips-card>
					You will need at least a base environment to run an emulation project
				</tips-card>
			</div>
		</div>
		<!-- BASE ENVIRONMENT WIZARD RIGHT SIDE /-->

		<!-- MODALS -->
		<create-base-env-modal v-if="isChooseTemplateOpen" @close="closeChooseTemplate" />
		<!-- MODALS /-->
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import CreateBaseEnvModal from '@/components/emulation-project/CreateBaseEnvModal.vue';
import Vue from 'vue';

@Component({
	name: 'BaseEnvironmentWizard',
	components: { CreateBaseEnvModal }
})
export default class BaseEnvironmentWizard extends Vue {

	/**
	 * True if the Choose Template Modal is open
	 */
	isChooseTemplateOpen = false;


	/**
	 * True if a Tips Component is open
	 */
	showTips: Boolean = true;

	searchForEnvironment() {
		console.log('Search for Environment');
	}

	openMyResources() {
		console.log('Open My Resources');
	}

	/**
	 * Opens the Choose Template Modal
	 */
	chooseTemplate() {
		this.isChooseTemplateOpen = true;
	}

	/**
	 * Closes the Choose Template Modal
	 */
	closeChooseTemplate() {
		this.isChooseTemplateOpen = false;
	}
}
</script>

<style lang="scss">
	.base-env-wiz-container {
		align-items: stretch;
		display: flex;
		flex-direction: row;
	}

	.base-env-wiz-left {
		display: flex;
		min-width: 50vw;
	}

	.base-env-wiz-right {
		display: flex;
		justify-content: flex-start;
	}

	.base-env-wiz-opt {
		align-content: stretch;
		flex-grow: 1;
		margin-right: 1rem;
		padding: 1.2rem 0;
	}
</style>
