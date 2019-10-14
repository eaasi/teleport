<template>
	<div class="harvester-list">
		<table class="eaasi-table">
			<thead>
				<tr>
					<th>
						Endpoint Name
					</th>
					<th style="width: 200px;"></th>
					<th style="width: 150px;"></th>
					<th style="width: 100px;"></th>
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
import { Get, Sync } from 'vuex-pathify';

@Component({
	name: 'HarvesterList'
})
export default class HarvesterList extends Vue {

	/* Props
	============================================*/

	@Prop({type: Array, required: true})
	readonly list: string[]

	/* Data
	============================================*/

	harvesterToDelete: string = null;

	/* Methods
	============================================*/

	syncEndpoint(name: string, full: boolean = false) {
		this.$store.dispatch('admin/syncHarvester', { name, full });
	}

	sort(rule) {
		// TODO:
	}

	removeEndpoint() {
		this.$store.dispatch('admin/deleteHarvester', this.harvesterToDelete);
		this.harvesterToDelete = null;
	}

}

</script>