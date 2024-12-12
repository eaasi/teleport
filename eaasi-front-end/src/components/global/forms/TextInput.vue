<template>
	<form-field-wrapper v-bind="wrapperProps" class="eaasi-text-input" :readonly="readonly" :required="required">
		<div class="eaasi-input-wrapper">
			<div
				:class="[
					'eaasi-input',
					fieldStatus,
					{ readonly }
				]"
			>
				<label :for="id" v-if="label && !hideLabel" class="eaasi-label">
					{{ label }}
					<span v-if="!required && !readonly" class="ef-optional"> &mdash; optional</span>
				</label>
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
import { Component, Prop } from 'vue-property-decorator';
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
export default class TextInput extends BaseFormField {

	/* Props
	============================================*/

	@Prop({type: Boolean, required: false})
	readonly hideLabel: boolean;

	@Prop({type: String, required: false})
	readonly label: string;
}

</script>

<style lang="scss">
.eaasi-label {
	color: $dark-light-grey;
	display: inline-block;
	font-size: 1.2rem;
	margin-bottom: 10px;
	margin-right: 0.5rem;
	text-transform: uppercase;
}

.ef-optional {
	text-transform: none;
}
</style>