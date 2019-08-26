<template>
	<div class="">
		<h1>My Resources</h1>
		<ui-button @click="menuOpen = !menuOpen">
			Toggle Slide Menu
		</ui-button>
		<resource-actions-menu
			:open="menuOpen"
			:resource="resource"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { UiButton } from '@/components/global';
import ResourceActionsMenu from './ResourceActionsMenu.vue';
import { IEaasiResource } from 'eaasi-resource';

@Component({
	name: 'MyResourcesScreen',
	components: {
		ResourceActionsMenu,
		UiButton
	}
})
export default class MyResourcesScreen extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/
	menuOpen: boolean = false;
	resource: IEaasiResource = {
		title: 'Adobe Acrobat'
	}

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>