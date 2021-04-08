<template>
	<form-modal
		v-if="!loading"
		title="Add Software"
		@click:cancel="$emit('cancel')"
		@close="$emit('cancel')"
		size="sm"
		class="software-picker-modal"
	>
		<div v-if="softwareList.length">
			<h3>Available software packages</h3>
			<search-select-list
				v-model="selectedSoftwareId"
				label="Search Software"
				option-label="label"
				anchor="id"
				placeholder="Please select a software package"
				:data="softwareList"
			/>
		</div>

		<alert card v-if="errorMessage" type="error">
			{{ errorMessage }}
		</alert>

		<template #buttonsRight>
			<div class="justify-end buttons-right">
				<ui-button
					@click="$emit('cancel')"
					color-preset="light-blue"
				>
					Cancel
				</ui-button>
				<ui-button
					@click="runInEmulator"
					:disabled="selectedSoftwareId == null"
				>
					Run
				</ui-button>
			</div>
		</template>
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
	selectedSoftwareId = null;
    errorMessage: string = null;
    loading: Boolean = false;
    softwareList: ISoftwarePackage[] = [];

    /* Methods
    ============================================*/
    runInEmulator() {
		const software = this.softwareList.find(s => s.id === this.selectedSoftwareId);
        return this.$emit('run-in-emulator', software);
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