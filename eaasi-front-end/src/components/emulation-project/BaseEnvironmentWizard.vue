<template>
	<div class="base-env-wiz-container">
		<!-- EXISTING BASE ENVIRONMENT -->
		<div class="base-env-wiz-opt">
			<options-box option-name="Find a Base" style="height: 100%;">
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
						@btnClicked="chooseTemplate"
					>
						Choose Template
					</labeled-ui-button>
				</template>
			</options-box>
		</div>
		<!-- CREATE BASE ENVIRONMENT /-->
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
	name: 'BaseEnvironmentWizard'
})
export default class BaseEnvironmentWizard extends Vue {
	searchForEnvironment() {
		console.log('Search for Environment');
	}

	openMyResources() {
		console.log('Open My Resources');
	}

	chooseTemplate() {
		console.log('Choose Template');
	}
}
</script>

<style lang="scss">
	.base-env-wiz-container {
		align-items: stretch;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.base-env-wiz-opt {
		align-content: stretch;
		flex-grow: 1;
		margin-right: 1rem;
		padding: 1.2rem 0;
	}
</style>
