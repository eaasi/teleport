<template>
	<div class="sort-section flex flex-row">
		<div class="flex flex-row justify-between" style="width: 40rem;">
			<select-list
				:value="query.limit"
				style="width: 12rem;"
				@change="changeLimit"
			>
				<option
					v-for="limit in limitOptions"
					:key="limit"
					:value="limit"
				>
					{{ limit }} per page
				</option>
			</select-list>
			<div class="flex flex-row">
				<span class="sort-label">Sort By</span>
				<select-list
					:value="sortValue"
					style="width: 18rem;"
					@change="changeSort"
				>
					<option value="" selected disabled>
						Select Sort Rule
					</option>
					<option
						v-for="column in sortColumns"
						:key="column"
						:value="column"
					>
						{{ column }}
					</option>
				</select-list>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IEaasiSearchQuery } from '@/types/Search';
import { Sync, Get } from 'vuex-pathify';
import User from '@/models/admin/User';

@Component({
    name: 'ResourceSortSeciton'
})
export default class ResourceSortSeciton extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Array as () => Number[], default: () => [10, 25, 50, 100] })
    limitOptions: Number[];

    @Prop({ type: Array as () => String[], default: () => ['Name:ascending', 'Name:descending']})
    sortColumns: String[];

    /* Computed
    ============================================*/
    @Sync('resource/query')
    query: IEaasiSearchQuery;

    @Get('loggedInUser')
	user: User;

    /* Data
    ============================================*/
    sortValue: String = '';

    /* Methods
    ============================================*/
    async changeLimit(limit) {
		limit = parseInt(limit);
		this.$store.commit('resource/SET_QUERY', {...this.query, limit});
		await this.search();
    }

    async changeSort(sortVal) {
        this.sortValue = sortVal;
        const colArr = sortVal.split(':');
        const sortCol = colArr[0].toLowerCase();
        const descending = colArr[1] === 'descending';
		this.$store.commit('resource/SET_QUERY', {...this.query, sortCol, descending});
		await this.search();
    }

    async search() {
		await this.$store.dispatch('bookmark/getBookmarks', this.user.id);
    	await this.$store.dispatch('resource/searchResources');
	}

    /* Lifecycle Hooks
    ============================================*/

}
</script>

<style lang='scss' scoped>
.sort-section {
	justify-content: flex-end;
	margin: 1rem;
	.sort-label {
		font-size: 1.2rem;
		margin-right: 2.5rem;
		text-transform: uppercase;
	}
}
</style>