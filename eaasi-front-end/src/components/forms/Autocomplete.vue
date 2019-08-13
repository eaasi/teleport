<template>
	<form-field-wrapper class="autocomplete-wrapper" v-bind="wrapperProps">
		<div class="eaasi-input-wrapper">
			<div :class="['eaasi-input flex-row', fieldStatus]">
				<input
					v-bind="$attrs"
					v-on="inputListeners"
					:value="value"
					:id="id"
				/>
				<span class="eaasi-field-icon">
					<i :class="`far fa-${icon}`"></i>
				</span>
			</div>
		</div>
		<div class="ac-list" v-show="listVisible" ref="_list">
			<div v-if="loading" class="ac-loading">
				<i class="fas fa-cog fa-spin"></i>
				<span> Searching...</span>
			</div>
			<div v-if="results && !loading">
				<div
					v-for="(r, index) in results"
					:key="r[anchor]"
					@mousedown="selectResult(r)"
					:class="['ac-item', {'highlighted': highlightedIndex === index}]"
					:id="`result${index}`"
				>
					<span>{{ r[anchor] }}</span>
				</div>
			</div>
			<div
				v-if="value && results.length === 0 && !loading"
				:class="['ac-item']"
			>
				No results found for "{{ value }}"
			</div>
		</div>
	</form-field-wrapper>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import BaseFormField from './BaseFormField.vue';
import FormFieldWrapper from './FormFieldWrapper.vue';
import { sortByQuery } from '@/utils/functions';

/**
 * An autocomplete search input with a dropdown list of selectable results
 *
 * @example ../docs/Autocomplete.Example.md
 *
 */
@Component({
	name: 'Autocomplete',
	components: {
		FormFieldWrapper
	}
})
export default class Autocomplete extends BaseFormField {

	$refs!: {
		_list: HTMLFormElement
	}

	/* Props
	============================================*/

	/**
	 * The key of the object value to search by and display
	 */
	@Prop({type: String, required: true})
	readonly anchor: string

	/**
	 * When true, clears the input field when an item is selected
	 */
	@Prop({type: Boolean, required: false})
	readonly clearOnSelect: boolean

	 /**
	 * A local array of objects to search
	 */
	@Prop({type: Array, required: false})
	readonly data: Array<Object>

	/**
	 * A JSON endpoint url for receiving remote objects to search through
	 */
	@Prop({type: String, required: false})
	readonly url: string

	/**
	 *  The text value of the input field
	 */
	@Prop({type: String, required: false})
	readonly value: string

	/* Data
	============================================*/

	failedToLoadResults: boolean = false
	highlightedIndex?: number = null
	loading: boolean = false
	listVisible: boolean = true
	results: Array<any> = []
	timeout?: number = null

	/* Computed
	============================================*/

	get inputListeners() {
		let self = this;
		return Object.assign({}, self.$listeners, {
			blur(event: UIEvent) {
				self.hideList();
			},
			input(event: UIEvent) {
				self.search(event);
			}
		});
	}

	/* Methods
	============================================*/

	handleArrowPress(up: boolean = false) {
		if(up === false && this.highlightedIndex === null) {
			this.highlightedIndex = 0;
		} else {
			let index = this.highlightedIndex;
			index = up ? index - 1 : index + 1;
			if(index >= this.results.length || index < 0) return;
			this.highlightedIndex = index;
		}
		this.scrollToSelectedElement(this.highlightedIndex);
	}

	handleEnterPress() {
		if(this.highlightedIndex !== null && this.results[this.highlightedIndex]) {
			this.selectResult(this.results[this.highlightedIndex]);
		}
	}

	handleKeyDown(e: KeyboardEvent) {
		if(!this.listVisible) return;
		if(e.keyCode === 38) {
			this.handleArrowPress(true);
		} else if(e.keyCode === 40) {
			this.handleArrowPress(false);
		} else if (e.keyCode === 13) {
			this.handleEnterPress();
		} else if(e.keyCode === 27) {
			this.hideList();
		}
	}

	handleListeners(remove: boolean = false) {
		let self = this;
		if(!remove) {
			document.body.addEventListener('keydown', self.handleKeyDown.bind(this));
		} else {
			document.body.removeEventListener('keydown', self.handleKeyDown);
		}
	}

	hideList() {
		this.listVisible = false;
		this.$refs._list.scrollTop = 0;
		this.highlightedIndex = null;
	}

	highlightFirstItem() {
		this.highlightedIndex = 0;
	}

	scrollToSelectedElement(index: number) {
		if(!index) return;
		let el = document.getElementById(`result${index}`);
		if(!el) return;
		let topPos = el.offsetTop;
		if(topPos >= this.$refs._list.clientHeight - 100) {
			this.$refs._list.scrollTop = el.offsetTop - 100;
		} else {
			this.$refs._list.scrollTop = 0;
		}
	}

	search(e: UIEvent) {
		let self = this;
		let query = (e.target as HTMLInputElement).value;
		this.$emit('input', query);
		if(self.timeout) clearTimeout(self.timeout);
		self.timeout = setTimeout(() => {
			if(!query || query.length < 3) {
				return self.hideList();
			}
			query = query.toLowerCase();
			if(!self.url && Array.isArray(self.data)) {
				self.searchLocal(query);
			} else {
				self.searchExternal(query);
			}
			if(self.results.length) {
				// Highlight first option
				self.highlightFirstItem();
			}
		}, 250);
	}

	searchLocal(query: string) {
		let self = this;
		let results = [];
		let key = this.anchor;
		this.data.forEach(val => {
			if(val[key].toLowerCase().indexOf(query) > -1) {
				results.push(val);
			}
		});
		self.results = results.sort((a, b) => {
			return sortByQuery(a[key].toString(), b[key].toString(), query);
		});
		self.listVisible = true;
	}

	searchExternal(query: string) {
		let self = this;
		self.loading = true;
		self.listVisible = true;
		self.failedToLoadResults = false;
		let url = `${self.url}?q=${query}`;
		self.makeRequest(url).then((res: any) => {
			let results = JSON.parse(res);
			let key = self.anchor;
			// Sort the results by the most relevant
			self.results = results.sort((a, b) => {
				return sortByQuery(a[key].toString(), b[key].toString(), query);
			});
			self.loading = false;
		}).catch((xhr) => {
			self.failedToLoadResults = true;
			self.listVisible = false;
			console.warn('autocomplete failed', xhr);
		});
	}

	selectResult(result: any) {
		this.$emit('select', result);
		let newVal = result[this.anchor];
		if(this.clearOnSelect === true) newVal = '';
		this.$emit('input', newVal);
		this.hideList();
	}

	makeRequest(url: string) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onload = () => resolve(xhr.response);
			xhr.onerror = () => reject(xhr);
			xhr.send();
		});
	}

	/* Lifecycle Hooks
	============================================*/

	beforeDestroy() {
		this.handleListeners(true);
	}

	mounted() {
		this.handleListeners();
	}

}

</script>

<style lang="scss">
.autocomplete-wrapper {
	position: relative;
}

.ac-list {
	background-color: white;
	box-shadow: 1px 4px 8px 0 rgba(17, 12, 12, 0.2);
	left: 0;
	max-height: 300px;
	overflow-y: scroll;
	position: absolute;
	right: 0;
	top: 5.3rem;
	z-index: 2;
}

.ac-item {
	cursor: pointer;
	padding: 10px;
	user-select: none;

	&:hover {
		background-color: #eee;
	}

	&.highlighted {
		background-color: lighten($light-blue, 90%);
	}
}

.ac-loading {
	color: #aaa;
	padding: 10px;
}
</style>
