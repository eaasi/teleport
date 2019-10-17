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
import { ITaskState } from '@/types/Task';
import { IEmulator } from 'eaasi-admin';
import { Component } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';

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
	timer: number = null;
	success: boolean = false;
	error: string = null;

	/* Methods
	============================================*/
	/**
	 * Polls the task state endpoint to keep track of import status
	 */
	async pollTask(taskId: string) {
		console.log('POLLING FOR TASK: ', taskId)
		if (!taskId) return;
		let self = this;
		if (self.timer) clearInterval(self.timer);
		self.timer = setInterval(async () => {
			let taskState = await self.$store.dispatch('getTaskState', taskId) as ITaskState;

			console.log(taskState);

			if (!taskState || taskState.isDone) {
				self.success = true;
			}
			else if (taskState.message && taskState.status == '1') {
				clearInterval(self.timer);
				self.error = taskState.message;
			}
		}, 1000 );
	}

	/* Lifecycle Hooks
	============================================*/
	created() {
	}
}

</script>
<style lang="scss">
</style>