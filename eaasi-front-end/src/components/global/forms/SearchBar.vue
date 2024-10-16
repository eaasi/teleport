<template>
	<form-field-wrapper v-bind="wrapperProps" class="eaasi-search-bar">
		<div class="eaasi-input-wrapper">
			<div :class="['eaasi-input flex-row', fieldStatus, {readonly}]">
				<label :for="id" classs="sb-content-left">
					<slot name="left">
						<span class="fas fa-search"></span>
						<span class="hide">Search</span>
					</slot>
				</label>
				<input
					v-bind="$attrs"
					v-on="inputListeners"
					:value="value"
					:id="id"
					aria-label="search"
				/>
				<span
					class="cursor-pointer"
					v-show="!showSearchChevron"
					@click="$emit('clear')"
					style="margin-right: 0.5rem;"
				>
					<span class="fas fa-times"></span>
				</span>
				<span
					class="eaasi-field-icon"
					@click="$emit('search')"
				>
					<span
						v-show="showSearchChevron"
						class="fas fa-chevron-circle-right"
					>
					</span>
				</span>
			</div>
		</div>
	</form-field-wrapper>
</template>

<script lang="ts">
import { IResourceSearchQuery } from '@/types/Search';
import {isSpaces} from '@/utils/functions';
import { Component, Prop } from 'vue-property-decorator';
import {Get, Sync} from 'vuex-pathify';
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

	/* Computed
	============================================*/

	@Get('resource/query@keyword')
	queryKeyword: string;

	@Get('resource/lastSearchKeyword')
	lastSearchKeyword: string;

	get showSearchChevron() {
		if (!this.queryKeyword || isSpaces(this.queryKeyword)) {
			return true;
		}
		if (this.queryKeyword as string === '' && this.lastSearchKeyword === '') {
			return true;
		}
		return this.queryKeyword as string !== this.lastSearchKeyword || this.queryKeyword as string === '';
	}

}

</script>

<style lang="scss">
.eaasi-search-bar {

	.eaasi-input-wrapper {
		border-radius: 6px;
		overflow: hidden;
		padding-bottom: 0;
		width: fit-content;
	}

	.eaasi-input {
		background-color: #FFFFFF;
		max-width: 300px;
		min-width: 230px;
	}

	.eaasi-field-icon {
		color: rgba(0, 0, 0, 0.6);
		cursor: pointer;
		font-size: 20px;
	}

	.fa-search {
		color: $dark-light-grey;
		font-size: 1.4rem;
		margin: 0 0.6rem;
	}

	.hide {
		display: none;
	}
}
</style>