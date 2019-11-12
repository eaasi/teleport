<template>
	<div id="myResources">
		<h1 v-if="isEnvironment">Environment Details</h1>
		<h1 v-else-if="isSoftware">Software Details</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<div class="vrd-content" v-if="activeResource">
			<resource-details-metadata
				v-if="activeTab === 'Metadata'" 
				:resource="activeResource"
			/>
			<resource-details-history
				v-else-if="activeTab === 'History'" 
				:revisions="activeResource.revisions" 
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import { IEnvironment, ISoftwarePackage } from '@/types/Resource';
import ResourceDetailsHistory from '@/components/resources/view-details/history/ResourceDetailsHistory.vue';
import ResourceDetailsMetadata from '@/components/resources/view-details/metadata/ResourceDetailsMetadata.vue';

@Component({
	name: 'ResourceDetailsScreen',
	components: {
		ResourceDetailsMetadata,
		ResourceDetailsHistory
	}
})
export default class ResourceDetailsScreen extends Vue {

    /* Data
	============================================*/
	activeResource: IEnvironment | ISoftwarePackage = null;
    tabs: IEaasiTab[] = [
    	{ label: 'Metadata', disabled: false },
    	{ label: 'History', disabled: false },
	];
	activeTab: string = this.tabs[0].label;

    /* Computed
	============================================*/

	get isEnvironment() {
		return this.$route.path.indexOf('environment') > 0;
	}
	
	get isSoftware() {
		return this.$route.path.indexOf('software') > 0;
	}

    /* Methods
	============================================*/
	
	async init() {
		const { resourceId } = this.$route.query;
		if (this.isEnvironment) {
			this.activeResource = await this.$store.dispatch('resource/getEnvironment', resourceId);
		} else if (this.isSoftware) {
			this.activeResource = await this.$store.dispatch('software/getSoftware', resourceId);
			this.tabs[1].disabled = true;
		}
	}

    /* Lifecycle Hooks
	============================================*/
	
    created() {
		this.init();
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