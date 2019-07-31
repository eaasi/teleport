<template>
	<div class=""></div>
</template>

<script lang="ts">
import Vue from 'vue';
import validator from '@/utils/form-validator';
import { Component, Prop, Watch } from 'vue-property-decorator';

// A template-less base component for all form input fields
@Component({
	name: 'BaseFormField',
})
export default class BaseFormField extends Vue {

	/* Props
	============================================*/

	// Hides the label when try
	@Prop({type: Boolean, required: false})
	readonly hideLabel: boolean

	// The label to display above the field
	@Prop({type: String, required: false})
	readonly label: string

	// Pipe "|" delimited validation rules
	@Prop({type: [String, Function], required: false})
	readonly rules: string | Function

	// The value of the field
	@Prop({required: true})
	readonly value: any

	/* Data
	============================================*/

	canValidate: boolean = false
	error: string | null = null
	id: string = Math.random().toString(36).substr(2, 10);
	warning: string | null = null

	/* Computed
	============================================*/

	get fieldStatus(): string {
		if(this.error !== null) return 'error';
		if(this.warning !== null) return 'warning';
		if(this.isValid) return 'valid';
		return '';
	}

	get icon() {
		switch(this.fieldStatus) {
		case 'error':
			return 'exclamation-triangle';
		case 'valid':
			return 'check';
		}
	}

	get inputListeners(): Object {
		let self = this;
		return Object.assign({}, this.$listeners, {
			change(event) {
				self.$emit('change', event.target.value);
			},
			input(event) {
				self.$emit('input', event.target.value);
			}
		});
	}

	get isRequired(): boolean {
		return typeof this.rules === 'string'
			&& this.rules.indexOf('required') > -1;
	}

	get isValid(): boolean {
		return this.canValidate && this.error === null;
	}

	get wrapperProps() {
		return {
			hideLabel: this.hideLabel,
			label: this.label,
			error: this.error,
			required: this.isRequired
		};
	}

	/* Methods
	============================================*/

	validate(): string | null {
		let error = null;

		if(!this.canValidate || !this.rules) {
			return error;
		}

		if(typeof this.rules === 'string') {
			error = validator.validate(this.rules, this.value, this.label);
		}

		else if(typeof this.rules === 'function') {
			error = this.rules(this.value);
		}

		if(error !== null) {
			this.$emit('error', error);
		}

		this.error = error;

		return error;
	}

	/* Watchers
	============================================*/

	@Watch('value')
	onValueUpdated(newVal: any, oldVal: any) {
		if(newVal !== oldVal) {
			this.validate();
		}
	}

	@Watch('rules')
	onRulesUpdated(newVal: any, oldVal: any) {
		if(newVal !== oldVal) {
			this.validate();
		}
	}

}

</script>

<style lang="scss"></style>