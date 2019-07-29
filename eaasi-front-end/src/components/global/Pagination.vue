<template>
	<div class="pagination-wrapper" v-if="numPages > 1">
		<div><label>{{ totalText }}</label></div>
		<ul class="pagination">
			<li
				@click="paginate(1)"
				:class="['page-arrow', {'hide-page': !showGoToStart }]"
				v-if="numPages > maxPages"
			>
				<a href="javascript:void(0);">&#10094;&#10094;</a>
			</li>
			<li
				@click="paginate(currentPage - 1)"
				:class="['page-arrow', {'hide-page': currentPage <= 1}]"
			>
				<a href="javascript:void(0);">&#10094;</a>
			</li>
			<li
				v-for="p in pages"
				:class="{'active': p == currentPage}"
				@click="paginate(p)"
				:key="p"
			>
				<a href="javascript:void(0);">{{ p }}</a>
			</li>
			<li
				@click="paginate(currentPage + 1)"
				:class="['page-arrow', {'hide-page': currentPage >= numPages}]"
			>
				<a href="javascript:void(0);">&#10095;</a>
			</li>
			<li
				@click="paginate(numPages)"
				:class="['page-arrow', {'hide-page': !showGoToEnd }]"
				v-if="numPages > maxPages"
			>
				<a href="javascript:void(0);">&#10095;&#10095;</a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
	name: 'Pagination'
})
export default class Pagination extends Vue {

	/* Props
	============================================*/

	@Prop({type: Number, required: true})
	readonly totalResults: number;

	@Prop({type: Number, default: 25})
	readonly resultsPerPage: number = 25;

	@Prop({type: Number, default: 4})
	readonly maxPages: number = 4;

	@Prop({type: Number})
	readonly pageNum: number = 1;

	/* Data
	============================================*/

	currentPage: number = 1;
	pages: Array<number> = [];
	numPages: number = 1;
	showGoToStart: boolean = false;
	showGoToEnd: boolean = false

	/* Computed
	============================================*/

	get totalText(): string {
		let total = this.totalResults;
		let start = this.currentPage > 1
			? (this.currentPage - 1) * this.resultsPerPage
			: 1;
		let end = this.currentPage * this.resultsPerPage;
		end = end > total ? total : end;
		return `Showing ${start} - ${end} of ${total}`;
	}

	/* Methods
	============================================*/

	updateResult(): void {

		// Get pagingation data
		let numPages = Math.ceil(this.totalResults / this.resultsPerPage);
		let start = 1, end = numPages;
		let pages = [];
		let max = this.maxPages;
		let middle = Math.floor(max / 2);

		// Limit to show only X page numbers at a time.
		if(numPages > max) {
			// Active page should be third number, unless it is within 2 pages of
			// the first or last page, then adjust accordingly
			start = this.currentPage - middle;
			end = this.currentPage + (max - middle - 1);
			if(start < 1) start = 1;
			if (end <= max) end = (max > numPages ? numPages : max);
			if (end > numPages) end = numPages;
			if(start > end - (max - 1)) start = end - (max - 1);
		}

		// Add the page numbers to an array for v-for loop
		for(let i = start; i <= end; i++) {
			pages.push(i);
		}

		this.pages = pages;
		this.numPages = numPages;
		this.showGoToStart = start > 1;
		this.showGoToEnd = end < numPages;
	}

	paginate(pageNum: number, suppressEvent: boolean = false) {
		if(pageNum === this.currentPage) return;
		if(pageNum < 1 || pageNum > this.numPages) return;
		this.currentPage = pageNum;
		if(!suppressEvent) {
			this.$emit('paginate', pageNum);
		}
		this.updateResult();
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.updateResult();
	}

	/* Watchers
	============================================*/

	@Watch('pageNum')
	onPageNumChanged(newPage: number) {
		if(newPage !== this.currentPage) {
			this.paginate(newPage, true);
		}
	}

	@Watch('totalResults')
	onTotalResultsChanged() {
		this.updateResult();
	}

}

</script>

<style lang="scss">
.pagination-wrapper {
	label {
		color: $dark-neutral;
		display: block;
		font-size: 1.4rem;
		margin-bottom: 0.5rem;
	}
}

.pagination {
	padding: 0;

	a {
		text-decoration: none;
	}

	li {
		background-color: lighten($light-blue, 90%);
		cursor: pointer;
		display: inline-block;
		padding: 10px 15px;
		transition: background-color 0.2s;

		&.active {
			background-color: #FFF;
			border-bottom: solid 2px $dark-blue;
			cursor: default;
			&:hover {
				background-color: #FFF;
			}
		}

		&:hover {
			background-color: lighten($light-blue, 50%);
		}
	}
}
</style>