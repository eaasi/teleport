<template>
	<div id="exploreResources" v-if="bentoResult">
		<div class="resource-results">
			<resource-facets />
			<applied-search-facets v-if="hasSelectedFacets" />
			<div class="resource-bento width-md">
				<div class="bento-row">
					<div
						v-if="refinedEnvironment.result.length"
						class="bento-col"
					>
						<resource-list
							:query="query"
							:result="refinedEnvironment"
							type="Environment"
							@click:all="getAll(['Environment'])"
						/>
					</div>
					<div
						v-if="refinedSoftware.result.length || refinedContent.result.length"
						class="bento-col"
					>
						<resource-list
							v-if="refinedSoftware.result.length"
							:query="query"
							:result="refinedSoftware"
							type="Software"
							@click:all="getAll(['Software'])"
						/>
						<resource-list
							v-if="refinedContent.result.length"
							:query="query"
							:result="bentoResult.content"
							type="Content"
							@click:all="getAll(['Content'])"
						/>
					</div>
				</div>
			</div>
		</div>

		<resource-slide-menu
			:open="hasActiveResources && isMenuOpenRequest"
			:resources="selectedResources"
			:is-tab-visible="hasActiveResources"
			@toggle="toggleSideMenu"
			@show-save-modal="showSaveModal"
		/>

		<!-- Save To My Node Modal -->
		<confirm-modal
			title="Save To My Node"
			confirm-label="Save Environment"
			@click:cancel="isSaveModalVisible=false"
			@click:confirm="saveEnvironment"
			@close="isSaveModalVisible=false"
			v-if="isSaveModalVisible"
		>
			<alert type="info">
				<span class="ers-rep-msg">
					Saving to your node will copy all environment data and files to local storage.
					Environments copied from the EaaSI Network cannot be easily deleted once saved.
				</span>
				<span class="ers-rep-msg">
					Do you want to save this environment to your node?
				</span>
			</alert>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import ResourceSlideMenu from '../ResourceSlideMenu.vue';
import ResourceFacets from '../search/ResourceFacets.vue';
import AppliedSearchFacets from '../search/AppliedSearchFacets.vue';
import ResourceList from '../ResourceList.vue';
import { IEaasiResource, IEnvironment } from '@/types/Resource.d.ts';
import { Get, Sync } from 'vuex-pathify';
import { IResourceSearchResponse, IResourceSearchFacet, IEaasiSearchResponse } from '@/types/Search';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';

@Component({
	name: 'ExploreResourcesScreen',
	components: {
		AppliedSearchFacets,
		ResourceFacets,
		ResourceList,
		ResourceSlideMenu
	}
})
export default class ExploreResourcesScreen extends Vue {

	/* Computed
    ============================================*/

	/**
	 * Resources that are currently selected
	 * TODO: name change => selectedResources
	 */
    @Sync('resource/selectedResources')
    selectedResources: IEaasiResource[]

    @Sync('resource/query')
    query: ResourceSearchQuery;

    @Get('resource/result')
	bentoResult: IResourceSearchResponse

	@Get('resource/query@selectedFacets')
	selectedFacets: IResourceSearchFacet[]

	get hasActiveResources() {
    	return this.selectedResources.length > 0;
	}

	get hasSelectedFacets() {
    	return this.selectedFacets.some(f => f.values.some(v => v.isSelected));
	}

	get refinedContent() {
		return this.refinedResult(this.bentoResult.content);
	}

	get refinedSoftware() {
		return this.refinedResult(this.bentoResult.software);
	}

	get refinedEnvironment() {
		return this.refinedResult(this.bentoResult.environments);
	}

	/* Data
    ============================================*/

    isMenuOpenRequest: boolean = true;
    isSaveModalVisible: boolean = false;

    /* Methods
	============================================*/

    refinedResult(bentoResult: IEaasiSearchResponse<IEaasiResource>): IEaasiSearchResponse<IEaasiResource> {
    	if (!bentoResult) return { result: [], totalResults: 0 };
    	if (!this.hasSelectedFacets) return bentoResult;
    	const result = bentoResult.result.filter(
    		env => this.selectedFacets.some(f => f.values.some(v => env[f.name] === v.label && v.isSelected ))
    	);
    	return {...bentoResult, result};
    }

    toggleSideMenu() {
    	this.isMenuOpenRequest = !this.isMenuOpenRequest;
    }

    async search() {
    	const result = await this.$store.dispatch('resource/searchResources');
    	// generates facets based on the result received in searchResources.
    	// eventually won't need to do this, because facets will come with a result from the backend
    	if (result) this.$store.dispatch('resource/populateSearchFacets');
    }

    getAll(types) {
    	this.query.types = types;
    	this.query.limit = 5000;
    	this.search();
    }

    showSaveModal() {
    	this.isSaveModalVisible = true;
    }

    async saveEnvironment() {
    	let environment = this.selectedResources[0];
    	if (environment) {
    		await this.$store.dispatch('resource/saveEnvironment', environment);
    		this.isSaveModalVisible = false;
    	}
    }

    /* Lifecycle Hooks
    ============================================*/

    mounted() {
    	let keyword = this.$route.query && this.$route.query.q;
    	this.query.keyword = keyword as string;
    	this.search();
    }

    destroyed() {
    	this.selectedResources = [];
    }

    @Watch('$route.query')
    onRouteChanged(newQuery, oldQuery) {
    	if(newQuery.q !== oldQuery.q) {
    		this.query.keyword = newQuery.q as string;
    		this.search();
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

	.ers-rep-msg {
		margin: 1.4rem 0;
	}
</style>