<template>
	<form-modal
		title="Add Software"
		save-text="Run"
		@close="$emit('cancel')"
		@click:cancel="$emit('cancel')"
		@save="runInEmulator"
		size="sm"
		class="software-picker-modal"
	>
		<div v-if="loading" class="flex flex-center flex-column">
			<h3 style="margin-bottom: 2rem;">
				Fetching software packages...
			</h3>
			<loader />
		</div>
		<div v-if="softwareList.length">
			<h3>Available software packages</h3>
			<autocomplete
				anchor="label"
				@select="select"
				:data="softwareList"
				v-model="selectedSoftwareName"
				label="Search Software"
				id="env-autocomplete"
				rules="required"
			/>
		</div>
		<alert-card v-if="errorMessage" type="error">
			{{ errorMessage }}
		</alert-card>
	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ISoftwarePackage } from '@/types/Resource';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { resourceTypes } from '@/utils/constants';

@Component({
    name: 'AddSoftwareModal'
})
export default class AddSoftwareModal extends Vue {

    /* Data
    ============================================*/
	selectedSoftwareName: string = null;
	selectedSoftwareId: string = null;
    errorMessage: string = null;
    loading: Boolean = false;
    softwareList: ISoftwarePackage[] = [];

    /* Methods
    ============================================*/
    runInEmulator() {
        if (!this.selectedSoftwareId) {
            this.errorMessage = 'Please select a software package.';
        }
        return this.$emit('run-in-emulator', this.selectedSoftwareId);
    }

    async init() {
        this.loading = true;
        const searchQuery = new ResourceSearchQuery();
        this.$store.commit('software/SET_QUERY', {...searchQuery, limit: 1000, types: [resourceTypes.SOFTWARE]});
        const { software } = await this.$store.dispatch('software/searchSoftware');
        if (!software) {
            this.errorMessage = 'Having troubles fetching a list of software packages.';
        }
        this.softwareList = software.result;
        this.loading = false;
	}
	
	select(software) {
		this.errorMessage = null;
		this.selectedSoftwareId = software.id;
	}

    /* Lifecycle Hooks
    ============================================*/
    async beforeMount() {
        await this.init();
    }

}
</script>

<style lang='scss'>
.software-picker-modal {
	.btn-wrapper {
		margin: 1.5rem;
		min-height: 35px;
	}
	.eaasi-modal-content {
		overflow: visible;
	}
}
</style>