<template>
	<form-field-wrapper v-bind="wrapperProps" class="eaasi-text-input" :readonly="readonly" :required="required">
		<div class="eaasi-input-wrapper">
			<div
				:class="[
					'eaasi-input flex-row',
					fieldStatus,
					{ readonly }
				]"
			>
				<input
					v-bind="$attrs"
					v-on="inputListeners"
					:value="value"
					:id="id"
				/>
				<span class="eaasi-field-icon">
					<span :class="`fas fa-${icon}`"></span>
				</span>
				<tooltip v-if="tooltip" :text="tooltip" />
			</div>
		</div>
	</form-field-wrapper>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseFormField from './BaseFormField.vue';
import FormFieldWrapper from './FormFieldWrapper.vue';
import Tooltip from '../Tooltip.vue';

/**
 * A Text Input form field
 * @example ../../docs/TextInput.Example.md
 */
@Component({
	name: 'TextInput',
	components: {
		FormFieldWrapper,
		Tooltip
	}
})
export default class TextInput extends BaseFormField {}

</script>