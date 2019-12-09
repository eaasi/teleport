<template>
	<form-modal
		title="Add environment"
		save-text="Add"
		@close="$emit('cancel')"
		@click:cancel="$emit('cancel')"
		@save="addEnv"
		size="sm"
		class="env-picker-modal"
	>
		<div class="cd-form">
			<h3>Available environments</h3>
			<autocomplete
				anchor="title"
				@select="select"
				:data="environments"
				v-model="selectedEnvName"
				label="Search Environments"
				id="env-autocomplete"
				rules="required"
			/>
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
        return this.selectedEnvironments.some(env => env && env.envId === this.selectedEnvId);
    }

    get selectedEnv(): IEnvironment {
        if (!this.selectedEnvId) return null;
        return this.environments.find(env => env && env.envId === this.selectedEnvId);
    }

    /* Data
    ============================================*/
    selectedEnvId: string = null;
    selectedEnvName: string = null;

    /* Methods
    ============================================*/
    select(env: IEnvironment) {
        this.selectedEnvId = env.envId;
    }

    addEnv() {
        if (!this.selectedEnvId || this.alreadySelected) return;
        this.$emit('add-env', this.selectedEnvId);
    }
    
}
</script>

<style lang="scss">
.env-picker-modal {

	.eaasi-modal-content {
		overflow: visible;
	}
}
</style>