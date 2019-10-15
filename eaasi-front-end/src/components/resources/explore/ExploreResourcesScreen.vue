<template>
	<div id="exploreResources">
		<div class="resource-results">
			<resource-facets v-if="query.selectedFacets" />
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
			:open="!!activeResource"
			:resource="activeResource"
			@close="activeResource = null"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import ResourceSlideMenu from '../ResourceSlideMenu.vue';
import ResourceFacets from '../search/ResourceFacets.vue';
import ResourceList from '../ResourceList.vue';
import { IEaasiResource } from '@/types/Resource.d.ts';
import { IEaasiTab } from 'eaasi-nav';
import { Get, Sync } from 'vuex-pathify';
import { IEaasiSearchResponse, IResourceSearchResponse } from '@/types/Search';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';

@Component({
	name: 'MyResourcesScreen',
	components: {
		ResourceFacets,
		ResourceList,
		ResourceSlideMenu
	}
})
export default class MyResourcesScreen extends Vue {

	/* Computed
	============================================*/

	@Sync('resource/activeResource')
	activeResource: IEaasiResource

	@Sync('resource/query')
	query: ResourceSearchQuery;

	@Get('resource/result')
	bentoResult: IResourceSearchResponse

	/* Data
	============================================*/

	menuOpen: boolean = false;

	/* Methods
	============================================*/

	search() {
		this.$store.dispatch('resource/searchResources');
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		let keyword = this.$route.query && this.$route.query.q;
		this.query.keyword = keyword as string;
		this.search();
	}

	@Watch('$route.query')
	onRouteChanged(newQuery, oldQuery) {
		console.log(newQuery.q !== oldQuery.q, newQuery.q);
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
</style>