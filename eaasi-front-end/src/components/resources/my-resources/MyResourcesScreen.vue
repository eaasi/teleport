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
			@resource-updated="refresh"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
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
	defaultTab: string;

	/* Computed
	============================================*/

	@Sync('resource/selectedResources')
    selectedResources: IEaasiResource[];

	get hasActiveResources() {
		return this.selectedResources.length > 0;
	}

	/* Data
	============================================*/
	activeTab: string = 'My Bookmarks';
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

	/* Methods
	============================================*/
	toggleSideMenu() {
    	this.isMenuOpenRequest = !this.isMenuOpenRequest;
	}
	
	refresh() {
		const currentTab = this.activeTab;
		this.activeTab = '';
		this.$nextTick(() => this.activeTab = currentTab);
	}

	/* Lifecycle Hooks
	============================================*/
	mounted() {
		if (this.defaultTab !== this.activeTab) {
			this.activeTab = this.defaultTab;
		}
	}
}

</script>

<style lang="scss">
#myResources {
	margin-bottom: 10rem;

	h1 {
		background-color: lighten($light-neutral, 70%);
		border-top: solid 1px darken($light-neutral, 10%);
		display: block;
		font-weight: 300;
		margin-bottom: 0;
		padding: 3rem 3rem 1rem;
	}
	.deselect-all-wrapper {
		background-color: lighten($light-blue, 90%);
		margin-left: 28rem;
		padding: 1.5rem;
		width: 100%;
		.deselect-link {
			color: $dark-blue;
			cursor: pointer;
			font-size: 1.4rem;
			font-weight: bold;
			max-width: 12rem;
		}
		.icon-deselect {
			background-color: $dark-blue;
			border-radius: 0.6rem;
			display: inline-block;
			height: 20px;
			position: relative;
			width: 20px;
			&::before {
				background-color: #ffffff;
				border-radius: 6px;
				content: '';
				height: 3px;
				left: 4px;
				position: absolute;
				top: 9px;
				width: 12px;
			}
		}
	}
}
</style>