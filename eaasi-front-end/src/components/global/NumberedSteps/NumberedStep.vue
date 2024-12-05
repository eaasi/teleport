<template functional>
	<div class="numbered-step-container flex-row">
		<span v-if="props.complete">
			<span class="step-number fill-bg flex flex-center">
				<span class="icon-label fas fa-check"></span>
			</span>
		</span>
		<span v-else>
			<span :class="['step-number flex flex-center', { 'fill-bg': props.active }]">
				{{ props.step.stepNumber }}
			</span>
		</span>
		<span :class="['step-description', { active: props.active || props.complete }]">
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

	/**
	 * Whether or not the step is active
	 */
	@Prop({type: Boolean, required: false})
	readonly active: boolean

}
</script>

<style lang="scss">
	$defaultFontSize: 1.3rem;
	$defaultFontWeight: bold;
	$defaultLetterSpacing: 0.15rem;
	$circleSize: 3.5rem;

	.numbered-step-container {
		flex-direction: row;
		font-size: $defaultFontSize;
		letter-spacing: $defaultLetterSpacing;
	}

	.step-number {
		background: $medium-grey;
		border: 2px solid #000000;
		border-radius: 50%;
		color: #000000;
		display: flex;
		font-size: 1.6rem;
		font-weight: bold;
		height: $circleSize;
		margin-right: 1.2rem;
		text-align: center;
		transition: background-color 0.5s, border 0.5s;
		width: $circleSize;

		&.fill-bg {
			background: $light-green-background;
			border: 2px solid $green;
			i {
				color: $green;
			}
		}
	}

	.icon-label {
		font-size: 1.3rem;
	}

	.step-description {
		font-weight: $defaultFontWeight;
		text-transform: uppercase;
		vertical-align: middle;

		&.active {
			color: $dark-green;
		}
	}

	.step-ellipsis {
		display: inline-block;
	}
</style>
