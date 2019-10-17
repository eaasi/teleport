<template>
	<div class="running-task-list">
		<table class="eaasi-table clickable" v-if="runningTasks.length">
			<thead>
				<tr>
					<th>
						Tasks
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="task in runningTasks" :key="task.taskId">
					<td>
						<i :class="`task-spinner fas fa-fw fa-circle-notch fa-spin`"></i>
						{{ task.description }}</td>
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
	runningTasks: IEmulator;

	/* Data
	============================================*/
	timer: number = null;
	success: boolean = false;
	error: string = null;

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/
	created() {
	}
}

</script>
<style lang="scss">
	.task-spinner {
		margin-right: 1.8rem;
	}
</style>