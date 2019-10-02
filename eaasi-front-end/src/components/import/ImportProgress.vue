<template>
	<div class="import-progress flex align-stretch">
		<div class="ip-content flex flex-adapt align-center padded">
			<p v-if="step <= 0">
				Import files to use them as a resource in EaaSI. You can choose to make a resource
				temporary—for only this session, saved to your node library for others to use
				and/or published to the node network.
			</p>
			<numbered-steps v-if="step > 0" :steps="steps" v-model="step" />
		</div>
		<div class="ip-actions flex flex-center">
			<div class="flex-center">
				<ui-button disabled style="margin-right: 2rem;">
					{{ nextButtonLabel }}
				</ui-button>
				<ui-button secondary @click="reset">Cancel</ui-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import { NumberedSteps, UiButton } from '@/components/global';
import { INumberedStep } from '../../types/NumberedStep';

@Component({
	name: 'ImportProgress',
	components: {
		NumberedSteps,
		UiButton
	}
})
export default class ImportProgress extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/

	steps: INumberedStep[] = [
		{
			stepNumber: 1,
			description: 'METADATA'
		},
		{
			stepNumber: 2,
			description: 'FILES'
		},
		{
			stepNumber: 3,
			description: 'FINISH'
		},
	]

	/* Computed
	============================================*/

	@Sync('import/importStep')
	step: number

	get nextButtonLabel() {
		if(this.step == this.steps.length) return 'Finish Import';
		return 'Next';
	}

	/* Methods
	============================================*/

	reset() {
		this.$store.commit('import/RESET_STATE');
	}

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss">

	.import-progress {
		background-color: lighten($light-neutral, 60%);
		border: solid 2px darken($light-neutral, 10%);
		border-left: none;
		border-right: none;
		min-height: 10rem;
	}

	.ip-actions {
		background-color: lighten($light-neutral, 90%);
		flex: 0 0 $tipLaneWidth;
		> div {
			padding: $defaultScreenPadding;
		}
	}

	.ip-content {
		min-width: 0;
	}
</style>