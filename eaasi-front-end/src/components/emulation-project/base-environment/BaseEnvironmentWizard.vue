<template>
	<div class="base-env-wiz-container">
		<div class="flex justify-between">
			<div class="row container-xs">
				<div class="col-md-6">
					<options-box title="Find a Base" header="Recommended">
						Find an existing base environment.
						<div slot="footer" class="flex justify-between">
							<ui-button
								style="max-width: 17.5rem;"
								sub-label="...node or network saved resources"
								@click="searchForEnvironment"
								disabled
							>
								Search/Browse
							</ui-button>

							<ui-button
								style="max-width: 17.5rem;"
								sub-label="...imported or bookmarked resources"
								@click="openMyResources"
								disabled
							>
								My Resources
							</ui-button>
						</div>
					</options-box>
				</div>

				<div class="col-md-6">
					<options-box
						title="Start from Scratch"
						header="Less Common"
					>
						Use a system template with no configured operating system or software.
						<div slot="footer">
							<ui-button
								block
								sub-label="...from your node's system templates"
								@click="chooseTemplate"
								disabled
							>
								Choose Template
							</ui-button>
						</div>
					</options-box>
				</div>
			</div>
			<div v-if="showTips">
				<tips-card>
					You will need at least a base environment to run an emulation project
				</tips-card>
			</div>
		</div>
		<create-base-env-modal v-if="isChooseTemplateOpen" @close="closeChooseTemplate" />
	</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import CreateBaseEnvModal from './CreateBaseEnvModal.vue';
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
	}

	openMyResources() {
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