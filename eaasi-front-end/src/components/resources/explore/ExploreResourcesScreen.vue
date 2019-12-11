<template>
	<div id="exploreResources" v-if="bentoResult">
		<no-search-result v-if="noResult" />
		<div v-else class="resource-results">
			<resource-facets />
			<applied-search-facets v-if="hasSelectedFacets" />
			<div class="resource-bento width-md">
				<div class="bento-row">
					<div
						v-if="refinedEnvironment.result.length"
						class="bento-col"
					>
						<resource-list
							:hide-header="isSingleResourceTypeSelected"
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
							:hide-header="isSingleResourceTypeSelected"
							v-if="refinedSoftware.result.length"
							:query="query"
							:result="refinedSoftware"
							type="Software"
							@click:all="getAll(['Software'])"
						/>
						<resource-list
							:hide-header="isSingleResourceTypeSelected"
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
			@toggle="toggleSideMenu"
			@bookmarks-updated="search"
			@resource-updated="search"
		/>
	</div>
</template>

<script lang="ts">

import Vue from 'vue';
import { Component } from 'vue-property-decorator';
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

@Component({
	name: 'ExploreResourcesScreen',
	components: {
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

	@Get('loggedInUser')
	user: User;

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	get refinedContent() {
		return this.refinedResult(this.bentoResult.content);
	}

	get refinedSoftware() {
		return this.refinedResult(this.bentoResult.software);
	}

	get refinedEnvironment() {
		return this.refinedResult(this.bentoResult.environments);
	}

	get noResult() {
		return this.refinedContent.result.length === 0
		&& this.refinedSoftware.result.length === 0
		&& this.refinedEnvironment.result.length === 0;
	}

	get hasActiveResources() {
		return this.selectedResources.length > 0;
	}

	get hasSelectedFacets() {
		return this.selectedFacets.some(f => f.values.some(v => v.isSelected));
	}

	get isSingleResourceTypeSelected() {
		const selected = this.selectedFacets.filter(f => f.values.some(v => v.isSelected));
		return selected.length === 1 
			&& selected[0].name === 'resourceType' 
			&& selected[0].values.filter(v => v.isSelected).length === 1;
	}

	/* Data
    ============================================*/
    isMenuOpenRequest: boolean = true;

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

	.ers-rep-msg {
		display: block;
		margin: 1.4rem 0;
	}
</style>