<template>
	<div class="mbs-wrapper">
		<div class="bg-top-message flex-row flex-wrap">
			<div class="message-wrapper">
				<p>
					<span v-if="bookmarks && bookmarks.length">
						These resources will be bookmarked until you remove the bookmark.
					</span>
					<span v-else>No Bookmarks Found</span>
				</p>
			</div>
			<div class="btn-section">
				<ui-button color-preset="light-blue" @click="raiseClearBookmarksModal" v-if="bookmarks && bookmarks.length">
					Clear All Bookmarks
				</ui-button>
				<ui-button color-preset="light-blue" @click="$router.push(exploreResourcesPath)" v-else>
					Add Bookmarks
				</ui-button>
			</div>
		</div>

		<div class="resource-results-wrapper">
			<div class="resource-results" v-if="bentoResult && bookmarks && bookmarks.length" id="myBookmarks">
				<div class="resource-facets-wrapper">
					<resource-facets @change="search" />
				</div>
				<div class="mbs-main-content">
					<div class="applied-facets-wrapper">
						<applied-search-facets v-if="hasSelectedFacets" />
					</div>
					<div class="deselect-all-wrapper flex flex-row justify-between" v-if="selectedResources.length > 0">
						<div class="deselect-link flex flex-row justify-between" @click="selectedResources = []">
							<span class="icon-deselect"></span>
							<span>Deselect All ({{ selectedResources.length }})</span>
						</div>
						<div class="slide-menu-control-btns pull-right">
							<slide-menu-control-buttons @open="openActionMenu" :tabs="actionMenuTabs" />
						</div>
					</div>
					<div class="resource-bento width-md">
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
									@bookmarked="search"
								/>
								<resource-list
									v-if="bentoResult.images.result.length"
									:hide-header="facetsOfSingleTypeSelected"
									:query="query"
									:result="bentoResult.images"
									type="Image"
									@click:all="getAll(['Images'])"
									@bookmarked="search"
								/>
							</div>
							<div
								v-if="bentoResult.software.result.length || bentoResult.content.result.length"
								class="bento-col"
							>
								<resource-list
									v-if="bentoResult.software.result.length"
									:hide-header="facetsOfSingleTypeSelected"
									:query="query"
									:result="bentoResult.software"
									type="Software"
									@click:all="getAll(['Software'])"
									@bookmarked="search"
								/>
								<resource-list
									v-if="bentoResult.content.result.length"
									:hide-header="facetsOfSingleTypeSelected"
									:query="query"
									:result="bentoResult.content"
									type="Content"
									@click:all="getAll(['Content'])"
									@bookmarked="search"
								/>
							</div>
						</div>
					</div>
					<pagination
						v-if="facetsOfSingleTypeSelected"
						:results-per-page="query.limit"
						:total-results="totalResults"
						:page-num="query.page"
						@paginate="paginate"
						style="margin-top: 2.5rem;"
					/>
				</div>
			</div>
		</div>

		<confirm-modal
			cancel-label="Cancel"
			confirm-label="Clear All Bookmarks"
			title="Clear All Bookmarks"
			v-if="isClearBookmarksModalVisible"
			@close="closeClearBookmarksModal"
			@click:confirm="clearBookmarks"
		>
			<alert card type="warning">
				You are about to clear all of your bookmarks! Your bookmarked environments will no longer appear under "My Bookmarks." This action cannot be undone.
			</alert>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import ConfirmModal from '@/components/global/Modal/ConfirmModal.vue';
import ResourceSlideMenu from '../ResourceSlideMenu.vue';
import ResourceFacets from '../search/ResourceFacets.vue';
import AppliedSearchFacets from '../search/AppliedSearchFacets.vue';
import ResourceList from '../ResourceList.vue';
import { IEaasiResource } from '@/types/Resource.d.ts';
import { Get, Sync } from 'vuex-pathify';
import { IEaasiUser } from 'eaasi-admin';
import { IResourceSearchResponse, IResourceSearchFacet, IResourceSearchQuery } from '@/types/Search';
import SlideMenuControlButtons from '@/components/resources/SlideMenuControlButtons.vue';

import { IBookmark } from '@/types/Bookmark';
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import { ROUTES } from '@/router/routes.const';
import { IEaasiTab } from 'eaasi-nav';
import SearchQueryService, { QuerySource } from '@/services/SearchQueryService';

@Component({
    name: 'MyBookmarksScreen',
    components: {
		AppliedSearchFacets,
		ResourceFacets,
		ResourceList,
		ResourceSlideMenu,
		ConfirmModal,
		SlideMenuControlButtons
	}
})
export default class MyBookmarksScreen extends Vue {

    /* Props
	============================================*/
	@Prop({ type: Array as () => IEaasiTab[], required: true })
	readonly actionMenuTabs: IEaasiTab[];

    /* Computed
    ============================================*/

    @Sync('resource/selectedResources')
    selectedResources: IEaasiResource[];

    @Sync('resource/query')
    query: IResourceSearchQuery;

    @Get('resource/result')
    bentoResult: IResourceSearchResponse;

    @Sync('resource/query@selectedFacets')
    selectedFacets: IResourceSearchFacet[];

    @Get('loggedInUser')
    user: IEaasiUser;

	@Get('resource/facetsOfSingleTypeSelected')
	facetsOfSingleTypeSelected: Boolean;

	@Get('resource/onlySelectedFacets')
	onlySelectedFacets: IResourceSearchFacet[];

	@Get('resource/bookmarks')
	bookmarks: IBookmark[];

	get hasSelectedFacets() {
		return this.onlySelectedFacets.length > 0;
	}

	get totalResults() {
		const totalResultsArr = this.onlySelectedFacets.flatMap(f => f.values.map(v => v.total));
		return Math.min.apply(null, totalResultsArr);
	}

	get hasResults() {
		if (!this.bentoResult) return false;
		return this.bentoResult.software.result.length > 0
			|| this.bentoResult.content.result.length > 0
			|| this.bentoResult.images.result.length > 0
			|| this.bentoResult.environments.result.length > 0;
	}

	/* Data
	============================================*/
	private readonly queryService = new SearchQueryService(QuerySource.MyBookmarks);
	readonly exploreResourcesPath = ROUTES.RESOURCES.EXPLORE;

	isClearBookmarksModalVisible: boolean = false;

    /* Methods
    ============================================*/

    async search() {
		// wait for facets update it's selected property on this tick, call search on next tick
		this.$nextTick(async () => {
			this.query = {
				...this.query,
				userId: this.user.id,
				onlyBookmarks: true,
				onlyImportedResources: false,
				archives: []
			};
			await this.$store.dispatch('resource/searchResources');

			if (this.bentoResult) {
				this.$store.commit('bookmark/SET_BOOKMARKS', this.bentoResult.bookmarks);
			}
		});
	}

	async paginate(page) {
		this.query.page = page;
		await this.$store.dispatch('resource/searchResources');
	}

    async getAll(types) {
		this.$store.commit('resource/UNSELECT_ALL_FACETS');
		this.$store.commit('resource/SET_SELECTED_FACET_RESOURCE_TYPE', types);
		await this.search();
	}

	raiseClearBookmarksModal() {
    	this.isClearBookmarksModalVisible = true;
	}

	closeClearBookmarksModal() {
    	this.isClearBookmarksModalVisible = false;
	}

    async clearBookmarks() {
        await this.$store.dispatch('bookmark/clearBookmarks', this.user.id);
        this.isClearBookmarksModalVisible = false;
	}

	openActionMenu(tab: IEaasiTab) {
		this.$emit('open-action-menu', tab);
	}

	init() {
		const { retrieveQuery } = this.$route.query;
		if (retrieveQuery) {
			const query: IResourceSearchQuery = this.queryService.retrieveQuery();
			if (query) {
				this.query = query;
			}
		}
	}

    /* Lifecycle Hooks
    ============================================*/

	beforeDestroy() {
		this.queryService.persistQuery(this.query);
		this.selectedResources = [];
		this.$store.dispatch('resource/clearSearchQuery');
		this.$store.commit('resource/SET_RESULT', null);
	}

	beforeMount() {
		this.init();
		this.search();
	}

	@Watch('hasSelectedFacets')
	async onSelectedFacets(curVal, prevVal) {
		if (!curVal && prevVal === undefined) {
			return;
		}
		// if we're unselecting the last facet, do a clear search
		if (prevVal && !curVal && this.query.selectedFacets.length > 0) {
			this.$store.dispatch('resource/clearSearch');
		}
	}

}
</script>

<style lang='scss'>
.bg-top-message {
	background-color: lighten($light-neutral, 40%);
	border-bottom: 2px solid darken($light-neutral, 10%);
	justify-content: space-between;
	min-height: 5rem;
	padding: 2rem 8rem 2rem 2rem;

	.btn-section {
		border-left: 2px solid darken($light-neutral, 10%);
		padding: 0.5rem 3rem;
	}
}

.resource-results-wrapper {
	display: flex;
	flex-direction: column;
	width: 100vw;
	.resource-facets-wrapper {
		background-color: lighten($light-neutral, 80%);
	}

	.resource-results {
		min-height: 80vh;
		position: relative;
	}

	.applied-facets-wrapper {
		display: flex;
	}

	.mbs-main-content {
		margin-right: 8rem;
	}
}

#myBookmarks {
	.resource-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;

		.bento-header {
			width: 100%;
		}

		.card-wrapper {
			width: 53rem;
		}
	}
}
</style>