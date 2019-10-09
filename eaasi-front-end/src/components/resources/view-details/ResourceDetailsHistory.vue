// TODO

<template>
	<section id="rdHistory">
		<div class="padded" v-if="resourceHistoryEvents">
			<pagination
				:total-results="resourceHistoryEvents.totalResults"
				results-per-page="0"
				page-num="1"
				@paginate="paginate"
				class="user-pagination"
			/>
		</div>
		<table class="eaasi-table clickable">
			<thead>
				<tr>
					<sort-header sort-col="date" @sort="sort">
						Date
					</sort-header>
					<sort-header sort-col="email" :query="query" @sort="sort">
						Changes
					</sort-header>
					<sort-header sort-col="firstName" :query="query" @sort="sort">
						Details
					</sort-header>
				</tr>
			</thead>
			<tbody>
				<tr v-for="u in users" :key="u.id" @click="$emit('rowClick', u)">
					<td>{{ u.date }}</td>
					<td>{{ u.changes }}</td>
					<td>DETAILS</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import Pagination from '@/components/global/Pagination.vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'ResourceDetailsHistory',
	components: {
		Pagination
	}
})
export default class ResourceDetailsHistory extends Vue {

	/* Props
    ============================================*/

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
