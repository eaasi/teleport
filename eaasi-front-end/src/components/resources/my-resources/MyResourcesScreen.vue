<template>
	<div id="myResources" :style="actionMenuStyles">
		<div :style="innerStyles">
			<div class="page-title">
				<h1>
					My Resources
				</h1>
			</div>

			<tabbed-nav :tabs="tabs" v-model="activeTab" />

			<!--<my-bookmarks-screen
				v-if="activeTab === 'My Bookmarks'"
				:action-menu-tabs="actionMenuTabs"
				@open-action-menu="openActionMenu"
			/>-->

			<imported-resources-screen
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
import { IEaasiResource } from '@/types/Resource';
import MyBookmarksScreen from '@/components/resources/my-resources/MyBookmarksScreen.vue';
import ImportedResourcesScreen from '@/components/resources/my-resources/ImportedResourcesScreen.vue';
import ResourceSlideMenu from '@/components/resources/ResourceSlideMenu.vue';
import SlideMenuControlButtons from '@/components/resources/SlideMenuControlButtons.vue';

@Component({
	name: 'MyResourcesScreen',
	components: {
		/*MyBookmarksScreen,*/
		ResourceSlideMenu,
		ImportedResourcesScreen,
		SlideMenuControlButtons
	}
})
export default class MyResourcesScreen extends Vue {

	/* Props
	============================================*/
	@Prop({ type: String, required: false, default: 'Imported Resources' })
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
	activeTab: string = 'Imported Resources';
	tabs: IEaasiTab[] = [
		/*{
			label: 'My Bookmarks',
			disabled: false
		},*/
		{
			label: 'Imported Resources',
			disabled: false
		},
		// hidden per https://gitlab.com/eaasi/eaasi-client-dev/-/issues/608
		// {
		// 	label: 'My Contributions',
		// 	disabled: true
		// }
	];

	actionMenuActiveTab: IEaasiTab = {
		label: 'Imported Resources',
		disabled: false
	};

	/* Methods
	============================================*/
	refresh() {
		const currentTab = this.activeTab;
		this.activeTab = '';
		this.$nextTick(() => this.activeTab = currentTab);
	}

	openActionMenu(tab: IEaasiTab = this.actionMenuTabs[0]) {
		this.actionMenuActiveTab = tab;
	}

	closeActionMenu() {
		this.actionMenuActiveTab = null;
	}

	/* Lifecycle Hooks
	============================================*/
	created() {
		this.activeTab = this.defaultTab;
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
		background-color: $grey;
		display: block;
		font-weight: 300;
		margin-bottom: 0;
		padding: 20px 15px
	}

	.deselect-all-wrapper {
		background-color: $grey;
		padding: 1.5rem;

		.deselect-link {
			color: $dark-light-grey;
			cursor: pointer;
			font-size: 1.4rem;
			font-weight: bold;
		}
		.icon-deselect {
			background-color: $dark-light-grey;
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