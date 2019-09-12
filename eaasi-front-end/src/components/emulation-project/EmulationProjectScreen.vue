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
						<ui-button :disabled="!isReadyToRun">Run</ui-button>
					</div>
					<div class="emu-project-action">
						<ui-button secondary>Clear Project</ui-button>
					</div>
				</div>
			</template>
		</view-header>
		<div>
			<section-heading title="Base Environment" />
		</div>
		<div>
			<section-heading title="Software Resources" />
		</div>
		<div>
			<section-heading title="Content Resources" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
	name: 'EmulationProjectScreen'
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
</style>
