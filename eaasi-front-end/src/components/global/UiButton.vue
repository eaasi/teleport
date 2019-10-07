<template>
	<span class="ui-btn-container">
		<button :class="['eaasi-button', size, {collapse, secondary, block}]" v-on="$listeners" v-bind="$attrs">
			<i :class="`fas fa-${icon} eb-icon`" v-if="icon && !iconRight"></i>
			<slot></slot>
			<i :class="`fas fa-${icon} eb-icon-right`" v-if="icon && iconRight"></i>
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
	 * Use secondary styles
	 */
	@Prop({type: Boolean, required: false})
	readonly secondary: boolean;

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
		margin: auto;
		max-width: 80%;
		padding: 1rem 0;
		text-align: center;
	}
}

.eaasi-button {
	appearance: none;
	background-color: $dark-blue;
	border: solid 2px darken($dark-blue, 20%);
	border-radius: 0.4rem;
	color: #FFFFFF;
	cursor: pointer;
	font-size: 1.6rem;
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

	&.block {
		display: block;
		margin: 0 auto;
		max-width: 32rem;
		width: 100%;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	&:hover {
		background-color: darken($dark-blue, 20%);
	}

	&.secondary {
		background-color: lighten($light-blue, 80%);
		border: solid 2px $light-blue;
		color: $dark-blue;

		&:hover {
			background-color: lighten($light-blue, 40%);
		}
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
}
</style>