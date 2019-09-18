<template>
	<div class="resource-list" v-if="result">
		<pagination :total-results="result.totalResults" />
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResource } from '../../types/Resource';
import { IEaasiSearchResponse } from 'eaasi-http';
import { IResourceSearchQuery } from 'eaasi-search';

@Component({
	name: 'ResourceList',
})
export default class ResourceList extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IEaasiSearchResponse<IEaasiResource>, required: true})
	readonly result: IEaasiSearchResponse<IEaasiResource>

	@Prop({type: Object as () => IResourceSearchQuery, required: true})
	readonly query: IResourceSearchQuery

	/* Data
	============================================*/

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