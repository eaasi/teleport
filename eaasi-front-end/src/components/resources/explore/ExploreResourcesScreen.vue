<template>
	<div id="exploreResources">
		<div class="resource-results">
			<resource-facets v-if="bentoResult && bentoResult.facets" />
			<applied-search-facets v-if="query.selectedFacets.length > 0" />
			<div class="resource-bento width-md">
				<div class="row" v-if="bentoResult">
					<div class="col-md-6">
						<resource-list
							:query="query"
							:result="bentoResult.environments"
							type="Environment"
						/>
					</div>
					<div class="col-md-6">
						<resource-list
							:query="query"
							:result="bentoResult.software"
							type="Software"
						/>
						<resource-list
							:query="query"
							:result="bentoResult.content"
							type="Content"
						/>
					</div>
				</div>
			</div>
		</div>
		<resource-slide-menu
			:open="hasActiveResources && isMenuOpenRequest"
			:resources="activeResources"
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
					Saving to your node will copy environment data to local storage.
					Environments copied from the EaaSI Network cannot be deleted
					from storage once saved.
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
import { IEaasiResource } from '@/types/Resource.d.ts';
import { Get, Sync } from 'vuex-pathify';
import { IResourceSearchResponse } from '@/types/Search';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';

@Component({
	name: 'MyResourcesScreen',
	components: {
		AppliedSearchFacets,
		ResourceFacets,
		ResourceList,
		ResourceSlideMenu
	}
})
export default class MyResourcesScreen extends Vue {

	/* Computed
    ============================================*/

    @Sync('resource/activeResources')
    activeResources: IEaasiResource[]

    @Sync('resource/query')
    query: ResourceSearchQuery;

    @Get('resource/result')
    bentoResult: IResourceSearchResponse

    get hasActiveResources() {
    	return this.activeResources.length > 0;
    }

    /* Data
    ============================================*/

    isMenuOpenRequest: boolean = true;
    isSaveModalVisible: boolean = false;

    /* Methods
    ============================================*/

    toggleSideMenu() {
    	this.isMenuOpenRequest = !this.isMenuOpenRequest;
    }

    async search() {
		await this.$store.dispatch('resource/searchResources');
		this.$store.dispatch('resource/populateSearchFacets');
    }

    showSaveModal() {
    	this.isSaveModalVisible = true;
    }

    async saveEnvironment() {
    	// TODO: handle saving multiple selected
    	let environment = this.activeResources[0];

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
    	this.activeResources = [];
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
		}
	}

	.ers-rep-msg {
		margin: 1.4rem 0;
	}
</style>