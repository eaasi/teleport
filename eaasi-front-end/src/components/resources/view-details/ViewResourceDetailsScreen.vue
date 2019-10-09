<template>
	<div id="myResources">
		<h1>Resource Details</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<mode-toggle-bar v-if="activeTab === 'Metadata'" />
		<div class="vrd-content" v-if="activeTab === 'Metadata'">
			<tag icon="fa-box" text="Environment" />
			<resource-details-metadata :resource-detail-summary="resourceData" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import ModeToggleBar from '@/components/resources/view-details/ModeToggleBar.vue';
import ResourceDetails from '@/components/resources/ResourceDetails.vue';
import ResourceDetailsMetadata from '@/components/resources/view-details/ResourceDetailsMetadata.vue';
import ResourceDetailsSummary from '@/components/resources/view-details/ResourceDetailsSummary.vue';
import {Sync} from 'vuex-pathify';
import {IEnvironment} from '@/types/Resource';

	@Component({
		name: 'ViewResourceDetailsScreen',
		components: {
			ResourceDetailsSummary,
			ModeToggleBar,
			ResourceDetails,
			ResourceDetailsMetadata
		}
	})
export default class ViewResourceDetailsScreen extends Vue {

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

		/* Methods
        ============================================*/
		// TODO: This page shows more than environments, however, this method just gets envs only.
		async getEnvironment(envId: string) {
			let environment = await this.$store.dispatch('resource/getEnvironment', envId);
			if(!environment) return;
			this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', environment);
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
		padding: 24px;

		.vrd-subsection {
			padding: 18px 0;
		}
	}

	#thisIncludedIn {
		background-color: lighten($light-neutral, 75%);
	}
</style>