<template>
	<div class="base-env-wiz-container">
		<div class="row">
			<div class="col-md-4">
				<options-box option-name="Find a Base" header="Recommended" style="height: 100%;">
					Find an existing base environment.
					<template v-slot:footer>
						<ui-button
							sub-label="...node or network saved resources"
							@click="searchForEnvironment"
						>
							Search/Browse
						</ui-button>

						<ui-button
							sub-label="...imported or bookmarked resources"
							@click="openMyResources"
						>
							My Resources
						</ui-button>
					</template>
				</options-box>
			</div>

			<div class="col-md-4">
				<options-box option-name="Start from Scratch" header="Less Common" style="height: 100%;">
					Use a system template with no configured operating system or software.
					<template v-slot:footer>
						<ui-button
							sub-label="...from your node's system templates"
							@click="chooseTemplate"
						>
							Choose Template
						</ui-button>
					</template>
				</options-box>
			</div>

			<div class="col-md-4">
				<div v-if="showTips">
					<tips-card>
						You will need at least a base environment to run an emulation project
					</tips-card>
				</div>
			</div>
		</div>
		<create-base-env-modal v-if="isChooseTemplateOpen" @close="closeChooseTemplate" />
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
</style>