<template>
	<div class="eaasi-form-control">
		<label v-if="label && !hideLabel" class="eaasi-label">
			{{ label }}
		</label>
		<span class="error" role="alert" v-if="error">
			{{ error }}
		</span>
		<slot></slot>
		<slot name="below-field"></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * Wrapper for form fields.  Provides a label and error alert for a slotted field.
 * Provides two slots, a default and a named slot `below-field`
 * @example ../docs/FormFieldWrapper.Example.md
 */
@Component({
	name: 'FormFieldWrapper',
})
export default class FormFieldWrapper extends Vue {

	/* Props
	============================================*/

	// Hides the label when try
	@Prop({type: Boolean, required: false})
	readonly hideLabel: boolean

	// The label to display above the field
	@Prop({type: String, required: false})
	readonly label: string

	// An error message to display
	@Prop({type: String, required: false})
	readonly error: string

	// Whether or not the wrapped field is required
	@Prop({type: Boolean, required: false})
	readonly required: boolean


}

</script>

<style lang="scss">
.eaasi-form-control {
	margin-bottom: 2rem;

	.eaasi-input-wrapper {
		border-bottom: solid 3px $light-blue;
		padding-bottom: 3px;
	}

	.eaasi-label {
		color: #A8A29E;
		display: inline-block;
		font-size: 1.2rem;
		margin-bottom: 3px;
		margin-right: 0.5rem;
		text-transform: uppercase;
	}

	.error {
		color: $red;
		font-size: 1.2rem;
	}
}

.eaasi-input {
	background-color: lighten($light-blue, 90%);
	overflow: visible;
	padding: 0.6rem;

	input,
	select,
	textarea {
		appearance: none;
		background-color: transparent;
		border: none;
		display: block;
		font-size: 1.6rem;
		outline: none;
		width: 100%;

		&::placeholder {
			color: #888;
		}
	}

	&.error {
		background-color: lighten($red, 80%);

		span {
			color: $red;
		}
	}

	&.valid {
		background-color: lighten($green, 80%);

		span {
			color: $green;
		}
	}
}

.eaasi-field-icon {
	font-size: 1.6rem;
}
</style>