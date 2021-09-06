<template>
	<div class="harvester-list">
		<table class="eaasi-table" id="oai-pmh-endpoints">
			<caption>Available OAIP-MH Harvester Endpoints</caption>
			<thead>
				<tr>
					<th scope="col">Endpoint Name</th>
					<th scope="col" style="width: 200px;"></th>
					<th scope="col" style="width: 150px;"></th>
					<th scope="col" style="width: 100px;"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="har in list" :key="har" @click="$emit('click:row', har)">
					<td>{{ har }}</td>
					<td @click="syncEndpoint(har)" class="text-center btn-cell">
						<span>SYNC INCREMENTAL</span>
					</td>
					<td @click="syncEndpoint(har, true)" class="text-center btn-cell">
						<span>SYNC FULL</span>
					</td>
					<td @click="harvesterToEdit = har" class="text-center btn-cell">
						<span>DETAILS</span>
					</td>
				</tr>
			</tbody>
		</table>
		<harvester-details-modal
			v-if="!!harvesterToEdit"
			action-type="Edit"
			:harvester="harvesterToEdit"
			@close="harvesterToEdit = null"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import HarvesterDetailsModal from './HarvesterDetailsModal.vue';

@Component({
	name: 'HarvesterList',
	components: {
		HarvesterDetailsModal
	}
})
export default class HarvesterList extends Vue {

	/* Props
	============================================*/

	@Prop({type: Array, required: true})
	readonly list: string[];

	/* Data
	============================================*/

	harvesterToEdit: string = null;

	/* Methods
	============================================*/

	syncEndpoint(name: string, full: boolean = false) {
		this.$store.dispatch('admin/syncHarvester', { name, full });
	}
}

</script>