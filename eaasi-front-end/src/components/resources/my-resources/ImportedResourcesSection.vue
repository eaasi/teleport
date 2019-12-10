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
		<div class="resource-results" v-if="hasResults">
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
							:hide-header="hideBentoHeader"
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
							:hide-header="hideBentoHeader"
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

		get hideBentoHeader() {
			return this.selectedFacets.some(
				f => f.name === 'resourceType' 
				&& f.values.filter(v => v.isSelected).length === 1
			);
		}

		get hasSelectedFacets() {
			return this.selectedFacets.some(f => f.values.some(v => v.isSelected));
		}

		get hasResults() {
			return this.refinedContent.result.length > 0
				|| this.refinedSoftware.result.length > 0
				|| this.refinedEnvironment.result.length > 0;
		}

		get refinedContent() {
			if (!this.bentoResult) return { result: [], totalResults: 0 };
			return this.refinedResult(this.bentoResult.content);
		}

		get refinedSoftware() {
			if (!this.bentoResult) return { result: [], totalResults: 0 };
			return this.refinedResult(this.bentoResult.software);
		}

		get refinedEnvironment() {
			if (!this.bentoResult) return { result: [], totalResults: 0 };
			return this.refinedResult(this.bentoResult.environments);
		}


		/* Methods
        ============================================*/

		refinedResult(bentoResult: IEaasiSearchResponse<IEaasiResource>): IEaasiSearchResponse<IEaasiResource> {
			if (!this.hasSelectedFacets) return bentoResult;
			const result = bentoResult.result.filter(
				env => this.selectedFacets.some(f => f.values.some(v => env[f.name] === v.label && v.isSelected ))
			);
			return {...bentoResult, result};
		}

		async getAll(types) {
			this.query.types = types;
			this.query.limit = 5000;
			this.selectedFacets = this.selectedFacets.filter(f => f.name !== 'resourceType');
			this.$router.push('explore');
		}

		/* Lifecycle Hooks
        ============================================*/
		async mounted() {
			await this.$store.dispatch('resource/getImports');
		}

		beforeDestroy() {
			this.selectedResources = [];
			this.query = {...this.query, keyword: null};
			this.$store.commit('resource/SET_RESULT', null);
		}
		
	}
</script>

<style lang='scss' scoped>
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
</style>