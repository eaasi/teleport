<template>
	<div class="numbered-steps-container flex justify-between">
		<span class="step flex-adapt" v-for="step in this.steps" :key="step.stepNumber">
			<div class="flex">
				<div class="step-wrapper">
					<numbered-step
						:step="step"
						:active="value == step.stepNumber"
						:complete="value > step.stepNumber"
					/>
				</div>
				<div class="step-ellipses flex-adapt"></div>
			</div>
		</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { INumberedStep } from '@/types/NumberedStep';
import NumberedStep from './NumberedStep.vue';

/**
 * A Horizontal List of Steps which can be displayed as individually Complete
 * @example ../../docs/NumberedSteps.Example.md
 */
@Component({
	name: 'NumberedSteps',
	components: {NumberedStep}
})
export default class NumberSteps extends Vue {

	/* Props
	============================================*/

	/**
	 * An array of steps to complete
	 */
	@Prop({type: Array, required: true})
	readonly steps: INumberedStep[];

	/**
	 * The current step number
	 */
	@Prop({type: Number, required: true})
	readonly value: number;

}
</script>

<style lang="scss">
	.numbered-steps-container {
		width: 100%;
	}

	.step-ellipses {
		border-bottom: dotted 2px #000000;
		height: 2.4rem;
		margin: 0 2.5rem 0 0.2rem;
	}
</style>
