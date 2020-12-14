<template>
	<div id="myResources" :style="actionMenuStyles">
		<div :style="innerStyles">
			<div class="page-title">
				<h1>
					My Resources
				</h1>
			</div>
			<tabbed-nav :tabs="tabs" v-model="activeTab" />

			<my-bookmarks-section
				v-if="activeTab === 'My Bookmarks'"
				:action-menu-tabs="actionMenuTabs"
				@open-action-menu="openActionMenu"
			/>

			<imported-resources-section
				v-if="activeTab === 'Imported Resources'"
				:action-menu-tabs="actionMenuTabs"
				@open-action-menu="openActionMenu"
			/>
		</div>

		<!-- Resources Slide Menu -->
		<resource-slide-menu
			v-if="isActionMenuOpen"
			:active-tab="actionMenuActiveTab"
			:tabs="actionMenuTabs"
			@bookmarks-updated="refresh"
			@resource-deleted="refresh"
			@resource-published="refresh"
			@close="closeActionMenu"
			@navigate-to-tab="openActionMenu"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {Get, Sync} from 'vuex-pathify';
import { IEaasiTab } from 'eaasi-nav';
import { IEaasiResource } from '@/types/Resource.d.ts';
import MyBookmarksScreen from '@/components/resources/my-resources/MyBookmarksScreen.vue';
import ImportedResourcesSection from '@/components/resources/my-resources/ImportedResourcesScreen.vue';
import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';
import SlideMenuControlButtons from '@/components/resources/SlideMenuControlButtons.vue';

@Component({
	name: 'MyResourcesScreen',
	components: {
		MyBookmarksScreen,
		ResourceSlideMenu,
		ImportedResourcesSection,
		SlideMenuControlButtons
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

	@Get('resource/slideMenuTabs')
	readonly actionMenuTabs: IEaasiTab[];

	get hasActiveResources() {
		return this.selectedResources.length > 0;
	}


	get isActionMenuOpen(): boolean {
		return this.actionMenuActiveTab != null && this.hasActiveResources;
	}

	get actionMenuStyles(): string {
		let styles = '';
		if (!this.isActionMenuOpen) return styles;
		let maxWidth = document.body.clientWidth - (430 + 90); // screen width - (action menu width + side menu bar width)
		styles += `overflow-y: scroll; max-width: ${maxWidth}px;`;
		return styles;
	}

	get innerStyles(): string {
		let styles = '';
		if (!this.isActionMenuOpen) return styles;
		let width = '95vw'; // screen width
		styles += `width: ${width};`;
		return styles;
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

	actionMenuActiveTab: IEaasiTab = null;

	/* Methods
	============================================*/
	refresh() {
		const currentTab = this.activeTab;
		this.activeTab = '';
		this.$nextTick(() => this.activeTab = currentTab);
	}

	openActionMenu(tab: IEaasiTab = this.actionMenuTabs[1]) {
		this.actionMenuActiveTab = tab;
	}

	closeActionMenu() {
		this.actionMenuActiveTab = null;
	}

	/* Lifecycle Hooks
	============================================*/
	mounted() {
		if (this.defaultTab !== this.activeTab) {
			this.activeTab = this.defaultTab;
		}
	}

	@Watch('hasActiveResources')
	onSelectResources(curVal, prevVal) {
		if (curVal && !prevVal) {
			this.openActionMenu();
		}
	}

}

</script>

<style lang="scss">
#myResources {

	.page-title {
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

		.deselect-link {
			color: $dark-blue;
			cursor: pointer;
			font-size: 1.4rem;
			font-weight: bold;
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