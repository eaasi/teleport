<template>
	<form-field-wrapper v-bind="wrapperProps" class="eaasi-text-input">
		<div class="eaasi-input-wrapper">
			<div :class="['eaasi-input flex-row', fieldStatus]">
				<input
					v-bind="$attrs"
					v-on="inputListeners"
					:value="value"
					:id="id"
				/>
				<span class="eaasi-field-icon">
					<i :class="`far fa-${icon}`"></i>
				</span>
			</div>
		</div>
	</form-field-wrapper>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseFormField from './BaseFormField.vue';
import FormFieldWrapper from './FormFieldWrapper.vue';

// A validatable text input
@Component({
	name: 'TextInput',
	components: {
		FormFieldWrapper
	}
})
export default class TextInput extends BaseFormField {}

</script>