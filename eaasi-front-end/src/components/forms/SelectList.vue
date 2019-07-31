<template>
	<form-field-wrapper class="eaasi-select" v-bind="wrapperProps">
		<div class="eaasi-input-wrapper">
			<div :class="['eaasi-input flex-row', fieldStatus]">
				<select
					v-bind="$attrs"
					v-on="inputListeners"
					:value="value"
					:id="id"
				>
					<slot></slot>
				</select>
				<span class="eaasi-field-icon">
					<i class="far fa-chevron-down"></i>
				</span>
			</div>
		</div>
	</form-field-wrapper>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseFormField from './BaseFormField.vue';
import FormFieldWrapper from './FormFieldWrapper.vue';

// A validatable select list input
@Component({
	name: 'SelectList',
	components: {
		FormFieldWrapper
	}
})
export default class SelectList extends BaseFormField {}

</script>