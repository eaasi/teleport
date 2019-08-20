<template functional>
	<div class="numbered-step-container">
		<span v-if="props.stepData.isComplete">
			<span class="step-number fill-bg">
				<i class="icon-label fas fa-check"></i>
			</span>
		</span>
		<span v-else>
			<span class="step-number">
				{{ props.stepData.stepNumber }}
			</span>
		</span>
		<span class="step-description">
			{{ props.stepData.description }}
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
export default class NumberedStep extends Vue {
    /* Props
    ============================================*/
    // A Step which can be completed
    @Prop({type: Object as () => INumberedStep, required: true})
    stepData: INumberedStep
}
</script>

<style lang="scss">
	$defaultFontSize: 1.3rem;
	$defaultFontWeight: bold;
	$defaultLetterSpacing: 0.15rem;

	.numbered-step-container {
		display: inline-flex;
		flex-direction: row;
		font-size: $defaultFontSize;
		letter-spacing: $defaultLetterSpacing;
		padding:14px;
	}

	.step-number {
		background: transparent;
		border: 3px solid #fff;
		border-radius: 50%;
		color: #000;
		font-size: 1.6rem;
		line-height: 3.5rem;
		margin-right: 12px;
		padding: 1.1rem;

		&.fill-bg {
			background: #fff;
		}
	}

	.icon-label {
		font-size: 1.3rem;
	}

	.step-description {
		font-weight: $defaultFontWeight;
		line-height: 3.8rem;
		text-transform: uppercase;
		vertical-align: middle;

		&::after {
			color: $warm-grey;
			content: "...................";
			font-weight: normal;
		}
	}

	.step-ellipsis {
		display: inline-block;
	}
</style>
