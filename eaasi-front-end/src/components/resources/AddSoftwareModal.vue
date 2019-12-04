<template>
	<modal @close="$emit('cancel')">
		<template #header>
			<div>
				Add Software
			</div>
		</template>
		<div v-if="loading" class="flex flex-center flex-column">
			<h3 style="margin-bottom: 2rem;">
				Fetching software packages...
			</h3>
			<loader />
		</div>
		<div v-if="softwareList.length">
			<h3>Available software packages</h3>
			<select-list 
				v-model="selectedSoftwareId"
				@change="errorMessage = null"
			>
				<option :value="null" disabled>
					Please select a software package
				</option>
				<option
					v-for="software in softwareList"
					:key="software.id"
					:value="software.id"
				>
					{{ software.label }}
				</option>
			</select-list>
		</div>
		<alert-card v-if="errorMessage" type="error">
			{{ errorMessage }}
		</alert-card>
		<template #footer>
			<div class="btn-wrapper">
				<div class="pull-right">
					<ui-button
						@click="$emit('cancel')"
						color-preset="light-blue"
						size="sm"
						style="margin-right: 1rem;"
					>
						Cancel
					</ui-button>
					<ui-button v-if="!loading" @click="runInEmulator" size="sm">
						Run
					</ui-button>
				</div>
			</div>
		</template>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { ISoftwarePackage } from '@/types/Resource';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { resourceTypes } from '@/utils/constants';

@Component({
    name: 'AddSoftwareModal'
})
export default class AddSoftwareModal extends Vue {

    /* Props
    ============================================*/

    /* Computed
    ============================================*/

    /* Data
    ============================================*/
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

    /* Lifecycle Hooks
    ============================================*/
    async beforeMount() {
        await this.init();
    }

}
</script>

<style lang='scss' scoped>
.btn-wrapper {
	margin: 1.5rem;
	min-height: 35px;
}
</style>