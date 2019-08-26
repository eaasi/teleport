<template>
	<div class="padded" id="myResources">
		<h1>My Resources</h1>
		<ui-button @click="menuOpen = !menuOpen">
			Toggle Slide Menu
		</ui-button>
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
import { UiButton } from '@/components/global';
import ResourceSlideMenu from './ResourceSlideMenu.vue';
import { IEaasiResource } from '@/types/Resource.d.ts';

@Component({
	name: 'MyResourcesScreen',
	components: {
		ResourceSlideMenu,
		UiButton
	}
})
export default class MyResourcesScreen extends Vue {

	/* Data
	============================================*/

	menuOpen: boolean = false;
	resource: IEaasiResource = {
		id: 1,
		title: 'Adobe Acrobat'
	}

}

</script>

<style lang="scss"></style>