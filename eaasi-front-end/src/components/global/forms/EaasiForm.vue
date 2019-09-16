<template>
	<div class="eaasi-form" role="form">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import BaseFormField from './BaseFormField.vue';

/**
 * A form wrapper for BaseFormField components
 * @example ../../docs/EaasiForm.Example.md
 */
@Component({
	name: 'EaasiForm',
})
export default class EaasiForm extends Vue {

	/* Data
	============================================*/

	errors: string[] = []

	/* Computed
	============================================*/

	isValid() {
		return this.errors.length === 0;
	}

	/* Methods
	============================================*/

	setChildrenCanValidate(component: Vue, canValidate: boolean): void {
		let self = this;
		if(component.hasOwnProperty('canValidate')) {
			(component as BaseFormField).canValidate = canValidate;
		}
		if(component.$children && component.$children.length > 0) {
			for(let i=0; i<component.$children.length; i++) {
				self.setChildrenCanValidate(component.$children[i], canValidate);
			}
		}
	}

	submit(): void {
		let self = this;
		self.setChildrenCanValidate(self, true);
		self.$nextTick(() => {
			let valid = self.validateChildren();
			if(!valid) return;
			self.$emit('submit');
			self.setChildrenCanValidate(self, false);
		});
	}

	validateChildren(): boolean {
		this.errors = [];
		this.validateComponent(this);
		return this.errors.length === 0;
	}

	validateComponent(component: Vue): void {
		if(component.hasOwnProperty('validate')) {
			let error = (component as BaseFormField).validate();
			if(error !== null) this.errors.push(error);
			this.validateComponentChildren(component);
		} else {
			this.validateComponentChildren(component);
		}
	}

	validateComponentChildren(component: Vue): void {
		if(component.$children && component.$children.length > 0) {
			for(let i=0; i<component.$children.length; i++) {
				this.validateComponent(component.$children[i]);
			}
		}
	}

}

</script>

<style lang="scss"></style>