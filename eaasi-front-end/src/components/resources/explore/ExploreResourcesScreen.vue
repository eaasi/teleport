<template>
	<div id="exploreResources" v-if="bentoResult" :style="actionMenuStyles">
		<div :style="innerStyles">
			<no-search-result v-if="noResult" />
			<div v-else class="resource-results">
				<resource-facets @change="search" />
				<applied-search-facets v-if="hasSelectedFacets" />
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
							v-if="bentoResult.environments.result.length"
							class="bento-col"
						>
							<resource-list
								:hide-header="facetsOfSingleTypeSelected"
								:query="query"
								:result="bentoResult.environments"
								type="Environment"
								@click:all="getAll(['Environment'])"
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
			<pagination
				v-if="facetsOfSingleTypeSelected && !noResult"
				:results-per-page="query.limit"
				:total-results="totalResults"
				:page-num="query.page"
				@paginate="paginate"
			/>
		</div>

		<!-- Resources Slide Menu -->
		<resource-slide-menu
			v-if="isActionMenuOpen"
			:active-tab="activeTab"
			:tabs="tabs"
			@bookmarks-updated="search"
			@resource-deleted="search"
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
import { IResourceSearchResponse, IResourceSearchFacet } from '@/types/Search';
import { IBookmark } from '@/types/Bookmark';
import { IEaasiResource } from '@/types/Resource.d.ts';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import User from '@/models/admin/User';
import ResourceList from '@/components/resources/ResourceList.vue';
import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';
import AppliedSearchFacets from '@/components/resources/search/AppliedSearchFacets.vue';
import NoSearchResult from '@/components/resources/search/NoSearchResult.vue';
import ResourceFacets from '@/components/resources/search/ResourceFacets.vue';
import ResourceSortSection from '../search/ResourceSortSection.vue';
import { IEaasiTab } from 'eaasi-nav';
import SlideMenuControlButtons from '@/components/resources/SlideMenuControlButtons.vue';

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
	query: ResourceSearchQuery;

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

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	@Get('resource/onlySelectedFacets')
	onlySelectedFacets: IResourceSearchFacet[];

	get totalResults() {
		const totalResultsArr = this.onlySelectedFacets.flatMap(f => f.values.map(v => v.total));
		return Math.min.apply(null, totalResultsArr);
	}

	get noResult() {
		const { content, software, environments } = this.bentoResult;
		return content.result.length === 0
			&& software.result.length === 0
			&& environments.result.length === 0;
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
	tabs: IEaasiTab[] = [
		{
			label: 'Details'
		},
		{
			label: 'Actions'
		}
	]
	activeTab: IEaasiTab = null;

    /* Methods
	============================================*/

	paginate(page) {
		this.query.page = page;
		this.$store.dispatch('resource/searchResources');
	}

    search() {
		this.$store.commit('resource/SET_QUERY', {...this.query, userId: this.user.id });
		// wait for facets update it's selected property on this tick, call search on next tick
		this.$nextTick(async () => {
			await this.$store.dispatch('resource/searchResources');
			if (this.bentoResult?.bookmarks) {
				this.$store.commit('bookmark/SET_BOOKMARKS', this.bentoResult.bookmarks);
			}
		});
	}

    getAll(types) {
		this.query.keyword = null;
		this.$store.commit('resource/UNSELECT_ALL_FACETS');
		this.$store.commit('resource/SET_SELECTED_FACET_RESOURCE_TYPE', types);
		this.search();
	}

	onResourcePublished() {
    	this.$router.go(0);
	}

	init() {
		const { keyword } = this.$route.params;
		if (keyword) this.query.keyword = keyword;
		this.search();
	}

	openActionMenu(tab: IEaasiTab = this.tabs[1]) {
		this.activeTab = tab;
	}

	closeActionMenu() {
		this.activeTab = null;
	}

    /* Lifecycle Hooks
    ============================================*/

    mounted() {
		this.init();
    }

	beforeDestroy() {
		this.selectedResources = [];
		this.$store.dispatch('resource/clearSearchQuery');
		this.$store.commit('resource/SET_RESULT', null);
	}

	@Watch('hasSelectedFacets')
	onSelectedFacets(curVal, prevVal) {
		// if we unselecting the last facet, do a clear search
		if (prevVal && !curVal) {
			this.$store.dispatch('resource/clearSearch');
		}
	}

	@Watch('hasActiveResources')
	onSelectResources(curVal, prevVal) {
		if (curVal && !prevVal) {
			this.openActionMenu();
		}
	}

}

</script>

<style lang="scss">
	#exploreResources {
		h1 {
			background-color: lighten($light-neutral, 70%);
			border-top: solid 1px darken($light-neutral, 10%);
			display: block;
			font-weight: 300;
			margin-bottom: 0;
			padding: 3rem 3rem 1rem;
		}

		.resource-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.card-wrapper {
				width: 53rem;
			}
		}
	}

	.resource-results {
		min-height: 80vh;
		position: relative;

		.resource-facets {
			bottom: 0;
			position: absolute;
			top: 0;
		}
	}

	.deselect-all-wrapper {
		background-color: lighten($light-blue, 90%);
		margin-left: 28rem;
		padding: 1.5rem;
		.deselect-link {
			color: $dark-blue;
			cursor: pointer;
			font-size: 1.4rem;
			font-weight: bold;
		}
		.icon-deselect {
			background-color: $dark-blue;
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
</style>