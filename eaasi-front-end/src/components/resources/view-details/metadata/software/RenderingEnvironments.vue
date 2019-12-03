<template>
	<div class="lil-container">
		<div v-if="selectedEnvironments.length">
			<div
				v-for="env in selectedEnvironments"
				:key="env.envId"
				class="flex flex-row justify-between selected-envs"
			>
				<span>{{ env.label }}</span>
				<div class="flex flex-row btns-horizontal">
					<ui-button
						v-if="!readonly"
						size="sm"
						@click="run(env)"
					>
						Run
					</ui-button>
					<ui-button
						v-if="!readonly"
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
		<div v-else-if="selectedEnvironments">
			<span class="lil-no-data">No Environments Selected</span>
		</div>
		<div class="flex flex-row btns-horizontal" style="margin-top: 1rem;">
			<ui-button
				v-if="!readonly"
				size="sm"
				color-preset="light-blue"
				icon="plus"
				@click="showEnvPicker = true"
			>
				Add Environment
			</ui-button>
			<ui-button
				v-if="!readonly"
				size="sm"
				color-preset="light-blue"
				icon="cloud-download"
				@click="classify"
			>
				Detect environments
			</ui-button>
		</div>
		<environment-picker-modal 
			v-if="showEnvPicker && environments" 
			:environments="environments"
			:selected-environments="selectedEnvironments"
			@cancel="showEnvPicker = false" 
			@add-env="addEnv"
		/>
		<modal v-if="showLoader">
			<div class="flex flex-center">
				<loader />
			</div>
		</modal>
	</div>
</template>

<script lang="ts">
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

    /* Props
    ============================================*/
    @Prop({ type: Boolean })
    readonly: Boolean;

    /* Computed
    ============================================*/

    /* Data
    ============================================*/
    environments: IEnvironment[] = [];
    selectedEnvironments: IEnvironment[] = [];
    showEnvPicker: boolean = false;
    showLoader: boolean = false;

    /* Methods
    ============================================*/
    async init() {
        let query = new ResourceSearchQuery();
        query = {...query, types: ['Environment'], limit: 100 };
        this.$store.commit('resource/SET_QUERY', query);
        const { environments } = await this.$store.dispatch('resource/searchResources');
        if (!environments) return;
        this.environments = environments.result;
    }

    addEnv(envId: string) {
        this.selectedEnvironments.push(this.findEnv(envId));
        this.showEnvPicker = false;
    }

    findEnv(envId: string): IEnvironment {
        return this.environments.find(env => env.envId === envId);
    }

    async classify() {
        this.showLoader = true;
        const classifyRequest: IObjectClassificationRequest = {
            archiveId: 'Remote Objects',
            // @ts-ignore
            objectId: this.$route.query.resourceId,
            updateClassification: false,
            updateProposal: true,
        };
        const task: ITaskState = await this.$store.dispatch('software/classify', classifyRequest);
        let timer = setInterval(async () => {
            let taskState = await this.$store.dispatch('getTaskState', task.taskId) as ITaskState;
            if(taskState.isDone && taskState.taskId === task.taskId) {
                clearInterval(timer);
                const res = JSON.parse(taskState.object);
                this.selectedEnvironments = res.environmentList;
                this.showLoader = false;
            }
        }, 1000);
    }

    run(env: IEnvironment) {
        this.$router.push(`/access-interface/${env.envId}`);
    }

    remove(env: IEnvironment) {
        this.selectedEnvironments = this.selectedEnvironments.filter(i => i.envId !== env.envId);
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