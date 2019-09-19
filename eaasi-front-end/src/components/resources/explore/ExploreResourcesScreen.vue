<template>
	<div id="exploreResources">
		<div class="resource-results">
			<resource-facets />
			<resource-list
				:query="query"
				:result="result"
				v-if="result"
				class="padded"
				@paginate="paginate"
			/>
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
import { IEaasiSearchResponse } from '@/types/Search';
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
	result: IEaasiSearchResponse<IEaasiResource>

	/* Data
	============================================*/

	menuOpen: boolean = false;

	/* Methods
	============================================*/

	paginate(pageNum) {
		this.query.page = pageNum;
		this.search();
	}

	search() {
		this.$store.dispatch('resource/searchResources');
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.search();
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

	.resource-list {
		margin-left: 28rem;
	}
}
</style>