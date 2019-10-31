<template>
	<div id="myResources">
		<h1>My Resources</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<!-- TODO -->
		<my-bookmarks-section />
		<!-- <resource-slide-menu
			:open="!!selectedResources"
			:resource="selectedResources"
			@close="selectedResources = []"
		/> -->
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
import MyBookmarksSection from './MyBookmarksSection';
import User from '../../../models/admin/User';

@Component({
	name: 'MyResourcesScreen',
	components: {
		ResourceFacets,
		ResourceList,
		ResourceSlideMenu,
		MyBookmarksSection
	}
})
export default class MyResourcesScreen extends Vue {

	/* Computed
	============================================*/

	@Sync('resource/selectedResources')
	selectedResources: IEaasiResource[];

	@Sync('resource/query')
	query: ResourceSearchQuery;

	@Get('resource/result')
	result: IResourceSearchResponse;

	@Get('loggedInUser')
	user: User;

	/* Data
	============================================*/

	menuOpen: boolean = false;
	tabs: IEaasiTab[] = [
		{
			label: 'My bookmarks',
			disabled: false
		},
		{
			label: 'Imported Resources',
			disabled: true
		},
		{
			label: 'My Contributions',
			disabled: true
		}
	]
	activeTab: IEaasiTab = this.tabs[0];

	/* Methods
	============================================*/

    async search() {
		await this.$store.dispatch('bookmark/getBookmarks', this.user.id);
		await this.$store.dispatch('resource/searchResources');
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.search();
	}

}

</script>

<style lang="scss">
#myResources {

	h1 {
		background-color: lighten($light-neutral, 70%);
		border-top: solid 1px darken($light-neutral, 10%);
		display: block;
		font-weight: 300;
		margin-bottom: 0;
		padding: 3rem 3rem 1rem;
	}
}
</style>