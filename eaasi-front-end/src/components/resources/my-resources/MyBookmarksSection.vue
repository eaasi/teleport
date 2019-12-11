<template>
	<div class="mbs-wrapper">
		<div class="bg-top-message flex-row flex-wrap">
			<div class="message-wrapper">
				<p>
					<span v-if="bookmarks.length">These resources will be bookmarked until you remove the bookmark.</span>
					<span v-else>No Bookmarks Found</span>
				</p>
			</div>
			<div class="btn-section">
				<ui-button color-preset="light-blue" @click="raiseClearBookmarksModal" v-if="bookmarks.length">
					Clear All Bookmarks
				</ui-button>
				<ui-button color-preset="light-blue" @click="$router.push('explore')" v-else>
					Add Bookmarks
				</ui-button>
			</div>
		</div>
		<div class="resource-results" v-if="bentoResult && bookmarks.length" id="myBookmarks">
			<resource-facets />
			<applied-search-facets v-if="hasSelectedFacets" />
			<div class="resource-bento width-md">
				<div class="bento-row">
					<div
						v-if="refinedEnvironment.result.length"
						class="bento-col"
					>
						<resource-list
							:hide-header="hideBentoHeader"
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
							:hide-header="hideBentoHeader"
							:query="query"
							:result="refinedSoftware"
							type="Software"
							@click:all="getAll(['Software'])"
						/>
						<resource-list
							v-if="refinedContent.result.length"
							:hide-header="hideBentoHeader"
							:query="query"
							:result="bentoResult.content"
							type="Content"
							@click:all="getAll(['Content'])"
						/>
					</div>
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
			<alert-card type="warning">
				You are about to clear all of your bookmarks! Your bookmarked environments will no longer appear under "My Bookmarks." This action cannot be undone.
			</alert-card>
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
import { IResourceSearchResponse, IResourceSearchFacet, IEaasiSearchResponse } from '@/types/Search';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { populateFacets } from '@/helpers/ResourceSearchFacetHelper';
import User from '../../../models/admin/User';
import { IBookmark } from '@/types/Bookmark';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

@Component({
    name: 'MyBookmarksScreen',
    components: {
		AppliedSearchFacets,
		ResourceFacets,
		ResourceList,
		ResourceSlideMenu,
		ConfirmModal
	}
})
export default class MyBookmarksSection extends Vue {
    /* Computed
    ============================================*/

    @Sync('resource/selectedResources')
    selectedResources: IEaasiResource[];

    @Sync('resource/query')
    query: ResourceSearchQuery;

    @Get('resource/result')
    bentoResult: IResourceSearchResponse;

    @Sync('resource/query@selectedFacets')
    selectedFacets: IResourceSearchFacet[];

    @Get('loggedInUser')
    user: User;

    @Get('bookmark/bookmarks')
    bookmarks: IBookmark[];

    get hasSelectedFacets() {
        return this.selectedFacets.some(f => f.values.some(v => v.isSelected));
	}
	
	get hideBentoHeader() {
		return this.selectedFacets.some(
			f => f.name === 'resourceType' 
			&& f.values.filter(v => v.isSelected).length === 1
		);
	}

	get refinedContent() {
		const searchResult = this.refinedResult(this.bentoResult.content);
		const result = searchResult.result
			.filter(r => this.bookmarks
				.some(b => b.resourceID === r.id));
		return {...searchResult, result};
	}

	get refinedSoftware() {
		const searchResult = this.refinedResult(this.bentoResult.software);
		const result = searchResult.result
			.filter(r => this.bookmarks
				.some(b => b.resourceID === r.id));
		return {...searchResult, result};
	}

	get refinedEnvironment() {
		const searchResult = this.refinedResult(this.bentoResult.environments);
		const result = searchResult.result
			.filter(r => this.bookmarks
				.some(b => b.resourceID === r.envId));
		return {...searchResult, result};
    }

	/* Data
    ============================================*/
	isClearBookmarksModalVisible: boolean = false;

    /* Methods
    ============================================*/

    refinedResult(bentoResult: IEaasiSearchResponse<IEaasiResource>): IEaasiSearchResponse<IEaasiResource> {
        if (!bentoResult) return { result: [], totalResults: 0 };
        if (!this.hasSelectedFacets) return bentoResult;
        const result = bentoResult.result.filter(
            env => this.selectedFacets
				.some(f => f.values
					.some(v => env[f.name] === v.label && v.isSelected ))
        );
        return {...bentoResult, result};
    }

    async search() {
        await this.$store.dispatch('bookmark/getBookmarks', this.user.id);
        await this.$store.dispatch('resource/searchResources');
        this.populateFacets();
    }

    populateFacets() {
        const facets = populateFacets(this.refinedEnvironment, this.refinedSoftware, this.refinedContent);
		this.query = {...this.query, selectedFacets: facets};
    }

    async getAll(types) {
        this.query.types = types;
        this.query.limit = 5000;
        this.selectedFacets = this.selectedFacets.filter(f => f.name !== 'resourceType');
        this.$router.push('explore');
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

    /* Lifecycle Hooks
    ============================================*/

    mounted() {
        this.search();
	}

    beforeDestroy() {
        this.selectedResources = [];
		this.query = {...this.query, keyword: null};
		this.$store.commit('resource/SET_RESULT', null);
    }

    /* Watcher
    ============================================*/

	@Watch('bookmarks')
	onBookmarksChange() {
        if(this.bentoResult) this.populateFacets();
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