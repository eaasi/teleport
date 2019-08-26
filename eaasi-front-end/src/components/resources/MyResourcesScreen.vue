<template>
	<div class="">
		<h1>My Resources</h1>
		<ui-button @click="menuOpen = !menuOpen">
			Toggle Slide Menu
		</ui-button>
		<resource-actions-manu :open="menuOpen" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { UiButton } from '@/components/global';
import SlideMenu from '@/components/layout/SlideMenu.vue';

@Component({
	name: 'MyResourcesScreen',
	components: {
		SlideMenu,
		UiButton
	}
})
export default class MyResourcesScreen extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/
	menuOpen: boolean = false;

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