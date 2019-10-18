<template>
	<div id="myResources">
		<h1>Environment Details</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<div class="vrd-content">
			<environment-details-metadata 
				v-if="activeTab === 'Metadata'" 
				:resource-detail-summary="resourceData" 
			/>
			<environment-details-history 
				v-else-if="activeTab === 'History'" 
				:revisions="environmentRevisions" 
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import { IEaasiTab } from 'eaasi-nav';
import { IEnvironment, IEnvironmentRevision } from '@/types/Resource';
import EnvironmentDetailsHistory from '@/components/resources/view-details/history/EnvironmentDetailsHistory.vue';
import EnvironmentDetailsMetadata from '@/components/resources/view-details/metadata/EnvironmentDetailsMetadata.vue';


@Component({
	name: 'ViewEnvironmentDetailsScreen',
	components: {
		EnvironmentDetailsMetadata,
		EnvironmentDetailsHistory
	}
})
export default class ViewEnvironmentDetailsScreen extends Vue {
    /* Props
    ============================================*/
    @Prop({ type: String, required: true })
    resource: string;

    /* Data
    ============================================*/
    resourceData = JSON.parse(this.resource);

    activeTab: string = 'Metadata';

    tabs: IEaasiTab[] = [
    	{ label: 'Metadata' },
    	{ label: 'History' },
    ]

    /* Computed
    ============================================*/
    @Sync('resource/activeEnvironment')
    environment: IEnvironment

    get environmentRevisions() : IEnvironmentRevision[] {
    	return this.environment.revisions;
    }

    /* Methods
    ============================================*/
    // Sends the current envId to store to set the current environment details
    async getEnvironment(envId: string) {
    	let activeEnvironment = await this.$store.dispatch('resource/getEnvironment', envId);
    	if (!activeEnvironment) return;
    	this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', activeEnvironment);
    }

    // TODO: Should update to search all software for a given environmentId
    async getSoftware() {
    	let softwareId = this.environment.installedSoftwareIds[0]; // TODO <---
    	let software = await this.$store.dispatch('software/getSoftware', softwareId);
    	if(!software) return;
    	this.$store.commit('software/SET_ACTIVE_SOFTWARE', software);
    }

    /* Lifecycle Hooks
    ============================================*/
    created() {
    	this.getEnvironment(this.resourceData.envId);
    }
}

</script>

<style lang="scss">
	.vrd-content {

		.vrd-subsection {
			padding: 18px 0;
		}
	}

	#thisIncludedIn {
		background-color: lighten($light-neutral, 75%);
	}
</style>