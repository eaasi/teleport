<template>
	<div v-if="taskQueue && taskQueue.length" class="task-list-container">
		<div class="task-header flex flex-row justify-between">
			<span class="left-header">
				{{ tasksInProgress }} Process<span v-if="tasksInProgress > 1">es</span> Running
			</span>
			<div class="right-header flex flex-row justify-between">
				<span 
					v-if="collapsible"
					:class="`icon fas fa-chevron-${toggleIcon}`"
					@click="collapsed = !collapsed"
					style="margin-right: 2rem;"
				></span>
				<span 
					v-if="closable" 
					class="icon fas fa-times" 
					@click="$emit('close')"
				></span>
			</div>
		</div>
		<div class="task-list-content" v-show="!collapsed">
			<task-card
				v-for="task in tasks"
				:key="task.id"
				:task="task"
				@remove-task="removeTask"
			/>
		</div>
	</div>
	<div v-else>
		There are currently no running tasks.
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import TaskCard from './TaskCard.vue';
import EaasiTask from '@/models/task/EaasiTask';

@Component({
	name: 'TaskList',
	components: {
		TaskCard
	}
})
export default class TaskList extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Boolean, default: false })
	readonly collapsible: Boolean;

	@Prop({ type: Boolean, default: false })
	readonly closable: Boolean;

	@Prop({ type: Boolean, default: false })
	readonly initState: Boolean;

	/* Computed
	============================================*/
	@Sync('task/taskQueue')
	taskQueue: EaasiTask[];

	@Get('task/activePollingTask')
	activePollingTask: EaasiTask;

	@Get('task/orderedTasks')
	tasks: EaasiTask[];

	@Get('task/completedTasks')
	completedTasks: EaasiTask[];

	get toggleIcon(): String {
		return this.collapsible && this.collapsed ? 'down' : 'up';
	}

	get tasksInProgress(): Number {
		if (!this.tasks.length) return 0;
		return this.tasks.filter(t => !t.isDone).length;
	}

	/* Data
	============================================*/
	collapsed: Boolean = this.initState;
	timer: number = null;
	tasksTimer: number = null;
	success: boolean = false;
	error: string = null;

	/* Methods
	============================================*/
	async initTasks() {
		await this.$store.dispatch('task/getAllTasks');
		clearInterval(this.timer);
		await this.pollActiveTask();
	}

	async pollActiveTask() {
		if (!this.activePollingTask) return;
		this.timer = setInterval(async () => {
			const task = await this.$store.dispatch('task/getTaskState', this.activePollingTask.taskId);
			if (!task) clearInterval(this.timer);
		}, 1000);
	}

	async removeTask(task: EaasiTask) {
		await this.$store.dispatch('task/deleteTask', task.id);
	}

	/*============================================================
	== Watcher
	/============================================================*/
	async mounted() {
		await this.initTasks();
	}

	beforeDestroy() {
		clearInterval(this.timer);
		clearInterval(this.tasksTimer);
	}

	@Watch('activePollingTask')
	async onActiveTaskChange(nextTask: EaasiTask, prevTask: EaasiTask) {
		if (!nextTask) {
			clearInterval(this.timer);
		} else if (!prevTask) {
			this.pollActiveTask();
		}
	}

}
</script>

<style lang='scss' scoped>
.task-list-container {
	.task-header {
		background-color: darken($teal, 60%);
		color: #ffffff;
		padding: 1.8rem 2rem;
		.icon {
			color: lighten($teal, 20%);
			cursor: pointer;
			font-size: 1.8rem;
		}
	}

	.task-list-content {
		border: 2px solid lighten($dark-neutral, 80%);
		border-top: none;
		overflow-y: scroll;
	}

	.task-container {
		border-bottom: 1px solid darken($light-neutral, 10%);
		padding: 1.5rem;

		&:last-of-type {
			border: none;
		}
		&.in-queue {
			opacity: 0.5;
		}
	}
}
</style>