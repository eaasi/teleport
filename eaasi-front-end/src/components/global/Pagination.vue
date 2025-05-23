<template>
	<div class="pagination-wrapper">
		<div class="flex-row justify-between">
			<div><label>{{ totalText }}</label></div>
			<ul class="pagination" v-if="numPages > 1">
				<li
					@click="paginate(1)"
					:class="[
						'page-arrow',
						{
							'hide-page': !showGoToStart,
							'disabled-arrow': isFirstPage
						}
					]"
					v-if="numPages > maxPages"
				>
					<a href="javascript:void(0);">&#x3c;&#x3c;</a>
				</li>
				<li
					@click="paginate(currentPage - 1)"
					:class="[
						'page-arrow',
						{
							'hide-page': currentPage <= 1,
							'disabled-arrow': isFirstPage
						}
					]"
				>
					<a href="javascript:void(0);">&#x3c;</a>
				</li>
				<li
					v-for="p in pages"
					@click="paginate(p)"
					:class="{'active': p === currentPage}"
					:key="p"
				>
					<a href="javascript:void(0);" :class="{'active': p === currentPage}">{{ p }}</a>
				</li>
				<li
					@click="paginate(currentPage + 1)"
					:class="[
						'page-arrow',
						{
							'hide-page': currentPage >= numPages,
							'disabled-arrow': isLastPage
						}
					]"
				>
					<a href="javascript:void(0);">&#x3e;</a>
				</li>
				<li
					@click="paginate(numPages)"
					:class="[
						'page-arrow',
						{
							'hide-page': !showGoToEnd,
							'disabled-arrow': isLastPage
						}
					]"
					v-if="numPages > maxPages"
				>
					<a href="javascript:void(0);">&#x3e;&#x3e;</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

/**
 * Pagination for paginated lists of data
 * @example ../docs/Pagination.Example.md
 */
@Component({
	name: 'Pagination',
})
export default class Pagination extends Vue {

	/* Props
	============================================*/

	// The total results to divide into pages
	@Prop({type: Number, required: true})
	readonly totalResults: number;

	// The amount of results to show per page
	@Prop({type: Number, default: 25})
	readonly resultsPerPage: number;

	// How many page numbers to show at a time
	@Prop({type: Number, default: 4})
	readonly maxPages: number;

	// The currently selected page number
	@Prop({type: Number})
	readonly pageNum: number;

	/* Data
	============================================*/

	currentPage: number = 1;
	pages: number[] = [];
	numPages: number = 1;
	showGoToStart: boolean = false;
	showGoToEnd: boolean = false;

	/* Computed
	============================================*/

	get isFirstPage(): boolean {
		return this.currentPage === 1;
	}

	get isLastPage(): boolean {
		return this.currentPage === Math.ceil(this.totalResults / this.resultsPerPage);
	}

	get totalText(): string {
		let total = this.totalResults;
		if(total <= 0) return 'Records 0 of 0';
		let start = this.currentPage > 1
			? (this.currentPage - 1) * this.resultsPerPage
			: 1;
		let end = this.currentPage * this.resultsPerPage;
		end = end > total ? total : end;
		return `Records ${start}-${end} of ${total}`;
	}

	/* Methods
	============================================*/

	updateResult(): void {

		// Get pagination data
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

	@Watch('resultsPerPage')
	onResultsPerPage() {
		this.updateResult();
	}

}

</script>

<style lang="scss">
.pagination-wrapper {
	margin-bottom: 2rem;
	padding: 0 1rem;

	label {
		color: $dark-light-grey;
		display: block;
		font-size: 1.6rem;
		margin-bottom: 0.5rem;
	}
}

.pagination {
	margin-bottom: 1rem;
	margin-left: 10px;
	padding: 0;

	a {
		text-decoration: none;
	}

	li {
		&:first-child {
			border-bottom-left-radius: 0.8rem;
			border-top-left-radius: 0.8rem;
		}
		&:last-child {
			border-bottom-right-radius: 0.8rem;
			border-top-right-radius: 0.8rem;
		}
		background-color: $medium-grey;
		cursor: pointer;
		display: inline-block;
		padding: 10px;
		transition: background-color 0.2s;
		color: $light-green-background;

		&.active {
			border-bottom: solid 2px $light-green-background;
			cursor: default;
		}

		a {
			border-radius: 0.6rem;
			padding: 5px 10px;
			color: $light-green-background;

			&:hover {
				background-color: $light-green-background;
				color: black;
			}

			&.active {
				background-color: $light-green-background;
				cursor: default;
				transition: background-color 0.2s;
				color: black;

				&:hover {
					background-color: $green;
				}
			}
		}


		&.disabled-arrow {
			cursor: default;
			transition: background-color 0.2s;

			a {
				color: lighten($light-green-background, 50%);
				cursor: not-allowed;

				&:hover {
					background-color: $light-green-background;
					color: black;
				}
			}
		}
	}

	.page-arrow {
		font-weight: bold;
	}
}
</style>