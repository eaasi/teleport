<template>
	<div>
		<!-- EMULATION PROJECT HEADER -->
		<view-header title="Emulation Project">
			<div>
				Choose hardware and/or emulation settings, add imported or discovered resources, and run your emulation.
				Save a new resource from this project by using the RUN emulation interface
			</div>
			<template v-slot:actions>
				<div class="emu-project-actions">
					<div class="emu-project-action">
						<ui-button :disabled="!isReadyToRun">Run</ui-button>
					</div>
					<div class="emu-project-action">
						<ui-button secondary>Clear Project</ui-button>
					</div>
				</div>
			</template>
		</view-header>
		<!-- EMULATION PROJECT HEADER /-->

		<!-- EMULATION PROJECT CONTENT -->
		<div class="emu-project-content">
			<div class="emu-project-content-left">
				<!-- BASE ENVIRONMENT -->
				<div>
					<section-heading title="Base Environment" icon="fa-box" />
					<base-environment-wizard />
					<div class="divider-border"></div>
				</div>
				<!-- BASE ENVIRONMENT /-->

				<!-- SOFTWARE RESOURCES -->
				<div>
					<section-heading title="Software Resources" icon="fa-box" />
					<software-resources-wizard />
					<div class="divider-border"></div>
				</div>
				<!-- SOFTWARE RESOURCES -->

				<!-- CONTENT RESOURCES -->
				<div>
					<section-heading title="Content Resources" icon="fa-box" />
					<content-resources-wizard />
				</div>
				<!-- CONTENT RESOURCES -->
			</div>
			<div class="emu-project-content-right">
				<tips-card>
					You will need at least a base environment to run an emulation project
				</tips-card>
			</div>
		</div>
		<!-- EMULATION PROJECT CONTENT /-->
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import BaseEnvironmentWizard from '@/components/emulation-project/BaseEnvironmentWizard.vue';
import SoftwareResourcesWizard from '@/components/emulation-project/SoftwareResourcesWizard.vue';
import ContentResourcesWizard from '@/components/emulation-project/ContentResourcesWizard.vue';

@Component({
	name: 'EmulationProjectScreen',
	components : {
		BaseEnvironmentWizard,
		SoftwareResourcesWizard,
		ContentResourcesWizard
	}
})
export default class EmulationProjectScreen extends Vue {

	isReadyToRun() {
		return false;
	}
}

</script>

<style lang="scss">
	.emu-project-actions {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.emu-project-action {
		margin: 0 1.2rem;
	}

	.emu-project-content {
		display: flex;
		padding: 1.2rem;

		.emu-project-content-left {
			width: 50vw;
		}

		.emu-project-content-right {
			padding: 0 2.4rem;
		}
	}
</style>
