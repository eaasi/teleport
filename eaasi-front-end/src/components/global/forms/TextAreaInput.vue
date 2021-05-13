<template>
	<form-field-wrapper v-bind="wrapperProps" class="eaasi-text-area" :readonly="readonly">
		<div class="eaasi-input-wrapper">
			<div :class="['eaasi-input flex-row', fieldStatus, {readonly}]">
				<textarea
					:id="id"
					:value="value"
					:rows="rows"
					v-bind="$attrs"
					v-on="inputListeners"
				>
				</textarea>
				<span class="eaasi-field-icon">
					<span :class="`fas fa-${icon}`"></span>
				</span>
			</div>
		</div>
	</form-field-wrapper>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import BaseFormField from './BaseFormField.vue';
import FormFieldWrapper from './FormFieldWrapper.vue';

/**
 * A text area input form field
 * @example ../../docs/TextAreaInput.Example.md
 */
@Component({
	name: 'TextAreaInput',
	components: {
		FormFieldWrapper
	}
})
export default class TextAreaInput extends BaseFormField {

	// The number of rows to display
	@Prop({type: [Number, String], default: 4})
	readonly rows: number | string

}

</script>

<style>
	.eaasi-field-input textarea {
		resize: vertical;
	}
</style>