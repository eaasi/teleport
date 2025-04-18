<template>
	<div class="eaasi-big-button-with-subtext-wrapper">
		<div
			class="eaasi-big-button-with-subtext"
			role="button"
			@click="$emit('click')"
		>
			<div class="eb-icon" v-if="icon">
				<span :class="`fas fa-${icon}`"></span>
			</div>
			<div class="label">{{ label }}</div>
			<div v-if="subLabel" class="eb-sublabel">
				{{ subLabel }}
			</div>
		</div>
		<div class="eb-info" v-if="info">
			<span>{{ info }}</span>
		</div>
		<div class="eb-subtext" v-if="subtext">
			<span>{{ subtext }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A larger UI button with additional areas for text
 * @example ../docs/BigButton.Example.md
 */
@Component({
	name: 'BigButton',
})
export default class BigButton extends Vue {

	/* Props
	============================================*/

	/**
	 * Primary label
	 */
	@Prop({type: String, required: true})
	readonly label: string;

	/**
	 * Make display type: block
	 */
	@Prop({type: Boolean, required: false})
	readonly block: boolean;

	/**
	 * Font Awesome icon name
	 */
	@Prop({type: String, required: false})
	readonly icon: string;

	/**
	 * Text below the primary label
	 */
	@Prop({type: String, required: false})
	readonly subLabel: string;

	/**
	 * Alternative size of the modal. Accepts 'sm, small, lg, or large'
	 */
	@Prop({type: String, required: false, default: 'sm'})
	readonly size: string;

	/**
	 * Additional text that will appear below the button in a colored wrapper
	 */
	@Prop({type: String, required: false})
	readonly info: string

	/**
	 * Additional text that will appear below the button
	 */
	@Prop({type: String, required: false})
	readonly subtext: string

}

</script>

<style lang="scss">
.eaasi-big-button-with-subtext-wrapper {
	width: 100%;
	height: 100%;
	display: flex;

	.eaasi-big-button-with-subtext {
		background-color: $grey;
		border: solid 2px $black;
		color: $black;
		cursor: pointer;
		padding: 25px;
		text-align: left;
		transition: background-color 0.3s;

		&:hover {
			background-color: $white;
			border: solid 2px $green;
		}

		.label {
			color: $black;
			font-size: 1.8rem;
			font-weight: bold;
			margin-bottom: 10px;
		}

		.eb-icon {
			font-size: 2.5rem;
			margin-bottom: 15px;
		}

		.eb-sublabel {
			color: $black;
			line-height: 1.3em;
			margin-top: 6px;
		}
	}

	.eb-info {
		background-color: $light-grey;
		border: solid 2px $light-grey;
		border-radius: 0 0 10px 10px;
		color: $medium-grey;
		font-size: 1.4rem;
		line-height: 1.3em;
		padding: 1.5rem;
		position: relative;
		text-align: center;
		top: -1.5rem;
	}
}
@media screen and (max-width: 950px) {
	.eaasi-big-button-with-subtext-wrapper {
		.eaasi-big-button-with-subtext {
			padding: 15px;

			.eb-icon {
				margin-bottom: 10px;
			}
		}
	}
}
</style>