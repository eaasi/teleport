<template>
	<div class="resource-side-bar">
		<alert
			bordered
			card
			collapsable
			v-if="!hasDevicesAvailable"
			type="error"
			style="margin: 1rem 2rem 2rem 2rem;"
		>
			Available Devices Full
			<div slot="details">
				Unmark a selected resource to free up a drive to mark a new one.
			</div>
		</alert>
		<tabbed-nav
			:value="activeTab.label"
			:tabs="tabs"
			color-preset="clear-white"
		/>
		<div class="content flex flex-column">
			<ui-button color-preset="light-blue" icon="plus">
				Add Object
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import InfoMessage from './shared/InfoMessage.vue';

@Component({
	name: 'ResourceSideBar',
	components: {
		InfoMessage
	}
})
export default class ResourceSideBar extends Vue {

	/* Props
	============================================*/

	/* Computed
	============================================*/
	get hasDevicesAvailable(): boolean {
		return true;
	}

	/* Data
	============================================*/
	tabs: IEaasiTab[] = [
		{
			label: 'Project Resources'
		},
	]
	activeTab: IEaasiTab = this.tabs[0];

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

}
</script>

<style lang='scss'>
.resource-side-bar {
	margin-top: 2rem;

	.content {
		padding: 2rem;

		button {
			width: 30rem;
		}
	}
}
</style>