<template>
	<button
		:class="['circle-button', `${colorPreset}`, size]"
		v-on="$listeners"
		v-bind="$attrs"
	>
		<span :class="`fas fa-${icon} eb-icon`"></span>
	</button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A general button for UI interaction
 * @example ../docs/CircleButton.Example.md
 */
@Component({
	name: 'CircleButton'
})
export default class CircleButton extends Vue {

	/* Props
	============================================*/

	/**
	 * Optional color preset
	 */
	@Prop({type: String, required: false, default: 'default'})
	readonly colorPreset: String;

	/**
	 * Font icon name
	 */
	@Prop({type: String, required: true})
	readonly icon: string;

	/**
	 * Adds a size class
	 */
	@Prop({type: String, required: false})
	readonly size: string;
}
</script>

<style lang="scss">

.circle-button {
	appearance: none;
	border-radius: 50%;
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
		background-color: $dark-blue;
		border: solid 2px darken($dark-blue, 20%);
		color: #FFFFFF;

		&:hover {
			background-color: darken($dark-blue, 20%);
		}
	}

	&.light-blue {
		background-color: lighten($light-blue, 80%);
		border: solid 2px lighten($light-blue, 50%);
		color: $dark-blue;

		&:hover {
			background-color: lighten($light-blue, 40%);
		}
	}

	&.white {
		background-color: #FFFFFF;
		border: solid 2px lighten($light-blue, 30%);
		color: lighten($dark-blue, 20%);
		font-weight: normal;

		i {
			color: $light-blue;
		}

		&:hover {
			background-color: $light-blue;
			color: #FFFFFF;
		}
	}

	&.blue-transparent {
		background-color: transparent;
		border: none;
		color: $dark-blue;
		font-weight: bold;
	}
}
</style>