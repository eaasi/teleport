<template>
	<div class="user-list">
		<table class="eaasi-table clickable">
			<thead>
				<tr>
					<sort-header sort-col="date" :query="query" @sort="sort">
						Date
					</sort-header>
					<sort-header sort-col="changes" :query="query" @sort="sort">
						Changes
					</sort-header>
					<sort-header sort-col="details" :query="query" @sort="sort">
						Details
					</sort-header>
				</tr>
			</thead>
			<tbody>
				<tr v-for="rev in revisions" :key="rev.id" @click="$emit('rowClick', u)">
					<td>N/A</td>
					<td>1</td>
					<td><span class="edrl-details">DETAILS</span></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import {IEnvironmentRevision} from '@/types/Resource';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiSearchQuery } from '@/types/Search';
import SortHeader from '@/components/global/tables/SortHeader.vue';

@Component({
	name: 'EnvironmentDetailsRevisionList',
	components: {
		SortHeader
	}
})
export default class EnvironmentDetailsRevisionList extends Vue {

	/* Props
    ============================================*/
	@Prop({ required: true, type: () => [] as IEnvironmentRevision[] })
	revisions?: IEnvironmentRevision[];

	query: IEaasiSearchQuery;

	/* Computed
    ============================================*/

	/* Methods
    ============================================*/

	sort(query: IEaasiSearchQuery) {
    	this.query = query;
    	// this.$store.dispatch('admin/getUsers');
	}
}

</script>

<style lang="scss">
	.edrl-details {
		color: $dark-blue;
		font-weight: bold;
		text-transform: uppercase;
	}
</style>
