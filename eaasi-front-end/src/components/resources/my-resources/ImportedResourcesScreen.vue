<template>
	<div class="mbs-wrapper">
		<div class="bg-top-message flex-row flex-wrap">
			<div class="message-wrapper">
				<p>
					<span v-if="hasResults">These resources have been imported to your Node.</span>
					<span v-else>No imported resources found.</span>
				</p>
			</div>
			<div class="btn-section" v-if="!hasResults">
				<ui-button color-preset="white" @click="navigateToImportResource">
					Import New Resource
				</ui-button>
			</div>
		</div>
		<div class="resource-results-wrapper">
			<div class="resource-results" v-if="bentoResult && hasResults">
				<div class="resource-facets-wrapper">
					<resource-facets @change="search" />
				</div>
				<div>
					<div class="applied-facets-wrapper">
						<applied-search-facets v-if="hasSelectedFacets" />
					</div>
					<div class="deselect-all-wrapper" v-if="selectedResources.length > 0">
						<div class="deselect-link flex flex-row justify-between">
							<div @click="selectedResources = []">
								<span class="icon-deselect"></span>
								<span>Deselect All ({{ selectedResources.length }})</span>
							</div>
							<div class="slide-menu-control-btns pull-right">
								<slide-menu-control-buttons @open="openActionMenu" :tabs="actionMenuTabs" />
							</div>
						</div>
					</div>
					<div class="resource-bento resources-group">
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
									v-if="bentoResult.software.result.length"
									:query="query"
									:hide-header="facetsOfSingleTypeSelected"
									:result="bentoResult.software"
									type="Software"
									@click:all="getAll(['Software'])"
								/>
								<resource-list
									v-if="bentoResult.content.result.length"
									:hide-header="facetsOfSingleTypeSelected"
									:query="query"
									:result="bentoResult.content"
									type="Content"
									@click:all="getAll(['Content'])"
								/>
							</div>
						</div>
					</div>
					<div class="resource-results-pagination">
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
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import User from '@/models/admin/User';
import ConfirmModal from '@/components/global/Modal/ConfirmModal.vue';
import ResourceList from '@/components/resources/ResourceList.vue';
import AppliedSearchFacets from '@/components/resources/search/AppliedSearchFacets.vue';
import ResourceFacets from '@/components/resources/search/ResourceFacets.vue';
import { IResourceSearchResponse, IResourceSearchFacet, IResourceSearchQuery } from '@/types/Search';
import { IEaasiResource } from '@/types/Resource';
import SlideMenuControlButtons from '@/components/resources/SlideMenuControlButtons.vue';
import ResourceSortSection from '../search/ResourceSortSection.vue';
import { ROUTES } from '@/router/routes.const';
import { IEaasiTab } from 'eaasi-nav';
import SearchQueryService, { QuerySource } from '@/services/SearchQueryService';
import { IBookmark } from '@/types/Bookmark';


@Component({
	name: 'ImportedResourcesScreen.vue',
	components: {
		AppliedSearchFacets,
		ResourceSortSection,
		ResourceFacets,
		ResourceList,
		SlideMenuControlButtons,
		ConfirmModal
	}
})
export default class ImportedResourcesScreen extends Vue {

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
	user: User;

	@Get('resource/facetsOfSingleTypeSelected')
	facetsOfSingleTypeSelected: Boolean;

	@Get('resource/onlySelectedFacets')
	onlySelectedFacets: IResourceSearchFacet[];

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	get hasSelectedFacets() {
		return this.onlySelectedFacets.length > 0;
	}

	get totalResults() {
		if (!this.onlySelectedFacets)  {
			return;
		}
		const totalResultsArr = this.onlySelectedFacets.flatMap(f => f.values.map(v => v.total));
		return Math.min.apply(null, totalResultsArr);
	}

	get hasResults() {
		if (!this.bentoResult) return false;
		return this.bentoResult.software.result.length > 0
			|| this.bentoResult.images.result.length > 0
			|| this.bentoResult.content.result.length > 0
			|| this.bentoResult.environments.result.length > 0;
	}

	/* Data
	============================================*/
	private readonly queryService = new SearchQueryService(QuerySource.ImportedResources);

	/* Methods
	============================================*/

    async getAll(types) {
		this.$store.commit('resource/SET_SELECTED_FACET_RESOURCE_TYPE', types);
		await this.search();
	}

	async paginate(page) {
		this.query.page = page;
		await this.search();
	}

    async search() {
		// wait for facets update it's selected property on this tick, call search on next tick
		this.$nextTick(async () => {
			this.query = {
				...this.query,
				userId: this.user.id,
				onlyImportedResources: true,
				onlyBookmarks: false,
				archives: ['default']
			};

			await this.$store.dispatch('resource/searchResources');

			const bookmarks = this.bentoResult?.bookmarks;
			if (!bookmarks || !bookmarks.length) {
				this.bentoResult.bookmarks = this.bookmarks;
			}
		});
	}

	navigateToImportResource() {
		this.$router.push(ROUTES.IMPORT_RESOURCE);
	}

	openActionMenu(tab: IEaasiTab) {
		this.$emit('open-action-menu', tab);
	}

	async init() {
		const { retrieveQuery } = this.$route.query;
		if (retrieveQuery) {
			const query: IResourceSearchQuery = this.queryService.retrieveQuery();
			if (query) {
				this.query = query;
			}
		}

		// prefetch bookmarks once...
		await this.$store.dispatch('bookmark/getBookmarks', this.user.id);
	}

	/* Lifecycle Hooks
	============================================*/
	beforeMount() {
		this.init();
		this.search();
	}

	beforeDestroy() {
		this.queryService.persistQuery(this.query);
		this.selectedResources = [];
		this.$store.dispatch('resource/clearSearchQuery');
		this.$store.commit('resource/SET_RESULT', null);
	}

	@Watch('hasSelectedFacets')
	async onSelectedFacets(curVal, prevVal) {
		if (!curVal && prevVal === undefined) {
			return;
		}
	}
}
</script>

<style lang='scss'>
	.bg-top-message {
		background-color: lighten($medium-grey, 30%);
		justify-content: space-between;
		min-height: 5rem;
		padding: 0 15px;

		.btn-section {
			display: flex;
			padding: 0.5rem 3rem;
		}
	}

	.resource-results-wrapper {
		width: -webkit-fill-available;

		.resource-results {
			display: flex;
			min-height: 80vh;
			position: relative;

			.resource-facets {
				flex: 0 0 250px;
			}
		}
	}

	.mbs-wrapper {
		.resource-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.bento-header {
				width: 100%;
				font-weight: 400;
			}

			.card-wrapper {
				width: -webkit-fill-available;
			}
		}
	}

	.resources-group {
		width: -webkit-fill-available;
	}
</style>