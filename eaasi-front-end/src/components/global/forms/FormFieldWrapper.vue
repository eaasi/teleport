<template>
	<div class="eaasi-form-control">
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
 * @example ../../docs/FormFieldWrapper.Example.md
 */
@Component({
	name: 'FormFieldWrapper',
})
export default class FormFieldWrapper extends Vue {

	/* Props
	============================================*/

	// An error message to display
	@Prop({type: String, required: false})
	readonly error: string;

	// Whether or not the wrapped field is required
	@Prop({type: Boolean, required: false})
	readonly required: boolean;

	@Prop({ type: Boolean, default: false })
	readonly readonly: boolean;

}

</script>

<style lang="scss">
.eaasi-form-control {

	.eaasi-input-wrapper {
		padding-bottom: 3px;
	}

	.error {
		color: $red;
		font-size: 1.2rem;
	}
}

.eaasi-input {
	overflow: visible;
	color: black;
	display: flex;
	flex-direction: column;

	input,
	select,
	textarea {
		appearance: none;
		border: none;
		display: block;
		font-size: 1.6rem;
		outline: none;
		width: -webkit-fill-available;
		background-color: $light-green-background;
		padding: 10px;
		border-radius: 15px;

		&::placeholder {
			color: $dark-light-grey;
		}
	}

	input {
		padding-bottom: 5px;
		border-bottom: 2px solid $green;
	}

	&.readonly {
		background-color: transparent;

		input,
		select,
		textarea {
			color: black;
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