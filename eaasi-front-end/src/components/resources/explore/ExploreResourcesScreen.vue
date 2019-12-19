<template>
	<div id="exploreResources" v-if="bentoResult">
		<no-search-result v-if="noResult" />
		<div v-else class="resource-results">
			<resource-facets @change="search" />
			<applied-search-facets v-if="hasSelectedFacets" />
			<div class="deselect-all-wrapper" v-if="selectedResources.length > 0">
				<div class="deselect-link flex flex-row justify-between" @click="selectedResources = []">
					<span class="icon-deselect"></span>
					<span>Deselect All ({{ selectedResources.length }})</span>
				</div>
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
			v-if="facetsOfSingleTypeSelected"
			:results-per-page="query.limit"
			:total-results="totalResults"
			:page-num="query.page"
			@paginate="paginate"
		/>

		<!-- Resources Slide Menu -->
		<resource-slide-menu
			:open="hasActiveResources && isMenuOpenRequest"
			@toggle="toggleSideMenu"
			@bookmarks-updated="search"
			@resource-updated="search"
		/>
	</div>
</template>

<script lang="ts">

import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import { IResourceSearchResponse, IResourceSearchFacet, IEaasiSearchResponse } from '@/types/Search';
import { IBookmark } from '@/types/Bookmark';
import { IEaasiResource } from '@/types/Resource.d.ts';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import User from '@/models/admin/User';
import ResourceList from '@/components/resources/ResourceList.vue';
import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';
import AppliedSearchFacets from '@/components/resources/search/AppliedSearchFacets.vue';
import NoSearchResult from '@/components/resources/search/NoSearchResult.vue';
import ResourceFacets from '@/components/resources/search/ResourceFacets.vue';
import { resourceTypes } from '@/utils/constants';
import ResourceSortSection from '../search/ResourceSortSection.vue';

@Component({
	name: 'ExploreResourcesScreen',
	components: {
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
	
	/* Data
    ============================================*/
	isMenuOpenRequest: boolean = true;

    /* Methods
	============================================*/
    toggleSideMenu() {
    	this.isMenuOpenRequest = !this.isMenuOpenRequest;
	}
	
	async paginate(page) {
		this.query.page = page;
		await this.$store.dispatch('resource/searchResources');
	}

    async search() {
		await this.$store.dispatch('bookmark/getBookmarks', this.user.id);
    	await this.$store.dispatch('resource/searchResources');
	}

    async getAll(types) {
		this.$store.commit('resource/UNSELECT_ALL_FACETS');
		this.$store.commit('resource/SET_SELECTED_FACET_RESOURCE_TYPE', types);
		await this.search();
	}

    /* Lifecycle Hooks
    ============================================*/

    async mounted() {
		await this.search();
    }

	beforeDestroy() {
		this.selectedResources = [];
		this.$store.dispatch('resource/clearSearchQuery');
		this.$store.commit('resource/SET_RESULT', null);
	}

	@Watch('hasSelectedFacets')
	async onSelectedFacets(curVal, prevVal) {
		// if we unselecting the last facet, do a clear search
		if (prevVal && !curVal) {
			await this.$store.dispatch('resource/clearSearch');
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

			.bento-header {
				width: 100%;
			}

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

		.resource-bento {
			margin-left: 28rem;
			padding: 1.5rem;
			.bento-row {
				display: flex;
				flex-direction: row;
				.bento-col {
					flex: 1;
					margin: 0 1rem;
				}
			}
		}
	}

	.deselect-all-wrapper {
		background-color: lighten($light-blue, 90%);
		margin-left: 28rem;
		padding: 1.5rem;
		width: 100%;
		.deselect-link {
			color: $dark-blue;
			cursor: pointer;
			font-size: 1.4rem;
			font-weight: bold;
			max-width: 12rem;
		}
		.icon-deselect {
			background-color: $dark-blue;
			border-radius: 0.6rem;
			display: inline-block;
			height: 20px;
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