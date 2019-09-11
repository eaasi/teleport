<template>
	<div class="emulator-list">
		<table class="eaasi-table clickable">
			<thead>
				<tr>
					<sort-header sort-col="name" :query="query" @sort="sort">
						Name
					</sort-header>
					<sort-header sort-col="email" :query="query" @sort="sort">
						Number of Images
					</sort-header>
					<th style="width: 100px;"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="e in list" :key="e.name" @click="$emit('rowClick', e)">
					<td>{{ e.name }}</td>
					<td>{{ getNumImages(e) }}</td>
					<td @click="$emit('click:row', e)" class="text-center el-details-link">
						<span>DETAILS</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiSearchQuery, IEaasiSearchResponse } from 'eaasi-http';
import { Get, Sync } from 'vuex-pathify';
import { IEmulator } from 'eaasi-admin';

@Component({
	name: 'EmulatorList'
})
export default class EmulatorList extends Vue {

	/* Props
	============================================*/

	@Prop({type: Array, required: true})
	readonly list: IEmulator[]

	@Prop({type: Object as () => IEaasiSearchQuery, required: true})
	readonly query: IEaasiSearchQuery

	/* Methods
	============================================*/

	getNumImages(e: IEmulator) {
		// TODO
		return 1;
	}

	sort(rule) {

	}

}

</script>

<style lang="scss">
table tbody td.el-details-link {
	padding: 0.2rem 1rem;

	span {
		border-radius: 6px;
		color: $dark-blue;
		display: block;
		font-weight: bold;
		padding: 10px;
		transition: background-color 0.2s;

		&:hover {
			background-color: #FFFFFF;
		}
	}
}
</style>