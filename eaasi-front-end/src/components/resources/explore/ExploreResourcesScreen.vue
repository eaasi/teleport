<template>
	<div id="exploreResources" v-if="bentoResult" :style="actionMenuStyles">
		<div class="page-title">
			<h1>Explore resources</h1>
		</div>
		<div :style="innerStyles">
			<no-search-result v-if="noResult" />
			<div v-else class="resource-results-wrapper">
				<div class="resource-results">
					<div class="resource-facets-wrapper">
						<resource-facets @change="search" />
					</div>
					<div class="ers-main-content flex-column">
						<div class="applied-facets-wrapper">
							<applied-search-facets v-if="hasSelectedFacets" />
						</div>
						<div class="deselect-all-wrapper flex-row justify-between" v-if="selectedResources.length > 0">
							<div class="deselect-link flex flex-row justify-between" @click="selectedResources = []">
								<span class="icon-deselect"></span>
								<span>Deselect All ({{ selectedResources.length }})</span>
							</div>
							<slide-menu-control-buttons @open="openActionMenu" :tabs="tabs" />
						</div>
						<div class="resource-bento width-md">
							<resource-sort-section v-if="facetsOfSingleTypeSelected" />
							<div class="bento-row">
								<div
									v-if="bentoResult.environments.result.length || bentoResult.images.result.length"
									class="bento-col"
								>
									<resource-list
										v-if="bentoResult.environments.result.length"
										:hide-header="facetsOfSingleTypeSelected"
										:query="query"
										:result="bentoResult.environments"
										type="Environment"
										@click:all="getAll(['Environment'])"
									/>
									<resource-list
										v-if="bentoResult.images.result.length"
										:hide-header="facetsOfSingleTypeSelected"
										:query="query"
										:result="bentoResult.images"
										type="Image"
										@click:all="getAll(['Image'])"
									/>
								</div>
								<div
									v-if="bentoResult.software.result.length || bentoResult.content.result.length"
									class="bento-col"
								>
									<resource-list
										:hide-header="facetsOfSingleTypeSelected"
										v-if="bentoResult.software.result.length"
										:query="query"
										:result="bentoResult.software"
										type="Software"
										@click:all="getAll(['Software'])"
									/>
									<resource-list
										:hide-header="facetsOfSingleTypeSelected"
										v-if="bentoResult.content.result.length"
										:query="query"
										:result="bentoResult.content"
										type="Content"
										@click:all="getAll(['Content'])"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="resource-results-pagination">
					<div class="pagination-left">
					</div>
					<div class="pagination-right">
						<pagination
							v-if="facetsOfSingleTypeSelected && !noResult"
							:results-per-page="query.limit"
							:total-results="totalResults"
							:page-num="query.page"
							@paginate="paginate"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Resources Slide Menu -->
		<resource-slide-menu
			v-if="isActionMenuOpen"
			:active-tab="activeTab"
			:tabs="tabs"
			@bookmarks-updated="search"
			@resource-deleted="update"
			@resource-published="onResourcePublished"
			@close="closeActionMenu"
			@navigate-to-tab="openActionMenu"
		/>
	</div>
</template>

<script lang="ts">

import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import { IResourceSearchResponse, IResourceSearchFacet, IResourceSearchQuery } from '@/types/Search';
import { IBookmark } from '@/types/Bookmark';
import { IEaasiResource } from '@/types/Resource';
import User from '@/models/admin/User';
import ResourceList from '@/components/resources/ResourceList.vue';
import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';
import AppliedSearchFacets from '@/components/resources/search/AppliedSearchFacets.vue';
import NoSearchResult from '@/components/resources/search/NoSearchResult.vue';
import ResourceFacets from '@/components/resources/search/ResourceFacets.vue';
import ResourceSortSection from '../search/ResourceSortSection.vue';
import { IEaasiTab } from 'eaasi-nav';
import SlideMenuControlButtons from '@/components/resources/SlideMenuControlButtons.vue';
import SearchQueryService, { QuerySource } from '@/services/SearchQueryService';

@Component({
	name: 'ExploreResourcesScreen',
	components: {
		SlideMenuControlButtons,
		ResourceSortSection,
		AppliedSearchFacets,
		ResourceFacets,
		ResourceList,
		ResourceSlideMenu,
		NoSearchResult
	}
})
export default class ExploreResourcesScreen extends Vue {

	/* Computed
    ============================================*/

	@Get('resource/result')
	bentoResult: IResourceSearchResponse;

	@Sync('resource/query')
	query: IResourceSearchQuery;

    @Sync('resource/selectedResources')
    selectedResources: IEaasiResource[];

	@Sync('resource/query@selectedFacets')
	selectedFacets: IResourceSearchFacet[];

	@Get('resource/facetsOfSingleTypeSelected')
	facetsOfSingleTypeSelected: Boolean;

	@Get('resource/facetsOfResourceTypesSelected')
	facetsOfResourceTypesSelected: String[];

	@Get('loggedInUser')
	user: User;

	/*@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];*/

	@Get('resource/onlySelectedFacets')
	onlySelectedFacets: IResourceSearchFacet[];

	@Get('resource/slideMenuTabs')
	readonly tabs: IEaasiTab[];

	get totalResults() {
		if (!this.onlySelectedFacets)  {
			return;
		}
		const totalResultsArr = this.onlySelectedFacets.flatMap(f => f.values.map(v => v.total));
		return Math.min.apply(null, totalResultsArr);
	}

	get noResult() {
		const { content, software, environments, images } = this.bentoResult;
		return content.result.length === 0
			&& software.result.length === 0
			&& environments.result.length === 0
			&& images.result.length === 0;
	}

	get hasActiveResources() {
		return this.selectedResources.length > 0;
	}

	get hasSelectedFacets() {
		return this.onlySelectedFacets.length > 0;
	}

	get isActionMenuOpen(): boolean {
		return this.activeTab != null && this.hasActiveResources;
	}

	get actionMenuStyles(): string {
		let styles = '';
		if (!this.isActionMenuOpen) return styles;
		let maxWidth = document.body.clientWidth - (430 + 90); // screen width - (action menu width + side menu bar width)
		styles += `overflow-y: scroll; max-width: ${maxWidth}px;`;
		return styles;
	}

	get innerStyles(): string {
		let styles = '';
		if (!this.isActionMenuOpen) return styles;
		let width = '95vw'; // screen width
		styles += `width: ${width};`;
		return styles;
	}

	/* Data
	============================================*/
	private queryService = new SearchQueryService(QuerySource.ExploreResources);

	activeTab: IEaasiTab = null;

    /* Methods
	============================================*/

	async paginate(page) {
		this.query.page = page;
		await this.search();
	}

	update() {
		this.$router.go(0);
	}

    async search() {
		// wait for facets update it's selected property on this tick, call search on next tick
		this.$nextTick(async () => {
			this.query = {
				...this.query,
				userId: this.user.id,
				//onlyBookmarks: false,
				onlyImportedResources: false,
				archives: []
			};

			await this.$store.dispatch('resource/searchResources');

			/*const bookmarks = this.bentoResult?.bookmarks;
			if (!bookmarks || !bookmarks.length) {
				this.bentoResult.bookmarks = this.bookmarks;
			}*/
		});
	}

    async getAll(types) {
		this.query.keyword = null;
		this.$store.commit('resource/SET_SELECTED_FACET_RESOURCE_TYPE', types);
		await this.search();
	}

	onResourcePublished() {
    	this.$router.go(0);
	}

	async init() {
		const { keyword } = this.$route.params;
		const { retrieveQuery } = this.$route.query;
		if (retrieveQuery) {
			const query: IResourceSearchQuery = this.queryService.retrieveQuery();
			if (query) {
				this.query = query;
			}
		}
		if (keyword) {
			this.query.keyword = keyword;
		}

		// prefetch bookmarks once...
		//await this.$store.dispatch('bookmark/getBookmarks', this.user.id);

		await this.search();
	}

	openActionMenu(tab: IEaasiTab = this.tabs[0]) {
		this.activeTab = tab;
	}

	closeActionMenu() {
		this.activeTab = null;
	}

    /* Lifecycle Hooks
    ============================================*/

    beforeMount() {
		this.init();
    }

	beforeDestroy() {
		this.queryService.persistQuery(this.query);
		this.selectedResources = [];
		this.$store.dispatch('resource/clearSearchQuery');
		this.$store.commit('resource/SET_RESULT', null);
	}

	@Watch('hasActiveResources')
	onSelectResources(curVal, prevVal) {
		if (curVal && !prevVal) {
			this.openActionMenu();
		}
	}

	@Watch('selectedResources')
	onSelectedResourceChange(curVal) {
    	if (curVal.length > 1) {
    		this.activeTab = this.tabs[0];
		}
	}
}

</script>

<style lang="scss">

	#exploreResources {
		.page-title {
			background-color: #c0c2c3;
			display: block;
			font-weight: 400;
			margin-bottom: 0;
			padding: 20px 15px;
		}

		.resource-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.card-wrapper {
				width: 420px;
			}
		}
	}

	.resource-results-wrapper {
		display: flex;
		flex-direction: column;
		max-width: 100vw;
		min-width: 0;

		.resource-results {
			margin-right: 1.5rem;
			min-height: 80vh;

			.ers-main-content {
				display: flex;
				flex-direction: column;
				margin-right: 6rem;
				min-width: 0;
			}
		}

		.resource-results-pagination {
			display: flex;
			justify-items: center;
			margin-right: 8.5rem;
			min-width: 850px;

			.pagination-left {
				flex: 0 0 250px;
				padding: 1.5rem;
			}

			.pagination-right {
				flex: 0 1 1100px;
				padding: 1rem;
			}
		}
	}

	.deselect-all-wrapper {
		background-color: $medium-grey;
		padding: 1.5rem;

		.deselect-link {
			color: $dark-light-grey;
			cursor: pointer;
			font-size: 1.4rem;
			font-weight: bold;
		}
		.icon-deselect {
			background-color: $dark-light-grey;
			border-radius: 0.6rem;
			display: inline-block;
			height: 20px;
			margin-right: 1rem;
			position: relative;
			width: 20px;
			&::before {
				background-color: #ffffff;
				border-radius: 6px;
				content: '';
				height: 3px;
				left: 4px;
				position: absolute;
				top: 9px;
				width: 12px;
			}
		}
	}

	.ers-rep-msg {
		display: block;
		margin: 1.4rem 0;
	}

	.applied-facets-wrapper {
		display: flex;
		min-width: 24px;
		width: 100%;
	}
</style>