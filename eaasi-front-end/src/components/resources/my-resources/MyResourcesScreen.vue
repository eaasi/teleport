<template>
	<div id="myResources">
		<h1>My Resources</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<my-bookmarks-section v-if="activeTab.label === 'My Bookmarks'" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import { Get, Sync } from 'vuex-pathify';
import MyBookmarksSection from './MyBookmarksSection.vue';
import User from '@/models/admin/User';

@Component({
	name: 'MyResourcesScreen',
	components: { MyBookmarksSection }
})
export default class MyResourcesScreen extends Vue {

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

	activeTab: IEaasiTab = this.tabs[0];
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