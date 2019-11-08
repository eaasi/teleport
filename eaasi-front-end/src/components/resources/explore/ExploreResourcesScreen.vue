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

		<!-- Resources Slide Menu -->
		<resource-slide-menu
			:open="hasActiveResources && isMenuOpenRequest"
			:resources="selectedResources"
			:is-tab-visible="hasActiveResources"
			@toggle="toggleSideMenu"
			@show-save-modal="showSaveModal"
			@show-delete-modal="showDeleteModal"
		/>

		<!-- Modals -->
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

		<!-- Delete Resource Modal -->
		<confirm-modal
			title="Delete Resources"
			confirm-label="Delete"
			@click:cancel="isDeleteModalVisible=false"
			@click:confirm="deleteSelected"
			@close="isDeleteModalVisible=false"
			v-if="isDeleteModalVisible"
		>
			<alert type="warning" v-if="softwareIsSelected">
				<span class="ers-rep-msg">
					Deleting this software resource will remove all associated data from your node
					and it will no longer be available for use.
				</span>
			</alert>
			<alert type="warning" v-if="environmentIsSelected">
				<span class="ers-rep-msg">
					Deleting this environment will hide its metadata from all users in your node
					but related disk images will be retained for use in emulation of derivative
					environments.
				</span>
				<span v-if="selectedResources.length === 1">
					Do you want to delete this resource?
				</span>
				<span v-if="selectedResources.length > 1">
					Do you want to delete the selected resources?
				</span>
			</alert>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import {resourceTypes} from '@/utils/constants';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import ResourceSlideMenu from '../ResourceSlideMenu.vue';
import ResourceFacets from '../search/ResourceFacets.vue';
import AppliedSearchFacets from '../search/AppliedSearchFacets.vue';
import ResourceList from '../ResourceList.vue';
import { IEaasiResource } from '@/types/Resource.d.ts';
import { Get, Sync } from 'vuex-pathify';
import { IResourceSearchResponse, IResourceSearchFacet, IEaasiSearchResponse } from '@/types/Search';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import User from '../../../models/admin/User';
import { IBookmark } from '@/types/Bookmark';

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

    @Sync('resource/selectedResources')
    selectedResources: IEaasiResource[]

    @Sync('resource/query')
    query: ResourceSearchQuery;

    @Get('resource/result')
	bentoResult: IResourceSearchResponse

	@Sync('resource/query@selectedFacets')
	selectedFacets: IResourceSearchFacet[]

	@Get('loggedInUser')
	user: User;

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[]

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

	get environmentIsSelected() {
		return this.selectedResources
			.filter(res => res.resourceType === resourceTypes.ENVIRONMENT).length;
	}

	get softwareIsSelected() {
		return this.selectedResources
			.filter(res => res.resourceType === resourceTypes.SOFTWARE).length;
	}

	/* Data
    ============================================*/

    isMenuOpenRequest: boolean = true;
    isSaveModalVisible: boolean = false;
	isDeleteModalVisible: boolean = false;

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
		await this.$store.dispatch('bookmark/getBookmarks', this.user.id);
    	await this.$store.dispatch('resource/searchResources');
	}

    async getAll(types) {
    	this.query.types = types;
    	this.query.limit = 5000;
    	await this.search();
    	this.selectedFacets = this.selectedFacets.filter(f => f.name !== 'resourceType');
    }

    showSaveModal() {
    	this.isSaveModalVisible = true;
    }

	showDeleteModal() {
		this.isDeleteModalVisible = true;
	}

    async saveEnvironment() {
    	let environment = this.selectedResources[0];
    	if (environment) {
    		await this.$store.dispatch('resource/saveEnvironment', environment);
    		this.isSaveModalVisible = false;
    	}
	}

    async deleteSelected() {
    	// TODO: Deleting an environment is currently not working on the back end.
		// Issue is being tracked: https://gitlab.com/eaasi/eaasi-client-dev/issues/283
		let environment = this.selectedResources[0];
		if (environment) {
			await this.$store.dispatch('resource/deleteEnvironment', environment.envId);
			this.isDeleteModalVisible = false;
		}
	}

    /* Lifecycle Hooks
    ============================================*/

    mounted() {
		this.search();
    }

    beforeDestroy() {
		this.$store.dispatch('resource/clearSearchQuery');
		this.selectedResources = [];
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
		display: block;
		margin: 1.4rem 0;
	}
</style>