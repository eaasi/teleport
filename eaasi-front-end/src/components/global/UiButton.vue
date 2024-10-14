<template>
	<span class="ui-btn-container">
		<button
			:class="['eaasi-button', `${colorPreset}`, size, {collapse, block}]"
			v-on="$listeners"
			v-bind="$attrs"
		>
			<span :class="`fas fa-${icon} eb-icon`" v-if="icon && !iconRight"></span>
			<slot></slot>
			<span :class="`fas fa-${icon} eb-icon-right`" v-if="icon && iconRight"></span>
		</button>
		<span class="labeled-btn-label" v-if="subLabel">
			{{ subLabel }}
		</span>
	</span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A general button for UI interaction
 * @example ../docs/UiButton.Example.md
 */
@Component({
	name: 'UiButton'
})
export default class UiButton extends Vue {

	/* Props
	============================================*/

	/**
	 * Make display type: block
	 */
	@Prop({type: Boolean, required: false})
	readonly block: boolean;

	/**
	 * Disables minimum width
	 */
	@Prop({type: Boolean, required: false})
	readonly collapse: boolean;

	/**
	 * Optional color preset
	 */
	@Prop({type: String, required: false, default: 'default'})
	readonly colorPreset: String;

	/**
	 * Font icon name
	 */
	@Prop({type: String, required: false})
	readonly icon: string;

	/**
	 * Show icon on right side of slot (instead of left)
	 */
	@Prop({type: Boolean, required: false})
	readonly iconRight: boolean;

	/**
	 * Shows a sublabel on the button
	 */
	@Prop({type: String, required: false})
	readonly subLabel: string;

	/**
	 * Adds a size class
	 */
	@Prop({type: String, required: false})
	readonly size: string;
}
</script>

<style lang="scss">

.ui-btn-container {

	.labeled-btn-label {
		display: block;
		font-size: 1.2rem;
		font-style: italic;
		margin-top: 1rem;
		text-align: center;
	}
}

.eaasi-button {
	appearance: none;
	cursor: pointer;
	font-size: 1.6rem;
	font-weight: 600;
	min-width: 17.5rem;
	outline: none;
	padding: 0.8rem 1.6rem;
	transition: background-color 0.3s;

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.6;
	}

	&.sm,
	&.small {
		font-size: 1.4rem;
		min-width: 12rem;
		padding: 0.6rem 1.6rem;
	}

	&.md,
	&.medium {
		font-size: 1.6rem;
		min-width: 12rem;
		padding: 1rem 1.6rem;
	}

	&.block {
		display: block;
		margin: 0 auto;
		width: 100%;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	&.collapse {
		min-width: 0;
	}

	.eb-icon {
		margin-right: 0.4em;
	}

	.eb-icon-right {
		margin-left: 0.4rem;
	}

	/**
	Color presets
	 */
	&.default {
		background-color: $green;
		border: solid 2px transparent;
		color: black;

		&:hover {
			background-color: $medium-green;
			border: solid 2px black;
		}
	}

	&.green {
		background-color: $green;
		color: black;
		border: solid 2px transparent;

		&:hover {
			background-color: $medium-green;
			border: solid 2px black;
		}
	}

	&.white {
		background-color: #FFFFFF;
		border: solid 2px #000000;
		color: #000000;

		&:hover {
			background-color: #000000;
			color: #FFFFFF;
		}
	}

	&.black {
		background-color: #000000;
		border: solid 2px #000000;
		color: #FFFFFF;

		&:hover {
			background-color: #FFFFFF;
			color: #000000;
		}
	}
}
</style>