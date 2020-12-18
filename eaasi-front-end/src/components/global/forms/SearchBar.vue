<template>
	<form-field-wrapper v-bind="wrapperProps" class="eaasi-search-bar">
		<div class="eaasi-input-wrapper" :style="{'border': `solid 2px ${borderColor}`}">
			<div :class="['eaasi-input flex-row', fieldStatus, {readonly}]">
				<div classs="sb-content-left">
					<slot name="left">
						<span class="fal fa-search"></span>
					</slot>
				</div>
				<input
					v-bind="$attrs"
					v-on="inputListeners"
					:value="value"
					:id="id"
				/>
				<span class="cursor-pointer" v-show="value" @click="$emit('clear')" style="margin-right: 0.5rem;">
					<span class="fas fa-times"></span>
				</span>
				<span class="eaasi-field-icon" @click="$emit('search')">
					<span class="fas fa-chevron-circle-right"></span>
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
 * A text-input styled specifically for search keyword input
 * @example ../../docs/SearchBar.Example.md
 */
@Component({
	name: 'SearchBar',
	components: {
		FormFieldWrapper
	}
})
export default class SearchBar extends BaseFormField {

	/* Props
	============================================*/

	/**
	 * The color of the input border
	 */
	@Prop({type: String, required: false, default: '#1C5F6B'})
	readonly borderColor: string

}

</script>

<style lang="scss">
.eaasi-search-bar {

	.eaasi-input-wrapper {
		border-radius: 6px;
		overflow: hidden;
		padding-bottom: 0;
	}

	.eaasi-input {
		background-color: #FFFFFF;
	}

	.eaasi-field-icon {
		color: darken($dark-blue, 40%);
		cursor: pointer;
		font-size: 21px;
	}

	.fa-search {
		color: darken($light-neutral, 80%);
		font-size: 1.4rem;
		margin: 0 0.6rem;
	}
}
</style>