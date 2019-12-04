<template>
	<div id="myResources">
		<ui-button 
			v-if="readOnlyMode" 
			size="md" 
			@click="confirmAction = 'replicate'" 
			style="float: right; margin: 1.2rem;"
		>
			Replicate
		</ui-button>
		<h1>{{ screenTitle }}</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<div class="vrd-content" v-if="activeResource">
			<div v-if="activeTab === 'Metadata'">
				<environment-metadata-section 
					v-if="isEnvironment"
					:resource="activeResource"
					:read-only-mode="readOnlyMode"
					@reset="init"
					@refresh="refresh"
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
		<confirm-modal
			title="Replicate To My Node"
			confirm-label="Replicate"
			@click:cancel="confirmAction = null"
			@click:confirm="replicate"
			@close="confirmAction = null"
			v-if="confirmAction === 'replicate'"
		>
			<alert type="info">
				<span class="ers-rep-msg">
					Replicating to your node will copy all environment data and files to local storage.
					Environments copied from the EaaSI Network cannot be easily deleted once saved.
				</span>
				<span class="ers-rep-msg">
					Do you want to replicate this environment to your node?
				</span>
			</alert>
		</confirm-modal>
		<modal v-if="loading || errorMessage || success" @close="reset">
			<alert-card v-if="errorMessage" type="error">
				<strong>Error: </strong>
				{{ errorMessage }}
			</alert-card>
			<div v-else-if="success">
				<alert-card type="success">
					This task was succesfully completed
				</alert-card>
				<div style="margin: 2rem auto;">
					<ui-button size="md" @click="$router.push('/resources/explore')">
						Explore Resources
					</ui-button>
				</div>
			</div>
			<div v-else-if="!errorMessage && !success" class="flex flex-center flex-column">
				<h3 style="margin: 0 0 3rem 0; text-align: center;">
					Depending on the file size and server/network performance, image import may take several minutes.
				</h3>
				<loader />
			</div>
		</modal>
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
import { ITaskState } from '@/types/Task';
import EaasiTask from '@/models/task/EaasiTask';
import { IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';

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
	confirmAction: string = null;
	loading: boolean = false;
	errorMessage: string = null;
	success: boolean = false;
	timer: any = null;

    /* Computed
	============================================*/
	get readOnlyMode() {
		// @ts-ignore
		return this.isEnvironment && this.activeResource && this.activeResource.archive === 'remote';
	}

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
	async replicate() {
		this.confirmAction = null;
		this.loading = true;
		const result: IEaasiTaskListStatus = await this.$store.dispatch('resource/replicateImage', this.activeResource);
		let task = new EaasiTask(result.taskList[0], `Replicate Image: ${this.activeResource.title}`);
        this.timer = setInterval(async () => await this.handleTask(task.taskId), task.pollingInterval);
	}

	async handleTask(taskId: string | number) {
		clearInterval(this.timer);
		this.success = true;
		return;
		let taskState = await this.$store.dispatch('getTaskState', taskId);
		if (taskState.message && taskState.status == '1') {
			clearInterval(this.timer);
			this.errorMessage = taskState.message;
		} else if(taskState.isDone) {
			clearInterval(this.timer);
			this.success = true;
		}
	}

	refresh(id) {
		this.$router.replace(`/resources/environment?resourceId=${id}`);
		this.init(id);
	}

	reset() {
		clearInterval(this.timer);
		this.success = false;
		this.errorMessage = null;
		this.loading = false;
	}
	
	async init(id) {
		if (this.isEnvironment) {
			this.activeResource = await this.$store.dispatch('resource/getEnvironment', id);
		} else if (this.isSoftware) {
			this.softwareMetadata = await this.$store.dispatch('software/getSoftwareMetadata', id);
			this.activeResource = await this.$store.dispatch('software/getSoftwareObject', id);
			this.tabs[1].disabled = true;
		}
	}

    /* Lifecycle Hooks
	============================================*/
    created() {
		const { resourceId } = this.$route.query;
		this.init(resourceId);
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