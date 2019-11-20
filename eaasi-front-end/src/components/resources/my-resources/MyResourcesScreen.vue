<template>
	<div id="myResources">
		<h1>My Resources</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<my-bookmarks-section v-if="activeTab === 'My Bookmarks'" />
		<imported-resources-section v-if="activeTab === 'Imported Resources'" />

		<!-- Resources Slide Menu -->
		<resource-slide-menu
			:open="hasActiveResources && isMenuOpenRequest"
			@toggle="toggleSideMenu"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import { IEaasiTab } from 'eaasi-nav';
import { IEaasiResource } from '@/types/Resource.d.ts';
import MyBookmarksSection from '@/components/resources/my-resources/MyBookmarksSection.vue';
import ImportedResourcesSection from '@/components/resources/my-resources/ImportedResourcesSection.vue';
import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';

@Component({
	name: 'MyResourcesScreen',
	components: {
		MyBookmarksSection,
		ResourceSlideMenu,
		ImportedResourcesSection
	}
})
export default class MyResourcesScreen extends Vue {

	/* Props
	============================================*/
	@Prop({ type: String, required: false, default: 'My Bookmarks' })
	activeTab: string;

	/* Computed
	============================================*/

	@Sync('resource/selectedResources')
    selectedResources: IEaasiResource[];

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
			disabled: false
		},
		{
			label: 'My Contributions',
			disabled: true
		}
	];

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