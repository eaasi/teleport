<template>
	<div>
		<slide-menu
			class="resource-slide-menu"
			:open="open"
			@toggle="toggleSlide"
		>
			<div v-if="resources">
				<div class="rsm-header">
					<div class="rsm-resource-title flex-row">
						<span v-if="areMultipleActiveResourcesSelected" class="flex-adapt">
							({{ resources.length }}) Resources Selected
						</span>
						<span v-else-if="onlySelectedResource" class="flex-adapt">
							{{ onlySelectedResource.title }}
						</span>
						<span class="fas fa-times" @click="$emit('toggle')"></span>
					</div>
					<tabbed-nav
						v-if="hasDetails"
						v-model="activeTab"
						:tabs="tabs"
					/>
				</div>

				<labeled-item-list
					v-if="activeTab === 'Details'"
					class="rsm-details"
					:labeled-items="detailsItems"
				/>

				<div v-if="activeTab === 'Actions'">
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
		</slide-menu>

		<!-- Modals -->
		<!-- Save To My Node Modal -->
		<confirm-modal
			title="Save To My Node"
			confirm-label="Save Environment"
			@click:cancel="confirmAction = null"
			@click:confirm="saveEnvironment"
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
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import {Component, Prop} from 'vue-property-decorator';
	import {Get, Sync} from 'vuex-pathify';
	import ResourceService from '@/services/ResourceService';
	import ResourceSlideMenuService from '@/services/ResourceSlideMenuService';
	import {resourceTypes} from '@/utils/constants';
	import {IEaasiUser} from 'eaasi-admin';
	import {IAction, IEaasiTab} from 'eaasi-nav';
	import {MultiBookmarkRequest} from '@/types/Bookmark';
	import {ILabeledItem} from '@/types/ILabeledItem';
	import { IContentRequest } from '@/types/Resource';
	import {IEaasiResource, IEnvironment, ISoftwarePackage, ISoftwareObject} from '@/types/Resource';
	import ResourceAction from './ResourceAction.vue';
	import stringCleaner from '@/utils/string-cleaner';
	import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';
	import SlideMenu from '@/components/layout/SlideMenu.vue';

	let menuService = new ResourceSlideMenuService();
	let resourceService = ResourceService;

	@Component({
		name: 'ResourceSlideMenu',
		components: {
			LabeledItemList,
			ResourceAction,
			SlideMenu
		}
	})
	export default class ResourceSlideMenu extends Vue {

		/* Props
        ============================================*/

		@Prop({type: Boolean, required: true})
		readonly open: boolean;

		/* Computed
        ============================================*/

		@Sync('resource/activeEnvironment')
		readonly environment: IEnvironment;

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

		get hasDetails() {
			// Reset this.detailsItems when hasDetails is checked
			this.detailsItems = [];
			if (this.onlySelectedResource && this.onlySelectedResource.title) {
				this.setDetailsItems();
				return true;
			}
			return false;
		}

		get areMultipleActiveResourcesSelected() : boolean {
			if (this.resources.length > 1) {
				// If we are showing the Details tab when multiple are selected,
				// We should change to the Actions tab.
				this.activeTab ='Actions';
				return true;
			};
			return false;
		}

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

		/* Data
        ============================================*/
		detailsItems: ILabeledItem[] = [];
		tabs: IEaasiTab[] = [
			{
				label: 'Details'
			},
			{
				label: 'Actions'
			}
		]
		activeTab: string = this.tabs[1].label;
		confirmAction : string = null;

		/* Methods
		============================================*/

		async setDetailsItems() : Promise<void> {
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

			if (softwareMetadata.mediaItems.file && softwareMetadata.mediaItems.file.length > 0) {
				softwareMetadata.mediaItems.file.forEach(f => {
					detailsItems.push({
						label: `${f.dataResourceType} (${f.type})`,
						value: f.localAlias ? f.localAlias : f.id
					});
				});
			}

			this.detailsItems = detailsItems;
		}

		async setEnvironmentDetailsItems() {
			const env = await resourceService.getEnvironment(this.onlySelectedResource.envId);
			let enableInternet = env.enableInternet ? env.enableInternet.toString() : 'false';
			let enablePrinting = env.enablePrinting ? env.enablePrinting.toString() : 'false';

			let detailsItems = [
				{
					label: 'Description',
					value: stringCleaner.stripHTML(env.title)
				},
				{
					label: 'Internet Enabled',
					value: enableInternet
				},
				{
					label: 'Printing Enabled',
					value: enablePrinting
				},
				{
					label: 'Operating System',
					value: env.os
				},
			];

			if (env.drives && env.drives.length) {
				for (let i = 0; i < env.drives.length; i++) {
					detailsItems.push({
						label: `Drive (${i + 1})`,
						value: env.drives[i].type
					});
				}
			}

			this.detailsItems = detailsItems;
		}

		toggleSlide() {
			this.$emit('toggle');
		}

		async saveEnvironment() {
			this.confirmAction = null;
			await this.$store.dispatch('resource/saveEnvironment');
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
			this.$emit('resource-updated');
		}

		// TODO: Refactor doAction and multiple / single selected resource logic

		doAction(action: IAction) {
			if (!action.isEnabled) return;

			switch (action.shortName) {
				case 'run':
					// When Run is clicked, we send to Access Interface @ environmentId
					if (this.environmentIsSelected) {
						let environment = this.onlySelectedResource as IEnvironment;
						this.$router.push(`/access-interface/${environment.envId}`);
					}
					break;
				case 'viewDetails':
					// When View Details is clicked, we send to Resource Detail view
					if (this.environmentIsSelected) {
						const resourceId = this.onlySelectedResource.envId.toString();
						this.$router.push({
							path:'/resources/environment',
							query: { resourceId }
						});
						break;
					}
					// @ts-ignore
					const archiveId = this.onlySelectedResource.archiveId;
					const resourceId = this.onlySelectedResource.id.toString();
					const path = this.softwareIsSelected ? '/resources/software' : '/resources/content';
					this.$router.push({
						path,
						query: { resourceId, archiveId }
					});
					break;
				case 'bookmark':
					// When Bookmark This Resource clicked, we dispatch an event to bookmark all selected resources
					let resourceIds = this.resources.map(resource =>
						resource.resourceType === resourceTypes.ENVIRONMENT
							? resource.envId
							: resource.id
					);

					let bookmarksRequest: MultiBookmarkRequest = {
						userID: this.user.id,
						resourceIDs: resourceIds as string[]
					};

					this.$store.dispatch('bookmark/bookmarkMany', bookmarksRequest).then(() => {
						this.$emit('bookmarks-updated');
					});
					break;
				case 'save':
					this.confirmAction = 'save';
					break;
				case 'delete':
					this.confirmAction = 'delete';
					break;
				default: break;
			}
		}
	}

</script>

<style lang="scss">
	.resource-slide-menu {
		background-color: lighten($light-neutral, 60%);
		position: fixed;

		.fa-times {
			cursor: pointer;
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