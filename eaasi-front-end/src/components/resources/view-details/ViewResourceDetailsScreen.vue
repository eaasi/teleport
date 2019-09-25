<template>
	<div id="myResources">
		<h1>Resource Details</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<mode-toggle-bar />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import ModeToggleBar from '@/components/resources/view-details/ModeToggleBar.vue';

@Component({
	name: 'ViewResourceDetailsScreen',
	components: {
		ModeToggleBar,
	}
})
export default class ViewResourceDetailsScreen extends Vue {

	/* Props
	============================================*/
	@Prop({ type: String })
	resourceEnvId: string;

	/* Data
	============================================*/

	activeTab: string = 'History';
	menuOpen: boolean = false;

	tabs: IEaasiTab[] = [
		{
			label: 'History'
		},
		{
			label: 'Metadata'
		},
	]

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	mounted() {
	}
}

</script>

<style lang="scss">
</style>