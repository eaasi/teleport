<template>
	<div class="mbs-wrapper">
		<div class="bg-top-message flex-row flex-wrap">
			<div class="message-wrapper">
				<p v-if="imports.length">
					These resources have been imported to your Node.
				</p>
				<p style="margin: 0;" v-else>
					No imported resources found.
				</p>
			</div>
			<div class="btn-section">
			</div>
		</div>
		<div class="resource-results" v-if="bentoResult && imports.length">
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
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Component } from 'vue-property-decorator';
	import { Get, Sync } from 'vuex-pathify';
	import { populateFacets } from '@/helpers/ResourceSearchFacetHelper';
	import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
	import User from '@/models/admin/User';
	import ConfirmModal from '@/components/global/Modal/ConfirmModal.vue';
	import ResourceList from '@/components/resources/ResourceList.vue';
	import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';
	import AppliedSearchFacets from '@/components/resources/search/AppliedSearchFacets.vue';
	import ResourceFacets from '@/components/resources/search/ResourceFacets.vue';
	import { IResourceSearchResponse, IResourceSearchFacet, IEaasiSearchResponse } from '@/types/Search';
	import { IEaasiResource } from '@/types/Resource.d.ts';

	@Component({
		name: 'ImportedResourcesSection',
		components: {
			AppliedSearchFacets,
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
		query: ResourceSearchQuery;

		@Get('resource/result')
		bentoResult: IResourceSearchResponse;

		@Sync('resource/query@selectedFacets')
		selectedFacets: IResourceSearchFacet[];

		@Get('loggedInUser')
		user: User;

		@Get('resource/imports')
		imports: IEaasiResource[];

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

		async search() {
			await this.$store.dispatch('resource/getImports');
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

		/* Lifecycle Hooks
        ============================================*/

		mounted() {
			this.search();
		}

		beforeDestroy() {
			this.selectedResources = [];
			this.query = {...this.query, keyword: null};
		}
	}
</script>

<style lang='scss' scoped>
	.bg-top-message {
		background-color: lighten($light-neutral, 40%);
		border-bottom: 2px solid darken($light-neutral, 10%);
		justify-content: space-between;
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
</style>