<template>
	<div id="myResources">
		<h1>{{ screenTitle }}</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<div class="vrd-content" v-if="activeResource">
			<div v-if="activeTab === 'Metadata'">
				<environment-metadata-section 
					v-if="isEnvironment"
					:resource="activeResource"
					@reset="init"
				/>
				<software-metadata-section
					v-else-if="isSoftware"
					:resource="activeResource"
					:software-metadata="softwareMetadata"
				/>
			</div>
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
import { IEnvironment, ISoftwareObject } from '@/types/Resource';
import ResourceDetailsHistory from './history/ResourceDetailsHistory.vue';
import SoftwareMetadataSection from './metadata/software/SoftwareMetadataSection.vue';
import EnvironmentMetadataSection from './metadata/environment/EnvironmentMetadataSection.vue';

@Component({
	name: 'ResourceDetailsScreen',
	components: {
		ResourceDetailsHistory,
		SoftwareMetadataSection,
		EnvironmentMetadataSection
	}
})
export default class ResourceDetailsScreen extends Vue {

    /* Data
	============================================*/
    tabs: IEaasiTab[] = [
    	{ label: 'Metadata', disabled: false },
    	{ label: 'History', disabled: false },
	];
	activeTab: string = this.tabs.find(t => t.label === 'Metadata').label;
	activeResource: IEnvironment | ISoftwareObject = null;
	softwareMetadata = null;

    /* Computed
	============================================*/

	get screenTitle() {
		return this.isEnvironment ? 'Environment Details' : 'Software Details';
	}

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
			this.softwareMetadata = await this.$store.dispatch('software/getSoftwareMetadata', resourceId);
			this.activeResource = await this.$store.dispatch('software/getSoftwareObject', resourceId);
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