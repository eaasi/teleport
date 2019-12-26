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
					<td @click="harvesterToDelete = har" class="text-center btn-cell">
						<span>REMOVE</span>
					</td>
				</tr>
			</tbody>
		</table>
		<confirm-modal
			title="Delete this endpoint?"
			v-if="!!harvesterToDelete"
			@click:confirm="removeEndpoint()"
			@close="harvesterToDelete = null"
		>
			Are you sure you want to delete the {{ harvesterToDelete }} endpoint? <br /> This action cannot be undone.
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'HarvesterList'
})
export default class HarvesterList extends Vue {

	/* Props
	============================================*/

	@Prop({type: Array, required: true})
	readonly list: string[];

	/* Data
	============================================*/

	harvesterToDelete: string = null;

	/* Methods
	============================================*/

	syncEndpoint(name: string, full: boolean = false) {
		this.$store.dispatch('admin/syncHarvester', { name, full });
	}

	async removeEndpoint() {
		await this.$store.dispatch('admin/deleteHarvester', this.harvesterToDelete);
		this.harvesterToDelete = null;
	}
}

</script>