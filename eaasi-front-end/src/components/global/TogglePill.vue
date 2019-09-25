<template>
	<div class="pill-toggle-container">
		<div class="pill-toggle-front-container">
			<div class="submit-option">
				<input id="left-option"  name="choice" type="radio" />
				<input id="right-option" name="choice" type="radio" />

				<label for="left-option" class="option-label left-option">
					{{ leftOption.displayName }}
				</label>

				<div class="pill-toggle-front"></div>

				<div class="pill-toggle-back"></div>

				<label for="right-option" class="option-label right-option">
					{{ rightOption.displayName }}
				</label>

			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'TogglePill'
})
export default class TogglePill extends Vue {
	@Prop({
		type: Array as () => EditModeOption[],
		required: true,
		validator: (opts) => opts.length == 2 })
	options: EditModeOption[];

	leftOption: EditModeOption = this.options[0]
	rightOption: EditModeOption = this.options[1]
};
</script>

<style lang="scss">

	.pill-toggle-container {
		max-width: 520px;
		min-width: 220px;
		position: relative;

		.submit-option {
			align-items: center;
			display: flex;
			justify-content: space-between;
		}


		input {
			display: none;
		}

		.left-option {
			border: 2px solid orange;
			padding: 0.8rem;
			z-index: 5;
		}

		.right-option {
			border: 2px solid orange;
			padding: 0.8rem;
			z-index: 5;
		}

		.pill-toggle-back {
			background: #DED0C7;
			border-radius: 500px;
			display: flex;
			flex-direction: row;
			height: 32px;
			position: relative;
			transition: all 100ms;
			width: 260px;
		}

		.pill-toggle-front {
			background-color: #ffffff;
			border: 2px solid $dark-blue;
			border-radius: 500px;
			height: 38px;
			left: 120px;
			position: absolute;
			transition: all 500ms;
			width: 160px;
			z-index: 4;
		}
	}

	.option-label {
		color: darken($grey, 80%);
		cursor: pointer;
		font-size: 1.6rem;
		position: relative;
		transition: 300ms;
		z-index: 4;
	}

	.option-label:hover,
	.option-label:active {
		color: $dark-blue;
	}

	/*
    Toggle Changes
    */

	#left-option:checked ~ .left-option {
		color: darken($teal, 20%);
	}

	#left-option:checked ~ .right-option {
		color: darken($teal, 20%);
	}

	#right-option:checked ~ .left-option {
		color: darken($teal, 20%);
	}

	#right-option:checked ~ .right-option {
		color: darken($grey, 50%);
	}

	#right-option:checked ~ .pill-toggle-front {
		left: 282px;
	}
</style>
