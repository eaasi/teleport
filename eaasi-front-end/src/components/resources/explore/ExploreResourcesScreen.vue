<template>
	<div id="exploreResources">
		<div class="resource-results">
			<resource-facets v-if="query && query.selectedFacets.length > 0" />
			<applied-search-facets v-if="hasSelectedFacets" />
			<div class="resource-bento width-md">
				<div class="flex-elastic-row" v-if="bentoResult">
					<div class="elastic-col" v-if="filteredEnvironments.result.length > 0">
						<resource-list
							:query="query"
							:result="filteredEnvironments"
							type="Environment"
						/>
					</div>
					<div class="elastic-col" v-if="filteredSoftware.result.length > 0 || filteredContent.result.length > 0">
						<resource-list
							v-if="filteredSoftware.result.length > 0"
							:query="query"
							:result="filteredSoftware"
							type="Software"
						/>
						<resource-list
							v-if="filteredContent.result.length > 0"
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
import { IResourceSearchResponse, IResourceSearchFacet } from '@/types/Search';
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
	
	@Get('resource/query@selectedFacets')
	selectedFacets: IResourceSearchFacet[]

    get hasActiveResources() {
    	return this.activeResources.length > 0;
	}

	get hasSelectedFacets() {
    	return this.selectedFacets.some(f => f.values.some(v => v.isSelected));
	}
	
	get filteredContent() {
		if (!this.hasSelectedFacets) return this.bentoResult.content;
		const result = this.bentoResult.content.result.filter(
			c => this.selectedFacets.some(f => f.values.some(v => c[f.name] === v.label && v.isSelected ))
		);
		return {...this.bentoResult.software, result}
	}

	get filteredSoftware() {
		if (!this.hasSelectedFacets) return this.bentoResult.software;
		const result = this.bentoResult.software.result.filter(
			s => this.selectedFacets.some(f => f.values.some(v => s[f.name] === v.label && v.isSelected ))
		);
		return {...this.bentoResult.software, result}
	}
	
	get filteredEnvironments() {
		if (!this.hasSelectedFacets) return this.bentoResult.environments;
		const result = this.bentoResult.environments.result.filter(
			env => this.selectedFacets.some(f => f.values.some(v => env[f.name] === v.label && v.isSelected ))
		);
		return {...this.bentoResult.environments, result}
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
		// generates facets based on the result received in searchResources.
		// eventually won't need to do this, because facets will come with a result from the backend
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
			.flex-elastic-row {
				display: flex;
				flex-direction: row;
				.elastic-col {
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