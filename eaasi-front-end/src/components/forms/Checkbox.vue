<template>
	<form-field-wrapper class="eaasi-checkbox" v-bind="wrapperPropsExtended">
		<label>
			<span>{{ label }}</span>
			<input
				type="checkbox"
				v-bind="$attrs"
				:checked="value"
				@change="handleChange"
			/>
			<span class="checkmark"></span>
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
 * @example ../docs/Checkbox.Example.md
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
$checkboxSize: 20px;

.eaasi-checkbox {
	height: $checkboxSize;

	label {
		cursor: pointer;
		font-size: 1.3rem;
		height: $checkboxSize;
		padding-left: $checkboxSize + 8px;
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
			top: 2px;
		}
	}

	.checkmark {
		background-color: #fff;
		border: 1px solid $light-sky-blue;
		border-radius: 0.5em;
		height: $checkboxSize;
		left: 3px;
		position: absolute;
		top: 3px;
		width: $checkboxSize;
	}

	label input:checked ~ .checkmark {
		background-color: $dark-sky-blue;
	}

	.checkmark::after {
		content: "";
		display: none;
		position: absolute;
	}

	label .checkmark::after {
		border: solid white;
		border-width: 0 3px 3px 0;
		height: 10px;
		left: 6px;
		top: 2px;
		transform: rotate(45deg);
		width: 5px;
	}

	label input:checked ~ .checkmark::after {
		display: block;
	}
}
</style>