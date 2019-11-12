<template>
	<modal @close="cancel" size="sm" v-if="task">
		<div class="text-center tm-content">
			<div class="tm-loader">
				<loader v-if="!error && !success" />
			</div>
			<div class="tm-message" v-if="!error">{{ task.description || 'Please Wait' }}...</div>
			<alert-card type="error" v-if="error"><strong>Error: </strong> {{ error }}</alert-card>
			<alert-card type="success" v-if="success"> This task was succesfully completed</alert-card>
		</div>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import EaasiTask from '@/models/task/EaasiTask';
import { ITaskState } from '@/types/Task';
import { jsonEquals } from '@/utils/functions';

@Component({
	name: 'TaskModal'
})
export default class TaskModal extends Vue {

	/**
	 * The active task
	 */
	@Prop({type: Object as () => EaasiTask, required: false})
	readonly task: EaasiTask;

	/* Data
	============================================*/

	timer: number = null;
	error: string = null;
	success: boolean = false;

	/* Methods
	============================================*/

	cancel() {
		this.$emit('close');
		this.reset();
	}

	/**
	 * Polls the task state endpoint to keep track of import status
	 */
	async pollTask() {
		if (!this.task) return;
		let self = this;
		if (self.timer) clearInterval(self.timer);
		self.timer = setInterval(async () => {
			console.log('POLLING FOR TASK: ', self.task);
			let taskState = await self.$store.dispatch('getTaskState', self.task.taskId) as ITaskState;
			if (!taskState || taskState.isDone) {
				console.log('TASK IS DONE: ', self.task);
				self.success = true;
			}
			else if (taskState.message && taskState.status == '1') {
				console.log('TASK ERROR: ', self.task);
				clearInterval(self.timer);
				self.error = taskState.message;
			}
		}, self.task.pollingInterval);
	}

	/**
	 * Reset to default state
	 */
	reset() {
		if(this.timer) clearInterval(this.timer);
		this.error = null;
		this.success = false;
	}


	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.pollTask();
	}

	/* Watchers
	============================================*/

	@Watch('task')
	onTaskUpdated(newTask: EaasiTask | null, oldTask: EaasiTask | null) {
		if(!newTask) this.cancel();
		if(jsonEquals(newTask, oldTask)) return;
		this.reset();
		this.pollTask();
	}

}

</script>

<style lang="scss">
.tm-content {
	padding: 2rem 2rem 6rem;

	.card-container {
		box-sizing: border-box;
		max-width: 100%;
		width: 100%;
	}
}

.tm-loader {
	display: inline-block;
	margin: 0 auto 2.5rem;
}

.tm-message {
	font-size: 2rem;
}
</style>