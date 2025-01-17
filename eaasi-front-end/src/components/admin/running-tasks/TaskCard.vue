<!--
<template>
	<div
		:class="[
			'task-container flex flex-row justify-between',
			{ 'in-queue': task.isDone === undefined, 'done': task.isDone, 'error': hasError }
		]"
	>
		<span class="task-desc">{{ descriptionOrDefault }}</span>
		<span class="error-message" v-if="task.message">{{ task.message }}</span>
		<div style="white-space: nowrap;">
			<span v-if="hasError" class="fas fa-exclamation-triangle"></span>
			<span v-else-if="task.isDone" class="fas fa-check-circle"></span>
			<span v-else class="fas fa-fw fa-circle-notch fa-spin"></span>
			<span class="fas fa-times close-icon" @click="$emit('remove-task', task)"></span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import EaasiTask from '@/models/task/EaasiTask';

@Component({
    name: 'TaskCard'
})
export default class TaskCard extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Object, required: true })
    task: EaasiTask;

    /* Computed
	============================================*/
	get hasError(): boolean {
		return this.task.status !== '0';
	}

    get descriptionOrDefault(): string {
        return this.task.description ? this.task.description : `Task #${this.task.taskId}`;
    }

}
</script>

<style lang='scss' scoped>
.task-container {
	line-height: 2rem;
	.task-desc {
		word-break: break-word;
	}
	.error-message {
		color: $red;
		font-size: 1.2rem;
	}
	.close-icon {
		color: black;
		cursor: pointer;
		margin-left: 1rem;
	}
}
</style>-->
