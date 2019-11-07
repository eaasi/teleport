<template>
	<form-field-wrapper :class="['eaasi-checkbox', {'no-label': !label}]" v-bind="wrapperPropsExtended">
		<label>
			<span>{{ label }}</span>
			<input
				type="checkbox"
				v-bind="$attrs"
				:checked="value"
				@change="handleChange"
			/>
			<span :class="['checkmark', {checked: value}]"></span>
		</label>
	</form-field-wrapper>
</template>

<script lang="ts">
import BaseFormField from './BaseFormField.vue';
import { Component, Prop } from 'vue-property-decorator';
import FormFieldWrapper from './FormFieldWrapper.vue';

/**
 * A Checkbox form element
 *
 * @example ../../docs/Checkbox.Example.md
 *
 */
@Component({
	name: 'Checkbox',
	components: {
		FormFieldWrapper
	}
})
export default class Checkbox extends BaseFormField {

	@Prop({type: Boolean, required: true})
	readonly value: boolean

	handleChange(event) {
		this.$emit('change', event);
		this.$emit('input', !this.value);
	}

	get wrapperPropsExtended() {
		return {
			...this.wrapperProps,
			hideLabel: true
		};
	}

}

</script>

<style lang="scss">
$checkboxSize: 18px;

.eaasi-checkbox {

	label {
		cursor: pointer;
		display: block;
		font-size: 1.4rem;
		height: $checkboxSize + 6px;
		padding-left: $checkboxSize + 10px;
		position: relative;
		user-select: none;

		input {
			cursor: pointer;
			height: 0;
			opacity: 0;
			position: absolute;
			width: 0;
		}

		span {
			height: $checkboxSize;
			position: relative;
			text-transform: capitalize;
			top: 7px;
		}
	}

	.checkmark {
		background-color: #ffffff;
		border: 2px solid $light-blue;
		border-radius: 0.6em;
		height: $checkboxSize;
		left: 0;
		position: absolute;
		top: 0;
		width: $checkboxSize;
		&.checked {
			border: 2px solid $dark-blue;
		}
	}

	label input:checked ~ .checkmark {
		background-color: $dark-blue;
	}

	.checkmark::after {
		content: '';
		display: none;
		position: absolute;
	}

	label .checkmark::after {
		border: solid #FFFFFF;
		border-width: 0 3px 3px 0;
		height: 10px;
		left: 5px;
		top: 1px;
		transform: rotate(45deg);
		width: 5px;
	}

	label input:checked ~ .checkmark::after {
		display: block;
	}
}

.eaasi-checkbox.no-label {
	display: inline-block;

	label {
		height: $checkboxSize + 2px; // account for border
		padding-left: $checkboxSize + 2px;
	}

	.checkmark {
		left: 0;
		top: 0;
	}
}
</style>