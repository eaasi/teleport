<template>
	<div id="myResources">
		<h1>Resource Details</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />

		<div class="resource-results">
			<resource-facets />
			<resource-list
				:query="query"
				:result="result"
				v-if="result"
				class="padded"
			/>
		</div>
		<resource-slide-menu
			:open="!!activeResource"
			:resource="activeResource"
			@close="activeResource = null"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {IEaasiTab} from "eaasi-nav";

@Component({
	name: 'ViewResourceDetailsScreen',
	components: {
	}
})
export default class ViewResourceDetailsScreen extends Vue {

	/* Props
	============================================*/
	@Prop({ type: String })
	resourceEnvId: string;

	/* Data
	============================================*/

	activeTab: string = 'Imported Resources';
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