<template functional>
	<div class="numbered-step-container flex-row">
		<span v-if="props.complete">
			<span class="step-number fill-bg">
				<i class="icon-label fas fa-check"></i>
			</span>
		</span>
		<span v-else>
			<span class="step-number flex flex-center">
				{{ props.step.stepNumber }}
			</span>
		</span>
		<span class="step-description">
			{{ props.step.description }}
		</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {INumberedStep} from '@/types/NumberedStep';

/**
 * A Step in a NumberedSteps Component
 */
@Component({
	name: 'NumberedStep'
})
export default class Step extends Vue {

	/* Props
	============================================*/

    /**
	 * A step to be completed
	 */
    @Prop({type: Object as () => INumberedStep, required: true})
	step: INumberedStep

	/**
	 * Whether or not the step has been completed
	 */
	@Prop({type: Boolean, required: false})
	readonly complete: boolean

}
</script>

<style lang="scss">
	$defaultFontSize: 1.3rem;
	$defaultFontWeight: bold;
	$defaultLetterSpacing: 0.15rem;
	$circleSize: 3rem;

	.numbered-step-container {
		display: inline-flex;
		flex-direction: row;
		font-size: $defaultFontSize;
		letter-spacing: $defaultLetterSpacing;
	}

	.step-number {
		background: transparent;
		border: 3px solid #ffffff;
		border-radius: 50%;
		color: #000000;
		font-weight: bold;
		height: $circleSize;
		margin-right: 1.2rem;
		width: $circleSize;

		&.fill-bg {
			background: #ffffff;
		}
	}

	.icon-label {
		font-size: 1.3rem;
	}

	.step-description {
		font-weight: $defaultFontWeight;
		text-transform: uppercase;
		vertical-align: middle;

		// TODO: There is a more elegant way to fill remaining space with dots.

		&::after {
			color: #888;
			content: '...........................';
			font-weight: normal;
		}
	}

	.step-ellipsis {
		display: inline-block;
	}
</style>
