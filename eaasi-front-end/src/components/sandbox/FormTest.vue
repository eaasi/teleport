<template>
	<div class="form-test">
		<eaasi-form ref="_form">
			<autocomplete
				anchor="email"
				url="https://jsonplaceholder.typicode.com/comments"
				v-model="autoInput"
				label="Autocomplete Input"
				rules="required"
			/>
			<text-input
				label="Text Input"
				v-model="text"
				rules="required|email"
			/>
			<text-area-input
				label="Text Area Input"
				v-model="textAreaText"
				rules="required"
			/>
			<select-list label="Select List" v-model="selected">
				<option value="Option 1">Option 1</option>
				<option value="Option 1">Option 2</option>
				<option value="Option 1">Option 3</option>
			</select-list>
			<checkbox label="Checkbox" v-model="checked" />

			<radio-buttons
				name="radio-options"
				v-model="radio"
				:values="radios"
				label="Radio Buttons"
			/>
		</eaasi-form>
		<ui-button @click="$refs._form.submit()">
			Submit
		</ui-button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class FormTest extends Vue {
	autoInput: string = ''
	checked: boolean = false
	text: string = ''
	textAreaText: string = ''
	radio: string = 'Option 1'
	radios: string[] = [
		'Option 1',
		'Option 2',
		'Option 3'
	]
	selected: string = 'Option 1'
}
</script>