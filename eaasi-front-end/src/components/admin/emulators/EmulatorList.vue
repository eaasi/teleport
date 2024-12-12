<template>
	<div class="emulator-list">
		<table class="eaasi-table clickable" aria-label="Available Emulators">
			<thead>
				<tr>
					<th scope="col"> Name </th>
					<th scope="col"> Number of Images </th>
					<th scope="col" style="width: 100px;" class="hide"> Details button</th>
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
import { IEmulator } from 'eaasi-admin';

@Component({
	name: 'EmulatorList'
})
export default class EmulatorList extends Vue {

	/* Props
	============================================*/

	@Prop({type: Array, required: true})
	readonly list: IEmulator[]
}

</script>

<style lang="scss">
.hide {
	display: none;
}
</style>