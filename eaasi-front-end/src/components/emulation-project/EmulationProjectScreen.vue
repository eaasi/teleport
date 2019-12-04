<template>
	<div>
		<view-header title="Emulation Project">
			<div>
				Choose hardware and/or emulation settings, add imported or discovered resources, and run your emulation.
				Save a new resource from this project by using the RUN emulation interface
			</div>
			<template v-slot:actions>
				<div class="emu-project-actions">
					<div class="emu-project-action">
						<ui-button disabled>Run</ui-button>
					</div>
					<div class="emu-project-action">
						<ui-button color-preset="light-blue" disabled>Clear Project</ui-button>
					</div>
				</div>
			</template>
		</view-header>

		<div class="emu-project-content padded">
			<div>
				<section-heading title="Base Environment" icon="fa-box" />
				<base-environment-wizard />
				<div class="divider-border container-xs"></div>
			</div>

			<div class="container-xs">
				<section-heading title="Software Resources" icon="fa-box" />
				<software-resources-wizard />
				<div class="divider-border container-xs"></div>
			</div>

			<div class="container-xs">
				<section-heading title="Content Resources" icon="fa-box" />
				<content-resources-wizard />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
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
export default class EmulationProjectScreen extends Vue { }

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
</style>
