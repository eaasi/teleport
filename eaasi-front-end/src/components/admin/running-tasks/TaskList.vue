<template>
	<div v-if="!closed" :class="['task-list-wrapper', { fixed }]">
		<div v-if="taskQueue && taskQueue.length" class="task-list-container">
			<div class="task-header flex flex-row justify-between">
				<span class="left-header">
					{{ tasksInProgress }} Process<span v-if="tasksInProgress > 1 || tasksInProgress === 0">es</span> Running
				</span>
				<div class="right-header flex flex-row justify-between">
					<span
						v-if="collapsible"
						:class="`icon fas fa-chevron-${toggleIcon}`"
						@click="collapseToggle"
						style="margin-right: 2rem;"
					></span>
					<span
						v-if="closable"
						class="icon fas fa-times"
						@click="closeToggle"
					></span>
				</div>
			</div>
			<ul class="task-list task-list-wrapper" v-show="!collapsed">
				<li
					class="task-list-content"
					v-for="task in tasks"
					:key="task.id"
				>
					<task-card
						:task="task"
						@remove-task="removeTask"
					/>
				</li>
			</ul>
		</div>
		<div v-else>
			There are currently no running tasks.
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import TaskCard from './TaskCard.vue';
import EaasiTask from '@/models/task/EaasiTask';
import UserPreferenceService from '@/services/UserPreferenceService';
import TaskPreferenceService from '@/services/TaskPreferenceService';
import eventBus from '@/utils/event-bus';

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
	readonly collapsible: boolean;

	@Prop({ type: Boolean, default: false })
	readonly closable: boolean;

	@Prop({ type: Boolean, default: false })
	readonly fixed: boolean;

	/* Computed
	============================================*/
	isShow: boolean = false;

	@Get('task/taskQueue')
	taskQueue: EaasiTask[];

	@Get('task/orderedTasks')
	tasks: EaasiTask[];

	@Get('task/completedTasks')
	completedTasks: EaasiTask[];

	get toggleIcon(): String {
		return this.collapsible && this.collapsed ? 'up' : 'down';
	}

	get tasksInProgress(): Number {
		if (!this.tasks.length) return 0;
		return this.tasks.filter(t => !t.isDone).length;
	}

	/* Data
	============================================*/
	private taskPreferenceSvc = new TaskPreferenceService();

	collapsed: boolean = false;
	closed: boolean = false;

	/* Methods
	============================================*/
	async removeTask(task: EaasiTask) {
		await this.$store.dispatch('task/deleteTask', task.id);
	}

	retrieveUserSetting() {
		const userPreference = this.taskPreferenceSvc.retrieveTaskPreferences();
		if (this.closable) {
			this.closed = userPreference?.closed ?? false;
		}
		if (this.collapsible) {
			this.collapsed = userPreference?.collapsed ?? false;
		}
	}

	closeToggle() {
		const closed = !this.closed;
		this.taskPreferenceSvc.persistTaskClosePreference(closed);
		this.closed = closed;
	}

	collapseToggle() {
		const collapsed = !this.collapsed;
		this.taskPreferenceSvc.persistTaskCollapsePreference(collapsed);
		this.collapsed = collapsed;
	}

	showTaskManager() {
		console.log('show task manager');
		this.taskPreferenceSvc.persistTaskClosePreference(false);
		this.taskPreferenceSvc.persistTaskCollapsePreference(false);
		this.closed = false;
		this.collapsed = false;
	}

	hideTaskManager() {
		this.taskPreferenceSvc.persistTaskClosePreference(true);
		this.taskPreferenceSvc.persistTaskCollapsePreference(true);
		this.closed = true;
		this.collapsed = true;
	}

	beforeMount() {
		this.retrieveUserSetting();
		eventBus.$on('task-manager:show', () => this.showTaskManager());
		eventBus.$on('task-manager:hide', () => this.hideTaskManager());
	}

	beforeDestroy() {
		eventBus.$off('task-manager:show');
		eventBus.$off('task-manager:hide');
	}

}
</script>

<style lang='scss'>
.task-list-wrapper {

	&.fixed {
		z-index: 400;

		.task-list-container {
			bottom: 20px;
			max-height: 30rem;
			position: fixed;
			right: 20px;
			width: 400px;
		}
	}

	.task-list {
		background: #ffffff;
		max-height: 26rem;
		overflow-y: scroll;
		padding: 0;
	}
}

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