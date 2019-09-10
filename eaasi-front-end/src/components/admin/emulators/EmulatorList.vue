<template>
	<div class="emulator-list">
		<table class="eaasi-table clickable">
			<thead>
				<tr>
					<sort-header sort-col="username" :query="query" @sort="sort">
						Username
					</sort-header>
					<sort-header sort-col="email" :query="query" @sort="sort">
						Email
					</sort-header>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="e in emulators" :key="e.name" @click="$emit('rowClick', e)">
					<td>{{ e.name }}</td>
					<td>{{ e.numImages }}</td>
					<td @click="$emit('click:row', e)">
						<span class="details-link">Details</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiSearchQuery } from 'eaasi-http';
import { Get, Sync } from 'vuex-pathify';

@Component({
	name: 'EmulatorList',
})
export default class EmulatorList extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/

	/* Computed
	============================================*/

	@Sync('global/emulators')
	query: IEaasiSearchQuery

	/* Methods
	============================================*/

	sort(rule) {

	}

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>