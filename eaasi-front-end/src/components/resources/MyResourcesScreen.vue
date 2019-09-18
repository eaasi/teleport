<template>
	<div id="myResources">
		<h1>My Resources</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />

		<div class="resource-results flex">
			<resource-facets />
			<resource-list
				:query="query"
				:result="result"
			/>
		</div>
		<resource-slide-menu
			:open="menuOpen"
			:resource="resource"
			@close="menuOpen = false"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ResourceSlideMenu from './ResourceSlideMenu.vue';
import ResourceFacets from './ResourceFacets.vue';
import ResourceList from './ResourceList.vue';
import { IEaasiResource } from '@/types/Resource.d.ts';
import { IEaasiTab } from 'eaasi-nav';

@Component({
	name: 'MyResourcesScreen',
	components: {
		ResourceFacets,
		ResourceList,
		ResourceSlideMenu
	}
})
export default class MyResourcesScreen extends Vue {

	/* Data
	============================================*/
	activeTab: string = 'Imported Resources';
	menuOpen: boolean = false;
	resource: IEaasiResource = {
		id: 1,
		title: 'Adobe Acrobat'
	}
	tabs: IEaasiTab[] = [
		{
			label: 'Imported Resources'
		},
		{
			label: 'My Bookmarks'
		},
		{
			label: 'My Contributions'
		}
	]

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

.resource-results {
	min-height: 80vh;
	position: relative;

	.resource-facets {
		bottom: 0;
		position: absolute;
		top: 0;
	}
}
</style>