<template>
	<div class="running-task-list">
		<table class="eaasi-table clickable" v-if="runningTasks.ength">
			<thead>
			<tr>
				<th>
					Task
				</th>
				<th>
					Status
				</th>
				<th style="width: 100px;"></th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="task in runningTasks" :key="task.taskId">
				<td>{{ task.description }}</td>
				<td>{{ task.status }}</td>
			</tr>
			</tbody>
		</table>
		<div v-else>
			There are currently no running tasks.
		</div>
	</div>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import { IEmulator } from 'eaasi-admin';

@Component({
	name: 'RunningTaskList'
})
export default class RunningTaskList extends Vue {
	/* Computed
	============================================*/
	@Sync('runningTasks')
	runningTasks: IEmulator

	/* Data
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/
	created() {
	}
}

</script>
<style lang="scss">
</style>