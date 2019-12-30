<template>
	<modal 
		v-if="environments.length"
		@close="$emit('close')"
		@click:cancel="$emit('close')"
	>
		<template #header>
			<h3>Connect additional environments</h3>
		</template>
		<p>
			You can connect additional environments via virtual LAN cable.
			(If you want to see more environments in this list, please enable "Server mode" or "Can be connected with other environments")
		</p>
		<select-list :value="null" @input="addEnv">
			<option :value="null" selected disabled>
				Select environments (optional)
			</option>
			<option v-for="envId in envIds" :key="envId" :value="envId">
				{{ findEnv(envId).title }}
			</option>
		</select-list>
		<div v-for="selectedEnvId in selectedEnvIds" :key="selectedEnvId">
			<div class="fas fa-times" @click="removeEnv(selectedEnvId)"></div>
			<div>Title: {{ findEnv(selectedEnvId).title }}</div>
			<div>EnvID: {{ findEnv(selectedEnvId).envId }}</div>
		</div>
		<template #footer>
			<div class="flex-row pull-right" style="padding: 1rem;">
				<ui-button @click="$emit('close')" color-preset="light-blue" style="margin-right: 1rem;">
					Cancel
				</ui-button>
				<ui-button @click="$emit('include-envs', selectedEnvIds)">
					OK
				</ui-button>
			</div>
		</template>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import { IEnvironment } from '../../types/Resource';
import { IResourceSearchQuery, IResourceSearchResponse } from '../../types/Search';
import ResourceSearchQuery from '../../models/search/ResourceSearchQuery';
import { archiveTypes } from '../../utils/constants';

@Component({
    name: 'ConnectEnvironmentsModal'
})
export default class ConnectEnvironmentsModal extends Vue {

    /* Props
    ============================================*/

    /* Computed
    ============================================*/
    @Sync('resource/query')
    searchQuery: IResourceSearchQuery;

    @Sync('resource/result')
    result: IResourceSearchResponse;

    /* Data
    ============================================*/
    environments: IEnvironment[] = [];
    envIds: string[] = [];
    selectedEnvIds: string[] = [];

    /* Methods
    ============================================*/
    async init(): Promise<void> {
        const query = new ResourceSearchQuery();
        query.archives = [archiveTypes.DEFAULT];
        this.searchQuery = query;
        const { environments } = await this.$store.dispatch('resource/searchResources');
        if (environments.result.length) {
            this.environments = environments.result;
            this.envIds = environments.result.map(env => env.envId);
        }
    }

    addEnv(envId: string) {
        this.selectedEnvIds.push(envId);
        this.envIds = this.envIds.filter(id => id !== envId);
    }

    removeEnv(envId: string) {
        this.selectedEnvIds = this.selectedEnvIds.filter(id => id !== envId);
        this.envIds.push(envId);
    }

    findEnv(envId: string): IEnvironment {
        return this.environments.find(env => env.envId === envId);
    }

    /* Lifecycle Hooks
    ============================================*/
    mounted() {
        this.init();
    }

    beforeDestroy() {
        this.$store.dispatch('resource/clearSearchQuery');
        this.result = null;
    }

}
</script>

<style lang='scss' scoped>

</style>