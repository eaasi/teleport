<template>
	<button
		:class="['circle-button flex-center', `${colorPreset}`, size]"
		v-on="$listeners"
		v-bind="$attrs"
	>
		<span :class="`fas fa-${icon}`"></span>
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
	border: none;
	border-radius: 50%;
	cursor: pointer;
	font-size: 1.6rem;
	font-weight: 300;
	height: 3.2rem;
	outline: none;
	transition: background-color 0.3s;
	width: 3.2rem;

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.6;
	}

	&.sm,
	&.small {
		font-size: 1.4rem;
		height: 2.5rem;
		width: 2.5rem;
	}

	&.lg,
	&.large {
		font-size: 2rem;
		height: 3.8rem;
		width: 3.8rem;
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

	/**
	Color presets
	 */
	&.default {
		background-color: $medium-grey;
		color: #FFFFFF;

		&:hover {
			background-color: $dark-light-grey;
		}
	}

	&.green {
		background-color: $green;
		color: black;

		&:hover {
			background-color: $medium-green;
		}
	}

	&.white {
		background-color: #FFFFFF;
		border: solid 2px #000000;
		color: #000000;

		i {
			color: #000000;
		}

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