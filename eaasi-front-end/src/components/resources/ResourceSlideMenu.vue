<template>
	<div>
		<slide-menu class="resource-slide-menu" :open="true">
			<div v-if="resources">
				<div class="rsm-header">
					<div class="rsm-resource-title flex-row">
						<span v-if="resources.length > 1" class="flex-adapt">
							({{ resources.length }}) Resources Selected
						</span>
						<span v-else-if="onlySelectedResource" class="flex-adapt">
							{{ onlySelectedResource.title }}
						</span>
						<span class="fas fa-times" @click="$emit('close')"></span>
					</div>
					<tabbed-nav
						v-if="tabs.length > 1"
						:value="activeTab.label"
						:tabs="tabs"
						@input="navigateToTab"
					/>
				</div>

				<labeled-item-list
					v-if="activeTab.label === 'Details'"
					class="rsm-details"
					:labeled-items="detailsItems"
				/>

				<div v-if="activeTab.label === 'Actions'">
					<div class="rsm-local-actions">
						<resource-action
							v-for="action in localActionsForSelected"
							:action="action"
							:key="action.label"
							@click="doAction(action)"
						/>
					</div>

					<div class="rsm-node-actions">
						<resource-action
							v-for="action in nodeActionsForSelected"
							:action="action"
							:key="action.label"
							@click="doAction(action)"
						/>
					</div>
				</div>
			</div>
			<task-list
				v-if="showTasks"
				collapsible
				closable
				style="padding: 4rem 2rem;"
				@close="showTasks = false"
			/>
		</slide-menu>

		<!-- Modals -->
		<!-- Save To My Node Modal -->
		<confirm-modal
			title="Save To My Node"
			confirm-label="Save Environment"
			@click:cancel="confirmAction = null"
			@click:confirm="replicateEnvironment"
			@close="confirmAction = null"
			v-if="confirmAction === 'save'"
		>
			<alert type="info">
				<span class="ers-rep-msg">
					Saving to your node will copy all environment data and files to local storage.
					Environments copied from the EaaSI Network cannot be easily deleted once saved.
				</span>
				<span class="ers-rep-msg">
					Do you want to save this environment to your node?
				</span>
			</alert>
		</confirm-modal>

		<!-- Delete Resource Modal -->
		<confirm-modal
			title="Delete Resources"
			confirm-label="Delete"
			@click:cancel="confirmAction = null"
			@click:confirm="deleteSelectedResource"
			@close="confirmAction = null"
			v-if="confirmAction === 'delete'"
		>
			<alert type="warning" v-if="softwareIsSelected">
				<span class="ers-rep-msg">
					Deleting this software resource will remove all associated data from your node
					and it will no longer be available for use.
				</span>
			</alert>
			<alert type="warning" v-if="!softwareIsSelected && !environmentIsSelected">
				<span class="ers-rep-msg">
					Deleting this content will remove all associated data from your node
					and it will no longer be available for use.
				</span>
			</alert>
			<alert type="warning" v-if="environmentIsSelected">
				<span class="ers-rep-msg">
					Deleting this environment will hide its metadata from all users in your node
					but related disk images will be retained for use in emulation of derivative
					environments.
				</span>
				<span v-if="resources.length === 1">
					Do you want to delete this resource?
				</span>
				<span v-if="resources.length > 1">
					Do you want to delete the selected resources?
				</span>
			</alert>
		</confirm-modal>
		<add-software
			v-if="addingSoftware"
			@cancel="addingSoftware = false"
			@run-in-emulator="runInEmulator"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {Get, Sync} from 'vuex-pathify';
import ResourceService from '@/services/ResourceService';
import ResourceSlideMenuService from '@/services/ResourceSlideMenuService';
import {resourceTypes} from '@/utils/constants';
import {IEaasiUser} from 'eaasi-admin';
import {IAction, IEaasiTab} from 'eaasi-nav';
import {MultiBookmarkRequest} from '@/types/Bookmark';
import {ILabeledItem} from '@/types/ILabeledItem';
import {IEaasiResource, IEnvironment, ISoftwareObject, IContent, ISoftwarePackage} from '@/types/Resource';
import ResourceAction from './ResourceAction.vue';
import stringCleaner from '@/utils/string-cleaner';
import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';
import SlideMenu from '@/components/layout/SlideMenu.vue';
import TaskList from '@/components/admin/running-tasks/TaskList.vue';
import { ITaskState } from '../../types/Task';
import { IEaasiTaskListStatus } from '../../types/IEaasiTaskListStatus';
import EaasiTask from '../../models/task/EaasiTask';
import AddSoftware from '@/components/resources/view-details/environment/AddSoftwareModal.vue';
import { ROUTES } from '../../router/routes.const';
import { jsonEquals } from '@/utils/functions';

let menuService = new ResourceSlideMenuService();
let resourceService = ResourceService;

@Component({
	name: 'ResourceSlideMenu',
	components: {
		LabeledItemList,
		ResourceAction,
		TaskList,
		AddSoftware,
		SlideMenu
	}
})
export default class ResourceSlideMenu extends Vue {

	/* Props
	============================================*/

	@Prop({ type: Object as () => IEaasiTab, required: true })
	readonly activeTab: IEaasiTab;

	@Prop({ type: Array as () => IEaasiTab[], required: true })
	readonly tabs: IEaasiTab[];

	/* Computed
	============================================*/

	@Sync('resource/activeEnvironment')
	readonly environment: IEnvironment;

	@Get('task/orderedTasks')
	orderedTasks: ITaskState[];

	@Sync('resource/selectedResources')
	resources: IEaasiResource[];

	@Get('loggedInUser')
	user: IEaasiUser;

	@Get('resource/environmentIsSelected')
	environmentIsSelected: boolean;

	@Get('resource/softwareIsSelected')
	softwareIsSelected: boolean;

	@Get('resource/onlySelectedResource')
	onlySelectedResource: IEaasiResource;

	/**
	 * Populates the list of Local Actions in the Sidebar
	 */
	get localActionsForSelected() {
		return menuService.getLocalActions(
			this.resources as IEnvironment[],
			this.user.roleId
		);
	}

	/**
	 * Populates the list of Node Actions in the Sidebar
	 */
	get nodeActionsForSelected() {
		return menuService.getNodeActions(
			this.resources as IEnvironment[],
			this.user.roleId
		);
	}

	get selectedContent(): IEaasiResource[] {
		return this.resources.filter(x => x.resourceType === resourceTypes.CONTENT);
	}

	get selectedEnvironments(): IEnvironment[] {
		const arr = this.resources.filter(x => x.resourceType === resourceTypes.ENVIRONMENT);
		return arr as IEnvironment[];
	}

	get selectedSoftware(): IEaasiResource[] {
		return this.resources.filter(x => x.resourceType === resourceTypes.SOFTWARE);
	}

	/* Data
	============================================*/
	detailsItems: ILabeledItem[] = [];
	confirmAction : string = null;
	showTasks: boolean = true;
	addingSoftware: boolean = false;

	/* Methods
	============================================*/

	navigateToTab(label: string) {
		const tab = this.tabs.find(tab => tab.label === label);
		this.$emit('navigate-to-tab', tab);
	}

	async setDetailsItems() : Promise<void> {
		this.detailsItems = [];
		if (!this.onlySelectedResource) return;
		const { resourceType } = this.onlySelectedResource;

		if (resourceType === resourceTypes.ENVIRONMENT) {
			await this.setEnvironmentDetailsItems();
		} else if (resourceType === resourceTypes.SOFTWARE) {
			await this.setSoftwareDetailsItems();
		}
	};

	async setSoftwareDetailsItems() {
		const { archiveId } = this.onlySelectedResource;
		const objectId = this.onlySelectedResource.id;
		const softwareMetadata = await this.$store.dispatch('software/getSoftwareMetadata', { archiveId, objectId });
		if (!softwareMetadata.metadata) return;

		let detailsItems = [
			{
				label: 'Description',
				value: softwareMetadata.metadata.description
			}
		];

		if (softwareMetadata.mediaItems?.file?.length) {
			detailsItems.concat(softwareMetadata.mediaItems.file.map(f => {
				return {
					label: `${f.dataResourceType} (${f.type})`,
					value: f.localAlias ? f.localAlias : f.id
				};
			}));
		}

		this.detailsItems = detailsItems;
	}

	async setEnvironmentDetailsItems() {
		const env = await resourceService.getEnvironment(this.onlySelectedResource.envId);

		let detailsItems = [
			{
				label: 'Description',
				value: stringCleaner.stripHTML(env.title)
			},
			{
				label: 'Internet Enabled',
				value: env.enableInternet?.toString() ?? 'false'
			},
			{
				label: 'Printing Enabled',
				value: env.enablePrinting?.toString() ?? 'false'
			},
			{
				label: 'Operating System',
				value: env.os
			},
		];

		detailsItems.concat((env.drives ?? []).map((drive, i) => {
			return {
				label: `Drive (${i + 1})`,
				value: env.drives[i].type
			};
		}));

		this.detailsItems = detailsItems;
	}

	toggleSlide() {
		this.$emit('toggle');
	}

	async replicateEnvironment() {
		this.confirmAction = null;
		const env: IEaasiResource = this.resources[0];
		if (!env) return;
		const result: IEaasiTaskListStatus = await this.$store.dispatch('resource/replicateEnvironment', env);
		let task = new EaasiTask(result.taskList[0], `Save To My Node: ${env.title}`);
		await this.$store.dispatch('task/addTaskToQueue', task);
	}

	async deleteSelectedResource() {
		this.confirmAction = null;
		if (this.environmentIsSelected) {
			await this.$store.dispatch('resource/deleteSelectedResource');
		} else {
			const contentRequests = this.resources.map(r => {
				return { archiveName: r.archiveId, contentId: r.id as string };
			});
			await this.$store.dispatch('software/deleteContent', contentRequests);
		}
		this.resources = [];
		this.$emit('resource-deleted');
	}

	publishSelectedResources() {
		return Promise.all([
			this.publishSoftware(),
			this.publishEnvironments()
		]);
	}

	async publishEnvironments() {
		if(!this.selectedEnvironments.length) return;
		let envIds = this.selectedEnvironments.map(x => x.envId);
		let res = await this.$store.dispatch('resource/publishEnvironmentsToNetwork' , envIds);
		if(!res?.taskList?.length) return;
		return this.$store.dispatch('task/addTaskToQueue', new EaasiTask(
			res.taskList[0],
			`Publishing ${envIds.length} environment(s) to network.`
		));
	}

	publishSoftware() {
		if(!this.selectedSoftware.length) return;
		let ids = this.selectedSoftware.map(x => x.id);
		return this.$store.dispatch('software/publishSoftware' , ids);
	}

	// TODO: Refactor doAction and multiple / single selected resource logic

	async doAction(action: IAction) {
		if (!action.isEnabled) return;

		switch (action.shortName) {
			case 'run':
				this.runInEmulator();
				break;
			case 'viewDetails':
				this.viewDetails();
				break;
			case 'add-software':
				this.addingSoftware = true;
				break;
			case 'treat-as-software':
				this.$emit('treat-as-software');
				break;
			case 'bookmark':
				this.bookmark();
				break;
			case 'addToEmuProject':
				this.addToEmulationProject();
				break;
			case 'save':
				this.confirmAction = 'save';
				break;
			case 'delete':
				this.confirmAction = 'delete';
				break;
			case 'publish':
				await this.publishSelectedResources();
				this.$emit('resource-published');
			default: break;
		}
	}

	addToEmulationProject() {
		this.$store.dispatch('emulationProject/addResources', this.resources);
	}

	bookmark() {
		let resourceIds = this.resources.map(resource =>
			resource.resourceType === resourceTypes.ENVIRONMENT
				? resource.envId
				: resource.id
		);

		let bookmarksRequest: MultiBookmarkRequest = {
			userId: this.user.id,
			resourceIDs: resourceIds as string[]
		};

		this.$store.dispatch('bookmark/bookmarkMany', bookmarksRequest).then(() => {
			this.$emit('bookmarks-updated');
		});
	}

	runInEmulator(software = null) {
		let environment = this.onlySelectedResource as IEnvironment;
		let route = `${ROUTES.ACCESS_INTERFACE}/${environment.envId}`;
		if (software && software.id) {
			route += `?softwareId=${software.id}`;
			if (software.archiveId) {
				route += `&archiveId=${software.archiveId}`;
			}
		}
		this.$router.push(route);
	}

	viewDetails() {
		// When View Details is clicked, we send to Resource Detail view
		if (this.environmentIsSelected) {
			const resourceId = this.onlySelectedResource.envId.toString();
			this.$router.push({
				path: ROUTES.RESOURCES.ENVIRONMENT,
				query: { resourceId }
			});
			return;
		}
		// @ts-ignore
		const archiveId = this.onlySelectedResource.archiveId;
		const resourceId = this.onlySelectedResource.id.toString();
		const path = this.softwareIsSelected ? ROUTES.RESOURCES.SOFTWARE : ROUTES.RESOURCES.CONTENT;
		this.$router.push({
			path,
			query: { resourceId, archiveId }
		});
	}

	/* Watchers
	============================================*/

	@Watch('onlySelectedResource')
	onlySelectedResourceChanged(newVal, oldVal) {
		if(jsonEquals(newVal, oldVal)) return;
		this.setDetailsItems();
	}
}

</script>

<style lang="scss">
	.resource-slide-menu {
		background-color: lighten($light-neutral, 80%);
		bottom: 0;
		position: fixed;
		right: 0;
		top: 80px;

		.fa-times {
			cursor: pointer;
		}

		.task-list-container {

			.task-list-content {
				max-height: 30rem;
			}
		}
	}

	.rsm-header {
		background-color: #FFFFFF;
		border-bottom: solid 4px lighten($dark-neutral, 70%);
	}

	.rsm-details {
		padding: 2.4rem;
	}

	.rsm-resource-title {
		border-top: solid 6px $dark-blue;
		font-size: 1.7rem;
		padding: 2rem;
	}

	.rsm-local-actions {
		border-bottom: solid 4px lighten($light-neutral, 10%);
		margin-bottom: 3rem;
	}
</style>