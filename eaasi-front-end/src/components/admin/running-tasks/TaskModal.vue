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
	import {Sync} from 'vuex-pathify';

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

		get isComplete() {
			return this.success || this.error;
		}

		/**
		 * Polls the task state endpoint to keep track of import status
		 */
		async pollTask() {
			const { taskId, pollingInterval } = this.task;
			if (!taskId) return;
			if (this.timer) clearInterval(this.timer);
			this.timer = setInterval(async () => {
				let taskState = await this.$store.dispatch('task/getTaskState', taskId) as ITaskState;
				if (!taskState || taskState.isDone) {
					this.$emit('success', taskState);
					clearInterval(this.timer);
					this.success = true;
					setTimeout(() => this.$emit('close'), 2500);
				}
				else if (taskState.message && taskState.status == '1') {
					clearInterval(this.timer);
					this.error = taskState.message;
				}
				return;
			}, pollingInterval || 3000);
		}

		/**
		 * Reset to default state
		 */
		reset() {
			if (this.timer) clearInterval(this.timer);
			this.error = null;
			this.success = false;
		}


		/* Lifecycle Hooks
        ============================================*/
		async mounted() {
			await this.pollTask();
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