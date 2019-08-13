<template>
	<div class="numbered-steps-container">
		<span class="step" v-for="step in this.steps" :key="step.stepNumber">
			<numbered-step :step-data="step" />
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
export default class Tag extends Vue {
		/* Props
        ============================================*/
		// Steps to Complete
		@Prop({type: Array, required: true})
		readonly steps: Array<INumberedStep>
}
</script>

<style lang="scss">
	.step {
		display: inline;
	}
</style>
