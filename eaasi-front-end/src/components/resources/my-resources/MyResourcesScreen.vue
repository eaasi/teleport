<template>
	<div id="myResources">
		<h1>My Resources</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<my-bookmarks-section v-if="activeTab === 'My Bookmarks'" />
		
		<!-- Resources Slide Menu -->
		<resource-slide-menu
			:open="hasActiveResources && isMenuOpenRequest"
			@toggle="toggleSideMenu"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import { Get, Sync } from 'vuex-pathify';
import { IEaasiResource } from '@/types/Resource.d.ts';
import MyBookmarksSection from './MyBookmarksSection.vue';
import ResourceSlideMenu from '../ResourceSlideMenu.vue';
import User from '@/models/admin/User';

@Component({
	name: 'MyResourcesScreen',
	components: {
		MyBookmarksSection, ResourceSlideMenu
	}
})
export default class MyResourcesScreen extends Vue {
	
	/* Computed
	============================================*/

	@Sync('resource/selectedResources')
    selectedResources: IEaasiResource[]

	get hasActiveResources() {
		return this.selectedResources.length > 0;
	}

	/* Data
	============================================*/

	tabs: IEaasiTab[] = [
		{
			label: 'My Bookmarks',
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
	];
	activeTab: string = this.tabs[0].label;
	isMenuOpenRequest: boolean = true;

	toggleSideMenu() {
    	this.isMenuOpenRequest = !this.isMenuOpenRequest;
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