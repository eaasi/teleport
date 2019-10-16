<template>
	<div class="user-list">
		<table class="eaasi-table clickable">
			<thead>
				<tr>
					<sort-header sort-col="date" :query="query" @sort="sort">
						Date
					</sort-header>
					<sort-header sort-col="changes" :query="query" @sort="sort" :width="900">
						Changes
					</sort-header>
					<sort-header sort-col="details" :query="query" @sort="sort">
						<span>
							Details
						</span>
					</sort-header>
				</tr>
			</thead>
			<tbody>
				<template v-for="rev in revisions" @click="$emit('rowClick', rev)">
					<tr
						:key="rev.id"
						:class="{ isExpanded: expandedRows.includes(rev.id)}"
						@click="toggle(rev.id)"
					>
						<td>N/A</td>
						<td>
							<span :class="['encircled', {activeEncircled: expandedRows.includes(rev.id)}]">&nbsp; 1 &nbsp;</span>
							<div
								class="edrl-details-content"
								v-if="expandedRows.includes(rev.id)"
							>
								{{ rev.text | stripHtml }}
							</div>
						</td>
						<td class="edrl-details-cell">
							<span
								class="edrl-details-heading"
								v-if="!expandedRows.includes(rev.id)"
							>
								DETAILS
							</span>
							<span class="edrl-details-heading encircled" v-else>
								<i class="fas fa-fw fa-chevron-up"></i>
							</span>
						</td>
					</tr>
				</template>
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
    @Prop({ required: true, type: Array })
    revisions?: IEnvironmentRevision[];

    query: IEaasiSearchQuery = {descending: false, keyword: '', limit: 0, page: 0, sortCol: 'date'};

    /**
     *  The collection of expanded rows
     */
    expandedRows: any[] = [];

    /* Computed
    ============================================*/

    /* Methods
    ============================================*/

    sort(query: IEaasiSearchQuery) {
    	this.query = query;
    	// this.$store.dispatch('admin/getUsers');
    }

    toggle(id: string) {
    	const index = this.expandedRows.indexOf(id);
    	if (index > -1) {
    		this.expandedRows.splice(index, 1);
    	} else {
    		this.expandedRows.push(id);
    	}
    }
}

</script>

<style lang="scss">
	.edrl-details-cell {
		align-content: center;
		text-align: center;

		.edrl-details-heading {
			color: $dark-blue;
			font-weight: bold;
			text-transform: uppercase;
		}
	}

	.encircled {
		background-color: #FFFFFF;
		border-radius: 50%;
		height: 12px;
		padding: 0.4rem;
		width: 12px;
	}

	.activeEncircled {
		background-color: $dark-neutral;
		color: #FFFFFF;
	}

	.edrl-details-content {
		margin: 2.8rem 0 1rem 0;
	}
</style>
