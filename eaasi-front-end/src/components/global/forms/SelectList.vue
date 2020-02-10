<template>
	<form-field-wrapper class="eaasi-select" v-bind="wrapperProps">
		<div class="eaasi-input-wrapper">
			<div :class="['eaasi-input flex-row relative', fieldStatus, {readonly}]">
				<select
					v-bind="$attrs"
					v-on="inputListeners"
					:value="value"
					:id="id"
				>
					<slot></slot>
				</select>
				<span class="eaasi-field-icon">
					<span class="fas fa-chevron-down"></span>
				</span>
			</div>
		</div>
	</form-field-wrapper>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseFormField from './BaseFormField.vue';
import FormFieldWrapper from './FormFieldWrapper.vue';

/**
 * A select list form input
 * @example ../../docs/SelectList.Example.md
 */
@Component({
	name: 'SelectList',
	components: {
		FormFieldWrapper
	}
})
export default class SelectList extends BaseFormField {}

</script>

<style>
.eaasi-field-icon {
	position: absolute;
	top: 0.85rem;
	right: 0.6rem;
	pointer-events: none;
}
</style>