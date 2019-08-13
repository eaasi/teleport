<template>
	<form-field-wrapper class="eaasi-radios" v-bind="{...wrapperProps, hideLabel: true}">
		<div v-if="label" class="eaasi-label">
			{{ label }}
		</div>
		<label
			:class="['radio', {inline}]"
			v-for="o in options"
			:key="o.value"
		>
			<input
				type="radio"
				:checked="radioIsChecked(o.value)"
				:id="id"
				:name="name"
				:value="o.value"
				@change="changeVal(o.value)"
				v-bind="$attrs"
			/>
			{{ o.label }}
		</label>
	</form-field-wrapper>
</template>

<script lang="ts">

import { Component, Prop } from 'vue-property-decorator';
import BaseFormField from './BaseFormField.vue';
import FormFieldWrapper from './FormFieldWrapper.vue';
import { IRadioOption } from '@/types/Forms';

function isRadioOption(object: any): object is IRadioOption {
	if(typeof object !== 'object') return false;
	return 'label' in object && 'value' in object;
}

/**
 * A Radio button component
 * @example ../docs/RadioButtons.Example.md
 */
@Component({
	name: 'RadioButtons',
	components: {
		FormFieldWrapper
	}
})
export default class RadioButtons extends BaseFormField {

	/* Props
	============================================*/

	// Whether or not to display the radio buttons inline
	@Prop({type: Boolean, required: false})
	readonly inline: Boolean

	// The shared name attribute
	@Prop({type: String, required: true})
	readonly name: String

	// A list of strings or IRadioButtons to display as radio buttons
	@Prop({type: Array, required: true})
	readonly values: Array<string> | Array<IRadioOption>


	@Prop({required: true})
	readonly value: any

	/* Computed
	============================================*/

	get options(): Array<IRadioOption> {
		if(!this.values.length) return [];
		if(isRadioOption(this.values[0])) {
			return this.values as Array<IRadioOption>;
		}
		let opts = new Array<IRadioOption>();
		for(let i=0;i<this.values.length;i++) {
			opts.push({
				value: this.values[i],
				label: (this.values[i] as string)
			});
		}
		return opts;
	}

	/* Methods
	============================================*/

	changeVal(value) {
		this.$emit('input', value);
	}

	radioIsChecked(value) {
		return this.value === value;
	}

}

</script>

<style lang="scss">
.eaasi-radios {
	.eaasi-label {
		display: block;
	}

	label.inline {
		display: inline-block;
		margin-left: 1.5rem;

		&:first-child {
			margin-left: 0;
		}
	}
}
</style>