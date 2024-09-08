import EaasiTask from '@/models/task/EaasiTask';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';

@Component
export default class TaskManager extends Vue {

    /* Computed
    ============================================*/
    @Get('task/activePollingTask')
    activePollingTask: EaasiTask;

    /* Methods
	============================================*/
    timer: NodeJS.Timeout = null;

    /* Methods
	============================================*/
    async initTasks() {
		await this.$store.dispatch('task/getAllTasks');
		clearInterval(this.timer);
		await this.pollActiveTask();
    }

    async pollActiveTask() {
		if (!this.activePollingTask) return;
		clearInterval(this.timer);
		this.timer = setInterval(async () => {
			const task = await this.$store.dispatch('task/getTaskState', this.activePollingTask.taskId);
			if (!task) clearInterval(this.timer);
		}, 3000);
    }

    /* Lifecycle hooks
    ==============================================*/
    async beforeMount() {
        await this.initTasks();
    }

	/* Watcher
	==============================================*/
	@Watch('activePollingTask')
	async onActiveTaskChange(nextTask: EaasiTask, prevTask: EaasiTask) {
		if (!nextTask) {
			clearInterval(this.timer);
		} else if (!prevTask) {
			this.pollActiveTask();
		}
	}

}