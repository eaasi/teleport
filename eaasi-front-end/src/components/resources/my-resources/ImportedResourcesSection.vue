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
				<ui-button color-preset="light-blue" @click="$router.push('/import-resource')">
					Import New Resource
				</ui-button>
			</div>
		</div>
		<div class="resource-results" v-if="bentoResult && hasResults">
			<resource-facets @change="search" />
			<applied-search-facets v-if="hasSelectedFacets" />
			<div class="deselect-all-wrapper" v-if="selectedResources.length > 0">
				<div class="deselect-link flex flex-row justify-between" @click="selectedResources = []">
					<span class="icon-deselect"></span>
					<span>Deselect All ({{ selectedResources.length }})</span>
				</div>
			</div>
			<div class="resource-bento width-md">
				<div class="bento-row">
					<div
						v-if="bentoResult.environments.result.length"
						class="bento-col"
					>
						<resource-list
							:query="query"
							:hide-header="facetsOfSingleTypeSelected"
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
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import { populateFacets } from '@/helpers/ResourceSearchFacetHelper';
import User from '@/models/admin/User';
import ConfirmModal from '@/components/global/Modal/ConfirmModal.vue';
import ResourceList from '@/components/resources/ResourceList.vue';
import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';
import AppliedSearchFacets from '@/components/resources/search/AppliedSearchFacets.vue';
import ResourceFacets from '@/components/resources/search/ResourceFacets.vue';
import { IResourceSearchResponse, IResourceSearchFacet, IEaasiSearchResponse, IResourceSearchQuery } from '@/types/Search';
import { IEaasiResource } from '@/types/Resource.d.ts';
import { resourceTypes } from '@/utils/constants';
import ResourceSortSection from '../search/ResourceSortSection.vue';
import { jsonCopy } from '../../../utils/functions';

@Component({
	name: 'ImportedResourcesSection',
	components: {
		AppliedSearchFacets,
		ResourceSortSection,
		ResourceFacets,
		ResourceList,
		ResourceSlideMenu,
		ConfirmModal
	}
})
export default class ImportedResourcesSection extends Vue {
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
			|| this.bentoResult.environments.result.length > 0;
	}


	/* Methods
	============================================*/

    async getAll(types) {
		this.$store.commit('resource/UNSELECT_ALL_FACETS');
		this.$store.commit('resource/SET_SELECTED_FACET_RESOURCE_TYPE', types);
		await this.search();
	}

	async paginate(page) {
		this.query.page = page;
		await this.$store.dispatch('resource/searchResources');
	}

    async search() {
		this.$store.commit('resource/SET_QUERY', {...this.query, userId: this.user.id, archives: ['zero conf', 'default']});
		// wait for facets update it's selected property on this tick, call search on next tick
		this.$nextTick(async () => {
			await this.$store.dispatch('resource/searchResources');
			this.$store.commit('bookmark/SET_BOOKMARKS', this.bentoResult.bookmarks);
		});
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
			this.$store.dispatch('resource/clearSearchQuery');
			await this.search();
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
		padding: 2rem 3rem;
		.btn-section {
			border-left: 2px solid darken($light-neutral, 10%);
			padding: 0.5rem 3rem;
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

	.mbs-wrapper {
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