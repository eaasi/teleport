<template>
	<form-field-wrapper
		:class="['eaasi-checkbox', { 'no-label': !label }]"
		v-bind="wrapperPropsExtended"
		:readonly="disabled"
	>
		<label :disabled="disabled" :for="UUID" :id="UUID_label">
			<span>{{ label }}</span>
			<span class="hide-label">checkbox to select {{ name }} with value {{ value }}</span>
			<input
				:id="UUID"
				type="checkbox"
				role="checkbox"
				:aria-label="`checkbox to select ${label} with value ${value}`"
				:aria-labelledby="UUID_label"
				:aria-checked="value"
				v-bind="$attrs"
				:checked="value"
				@change="handleChange"
				:disabled="disabled"
			/>
			<span :class="['checkmark', { checked: value, disabled, indeterminate }]"></span>
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
	readonly value: boolean;

	@Prop({type: String})
	readonly name: string;

	@Prop({ type: Boolean })
	readonly disabled: boolean;

	@Prop({ type: Boolean, default: false })
	readonly indeterminate: boolean;

	/* Data
    ============================================*/
	UUID: string = self.crypto === undefined ? '' : self.crypto?.randomUUID();
	UUID_label: string = self.crypto === undefined ? '' : self.crypto?.randomUUID();


	handleChange(event) {
		if (this.disabled) return;
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
		display: flex;
		font-size: 1.4rem;
		height: $checkboxSize + 6px;
		padding-left: $checkboxSize + 10px;
		position: relative;
		user-select: none;

		&[disabled] {
			cursor: not-allowed;
		}

		input {
			cursor: pointer;
			height: 0;
			opacity: 0;
			position: absolute;
			width: 0;
		}

		span {
			height: $checkboxSize;
			margin: auto;
			text-transform: capitalize;
		}

		.hide-label {
			display: none;
		}
	}

	.checkmark {
		background-color: #ffffff;
		border: 2px solid $medium-grey;
		border-radius: 0.5em;
		height: $checkboxSize;
		left: 0;
		position: absolute;
		top: 0;
		width: $checkboxSize;
		&.checked {
			border: 2px solid transparent;
		}
		&.indeterminate::after {
			background-color: $dark-grey;
			border-radius: 2px;
			display: block;
			height: 3px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 12px;
		}
	}

	label input:checked ~ .checkmark {
		background-color: $dark-grey;
		&.disabled {
			opacity: 0.4;
		}
	}

	.checkmark::after {
		content: '';
		display: none;
		position: absolute;
	}

	label .checkmark.checked::after {
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
		padding-left: $checkboxSize + 4px;
	}

	.checkmark {
		left: 0;
		top: 0;
	}
}

.select-archive-group {
	.eaasi-checkbox {
		label {
			align-items: center;

			span {
				margin: 0;
			}
		}
	}
}
</style>