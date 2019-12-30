<template>
	<div class="lil-container">
		<div v-if="renderingEnvs.length">
			<div
				v-for="env in renderingEnvs"
				:key="env.envId"
				class="flex flex-row justify-between selected-envs"
			>
				<span>{{ env.label }}</span>
				<div class="flex flex-row btns-horizontal">
					<ui-button
						size="sm"
						@click="run(env)"
					>
						Run
					</ui-button>
					<ui-button
						size="sm"
						color-preset="light-blue"
						icon="times"
						@click="remove(env)"
					>
						Remove
					</ui-button>
				</div>
			</div>
		</div>
		<div v-else-if="renderingEnvs">
			<span class="lil-no-data">
				No Environments Selected
			</span>
		</div>
		<div class="flex flex-row btns-horizontal" style="margin-top: 1rem;">
			<ui-button
				size="sm"
				color-preset="light-blue"
				icon="plus"
				@click="showEnvPicker = true"
			>
				Add Environment
			</ui-button>
			<ui-button
				size="sm"
				color-preset="light-blue"
				icon="cloud-download"
				@click="confirmAction = 'detect'"
			>
				Detect environments
			</ui-button>
		</div>

		<environment-picker-modal
			v-if="showEnvPicker && environments"
			:environments="environments"
			:selected-environments="renderingEnvs"
			@cancel="showEnvPicker = false"
			@add-env="addEnv"
		/>

		<confirm-modal
			v-if="confirmAction === 'detect'"
			@close="confirmAction = null"
			@click:confirm="classify"
			@click:cancel="confirmAction = null"
			title="Detect Environments?"
			confirm-label="Continue"
		>
			<alert type="info">
				<span class="ers-rep-msg">
					Automated characterization may take some time. Continue?
				</span>
			</alert>
		</confirm-modal>
		<modal
			v-if="showLoader"
			@close="showEnvPicker = false"
			@click:cancel="showEnvPicker = false"
		>
			<div class="flex flex-center">
				<p>Your request is proccessing. Please wait.</p>
				<loader />
			</div>
		</modal>
	</div>
</template>

<script lang="ts">
import {archiveTypes} from '@/utils/constants';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEnvironment, IObjectClassificationRequest } from '@/types/Resource';
import EnvironmentPickerModal from './EnvironmentPickerModal.vue';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { ITaskState } from '@/types/Task';
import EaasiTask from '@/models/task/EaasiTask';

@Component({
    name: 'RenderingEnvironments',
    components: {
        EnvironmentPickerModal
    }
})
export default class RenderingEnvironments extends Vue {

	@Prop({ type: String, required: true })
	resourceId: string;

	@Prop({ type: String, required: true })
	archiveId: string;

	/* Computed
	============================================*/
	get isSoftware() {
		return this.$route.path.indexOf('software') > 0;
	}

    /* Data
    ============================================*/
    environments: IEnvironment[] = [];
    showEnvPicker: boolean = false;
	showLoader: boolean = false;
	confirmAction: string = null;
	renderingEnvs: any[] = [];

    /* Methods
    ============================================*/
    async init() {
        let query = new ResourceSearchQuery();

        this.$store.commit('resource/SET_QUERY', {
			...query,
			types: ['Environment'],
			archives: [archiveTypes.REMOTE, archiveTypes.PUBLIC, archiveTypes.DEFAULT],
			limit: 1000
		});

        const { environments } = await this.$store.dispatch('resource/searchResources');
        if (!environments) return;

		this.environments = environments.result.filter(env => [archiveTypes.PUBLIC, archiveTypes.DEFAULT].includes(env.archive));
		this.$store.dispatch('resource/clearSearchQuery');
		this.$store.commit('resource/SET_RESULT', null);
    }

    addEnv(envId: string) {
		const env = this.findEnv(envId);
		this.renderingEnvs.push({
			id: env.envId,
			label: env.title,
			objectEnvironment: false
		});
        this.showEnvPicker = false;
    }

    findEnv(envId: string): IEnvironment {
        return this.environments.find(env => env.envId === envId);
    }

    async classify() {
		this.confirmAction = null;
        this.showLoader = true;
        const classifyRequest: IObjectClassificationRequest = {
            archiveId: this.archiveId,
			objectId: this.resourceId,
            updateClassification: false,
            updateProposal: true,
        };
        const task: ITaskState = await this.$store.dispatch('software/classify', classifyRequest);
        let timer = setInterval(async () => {
            let taskState = await this.$store.dispatch('getTaskState', task.taskId) as ITaskState;
            if(taskState.isDone && taskState.taskId === task.taskId) {
                clearInterval(timer);
                const res = JSON.parse(taskState.object);
                this.renderingEnvs = res.environmentList;
                this.showLoader = false;
            }
        }, 1000);
    }

    run(env) {
		const idType = this.isSoftware ? 'softwareId' : 'objectId';
        this.$router.push(`/access-interface/${env.id}?${idType}=${this.resourceId}&archiveId=${this.archiveId}`);
    }

    remove(env) {
        this.renderingEnvs = this.renderingEnvs.filter(i => i.id !== env.id);
    }

    /* Lifecycle Hooks
    ============================================*/
    beforeMount() {
        this.init();
    }

    beforeDestroy() {
        this.$store.dispatch('resource/clearSearchQuery');
    }

}
</script>

<style lang='scss' scoped>
.selected-envs {
	margin-top: 1rem;

	&:first-of-type {
		margin: 0;
	}
}
.btns-horizontal {
	:first-child {
		margin-right: 1rem;
	}
}
</style>