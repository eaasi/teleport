<template>
	<form-modal
		class="environment-picker-modal"
		title="Add environment"
		save-text="Add"
		@close="$emit('cancel')"
		@save="addEnv"
		size="sm"
	>
		<div class="cd-form">
			<select-list v-model="selectedEnvId">
				<option v-for="env in environments" :key="env.envId" :value="env.envId">
					{{ env.title }}
				</option>
			</select-list>
			<div v-if="alreadySelected && selectedEnv">
				{{ selectedEnv.title }} already selected. Please pick a new Environment.
			</div>
		</div>
	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEnvironment } from '@/types/Resource';

@Component({
    name: 'EnvironmentPickerModal'
})
export default class EnvironmentPickerModal extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Array as () => IEnvironment[] })
    selectedEnvironments: IEnvironment[];

    @Prop({ type: Array as () => IEnvironment[] })
    environments: IEnvironment[];

    /* Computed
    ============================================*/
    get alreadySelected(): Boolean {
        return this.selectedEnvironments.some(env => env.envId === this.selectedEnvId);
    }

    get selectedEnv(): IEnvironment {
        if (!this.selectedEnvId) return null;
        return this.environments.find(env => env.envId === this.selectedEnvId);
    }

    /* Data
    ============================================*/
    selectedEnvId: string = null;

    /* Methods
    ============================================*/
    addEnv() {
        if (!this.selectedEnvId || this.alreadySelected) return;
        this.$emit('add-env', this.selectedEnvId);
    }
    
}
</script>

<style lang='scss' scoped>

</style>