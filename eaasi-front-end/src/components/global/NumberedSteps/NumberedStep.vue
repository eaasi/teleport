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
export default class Tag extends Vue {
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
		font-size: $defaultFontSize;
		display: inline-flex;
		flex-direction: row;
		letter-spacing: $defaultLetterSpacing;
		padding:14px;
	}

	.step-number {
		background: transparent;
		border: 3px solid #fff;
		color: #000;
		margin-right: 12px;
		border-radius: 50%;
		padding: 1.1rem;
		font-size: 1.6rem;
		line-height: 3.5rem;

		&.fill-bg {
			background: #fff;
		}
	}

	.icon-label {
		font-size: 1.3rem;
	}

	.step-description {
		font-weight: $defaultFontWeight;
		text-transform: uppercase;
		line-height: 3.8rem;
		vertical-align: middle;

		// todo: There is a more elegant way to fill remaining space with dots.
		&:after {
			font-weight: normal;
			color: $warm-grey;
			content: "..................."
		}
	}

	.step-ellipsis {
		display: inline-block;
	}
</style>
