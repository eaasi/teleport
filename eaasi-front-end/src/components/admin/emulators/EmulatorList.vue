<template>
	<div class="emulator-list">
		<table class="eaasi-table clickable">
			<thead>
				<tr>
					<th>
						Name
					</th>
					<th>
						Number of Images
					</th>
					<th style="width: 100px;"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="e in list" :key="e.name" @click="$emit('click:row', e)">
					<td>{{ e.name }}</td>
					<td>{{ e.entries.length }}</td>
					<td @click="$emit('click:row', e)" class="text-center btn-cell">
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
import { IEaasiSearchQuery, IEaasiSearchResponse } from '@/types/Search';
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

	/* Methods
	============================================*/

	sort(rule) {

	}

}

</script>