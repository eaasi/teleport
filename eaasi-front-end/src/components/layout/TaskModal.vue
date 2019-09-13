<template>
	<modal @close="cancel" size="sm" v-if="task">
		<div class="text-center tm-content">
			<div class="tm-loader">
				<loader v-if="!error" />
			</div>
			<div class="tm-message" v-if="!error">{{ task.description || 'Please Wait' }}...</div>
			<alert-card type="error" class="tm-error" v-if="error"> {{ error }}</alert-card>
		</div>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import EaasiTask from '@/models/task/EaasiTask';
import { ITaskState } from '@/types/Task';

@Component({
	name: 'TaskModal'
})
export default class TaskModal extends Vue {

	/**
	 * The active task
	 */
	@Prop({type: Object as () => EaasiTask, required: false})
	readonly task: EaasiTask

	/* Data
	============================================*/

	timer: number = null;
	error: string = null;

	/* Methods
	============================================*/

	cancel() {
		if(this.timer) clearInterval(this.timer);
		this.$emit('close');
	}

	/**
	 * Polls the task state endpoint to keep track of import status
	 */
	async pollTask() {
		let self = this;
		if(self.timer) clearInterval(self.timer);
		self.timer = setInterval(async () => {
			let taskState = await self.$store.dispatch('getTaskState', self.task.taskId) as ITaskState;
			if(!taskState || taskState.isDone) {
				clearInterval(self.timer);
				self.$emit('close');
			}
			else if(taskState.message && taskState.status == '1') {
				clearInterval(self.timer);
				self.error = taskState.message;
			}
		}, self.task.pollingInterval);
	}


	/* Lifecycle Hooks
	============================================*/

	mounted() {
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