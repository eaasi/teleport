<template>
	<form-field-wrapper class="eaasi-select eaasi-search-select" v-bind="wrapperProps">
		<div class="eaasi-input-wrapper">
			<div
				:class="['eaasi-input flex-row relative', fieldStatus, { readonly }]"
			>
				<input
					:value="query"
					@input="onQueryChange"
					@focus="openList"
					type="text"
					ref="search_input"
					class="search-select-list eaasi-input"
					:placeholder="placeholder"
					:disabled="readonly"
				/>
				<span class="clear" v-show="query != null && query != ''">
					<span class="fas fa-times" @click="clearQuery"></span>
				</span>
				<span class="fas fa-chevron-down cursor-pointer" @click="toggleList"></span>
				<div v-if="!filteredData.length" class="select-list flex flex-center" v-show="showList">
					No Result
				</div>
				<ul v-else class="select-list" v-show="showList">
					<li
						v-for="item in filteredData"
						:key="generateKey(item[anchor])"
						class="select-item clickable"
						@click="selectItem(item)"
					>
						<button class="tr-btn">
							{{ item[optionLabel] }}
						</button>
					</li>
				</ul>
			</div>
		</div>
	</form-field-wrapper>
</template>

<script lang="ts">
import { uniqueId } from 'lodash';
import { Component, Prop, Watch } from 'vue-property-decorator';
import BaseFormField from './BaseFormField.vue';
import FormFieldWrapper from './FormFieldWrapper.vue';

/**
 * A search select list form input
 * @example ../../docs/SearchSelectList.Example.md
 */
@Component({
	name: 'SearchSelectList',
	components: {
		FormFieldWrapper
	}
})
export default class SearchSelectList extends BaseFormField {

	/* Props
	============================================*/
	@Prop({ type: String, required: true })
	readonly optionLabel: string;

	@Prop({ type: String, required: true })
	readonly anchor: string;

	@Prop({ type: String })
	readonly placeholder: string;

	@Prop({ type: Array, required: true })
	readonly data: any[];

	/* Computed
	============================================*/
	get filteredData() {
		if (!this.query) return this.data;
		return this.data.filter(d => d[this.optionLabel].trim().toLowerCase().indexOf(this.query.trim().toLowerCase()) >= 0);
	}

	/* Data
	============================================*/
	query: string = null;
	showList: boolean = false;

	onQueryChange(e) {
		const query = e.target.value;
		this.query = query;
		if (query.length > 0) {
			this.showList = true;
		} else {
			this.clearQuery();
		}
	}

	selectItem(item) {
		this.query = item[this.optionLabel];
		this.$emit('input', item[this.anchor]);
		this.closeList();
	}

	openList() {
		this.showList = true;
	}

	toggleList() {
		this.showList ? this.closeList() : this.openList();
	}

	closeList() {
		this.showList = false;
	}

	clearQuery() {
		this.query = null;
		this.$emit('input', null);
	}

	generateKey(prefix: string): string {
		return uniqueId(prefix);
	}

	@Watch('value')
	onValueChange(nextVal, prevVal) {
		if (nextVal === prevVal) return;
		if (!nextVal) this.clearQuery();
		const newItem = this.data.find(item => item[this.anchor] === nextVal);
		if (newItem) {
			this.selectItem(newItem);
		}
	}

}

</script>

<style lang="scss">
.eaasi-search-select {

	.select-list {
		background: $light-grey;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
		left: 0;
		max-height: 20rem;
		min-height: 10rem;
		overflow-y: scroll;
		position: absolute;
		right: 0;
		top: 5rem;
		z-index: 2;

		.select-item {
			margin-bottom: 0.75rem;
			margin-top: 0.75rem;
			button {
				font-size: 1.6rem;
			}

			&.clickable {
				cursor: pointer;
				&:hover {
					color: #000000;
				}
			}
		}
	}

	.fa-times,
	.fa-chevron-down {
		display: block;
		margin: 0 0.5rem;
	}
}
</style>