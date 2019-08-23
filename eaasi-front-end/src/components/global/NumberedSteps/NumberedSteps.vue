<template>
	<div class="numbered-steps-container flex justify-between">
		<span class="step" v-for="step in this.steps" :key="step.stepNumber">
			<numbered-step :step="step" :complete="value > step.stepNumber" />
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
	readonly steps: INumberedStep[]

	/**
	 * The current step number
	 */
	@Prop({type: Number, required: true})
	readonly value: number

}
</script>

<style lang="scss">
	.numbered-steps-container {
		width: 100%;
	}
</style>
