<template>
	<modal @close="cancel" size="sm" v-if="task">
		<div class="text-center tm-content">
			<div class="tm-loader">
				<loader v-if="!error && !success" />
			</div>
			<div class="tm-message" v-if="!isComplete">
				{{ task.description || 'Please Wait' }}...
			</div>
			<alert-card type="error" v-if="error">
				<strong>Error: </strong>
				{{ error }}
			</alert-card>
			<alert-card type="success" v-if="success">
				This task was succesfully completed
			</alert-card>
		</div>
	</modal>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Component, Prop, Watch } from 'vue-property-decorator';
	import EaasiTask from '@/models/task/EaasiTask';
	import { ITaskState } from '@/types/Task';
	import { jsonEquals } from '@/utils/functions';
	import { Get, Sync } from 'vuex-pathify';

	@Component({
		name: 'TaskModal'
	})
	export default class TaskModal extends Vue {

		@Prop({ type: Object as () => EaasiTask, required: false })
		readonly task: EaasiTask;

		/* Computed
		============================================*/
		@Get('task/taskQueue')
		taskQueue: EaasiTask[];

		/* Data
        ============================================*/
		error: string = null;
		success: boolean = false;

		/* Methods
        ============================================*/
		cancel() {
			this.$emit('close');
			this.reset();
		}

		get isComplete() {
			return this.success || this.error;
		}

		reset() {
			this.error = null;
			this.success = false;
		}

		/* Watcher
        ============================================*/
		@Watch('taskQueue', { immediate: true })
		onTaskQue(currentTaskQueue: EaasiTask[]) {
			const currentTask = currentTaskQueue.find(task => task.taskId === this.task.taskId);
			if (currentTask) {
				if (currentTask.isDone) {
					this.$emit('success', currentTask);
					this.success = true;
				}
				return;
			}
			this.success = false;
			this.error = 'Something went wrong, please try again.';
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