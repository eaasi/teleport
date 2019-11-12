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
						<span v-else-if="resources.length === 1" class="flex-adapt">
							{{ resources[0].title }}
						</span>
						<i class="fas fa-times" @click="$emit('close')"></i>
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
	import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';
	import SlideMenu from '@/components/layout/SlideMenu.vue';
	import ResourceService from '@/services/ResourceService';
	import ResourceSlideMenuService from '@/services/ResourceSlideMenuService';
	import {ILabeledItem} from '@/types/ILabeledItem';
	import {IEaasiResource, IEnvironment} from '@/types/Resource';
	import {resourceTypes} from '@/utils/constants';
	import {IEaasiUser} from 'eaasi-admin';
	import {IAction, IEaasiTab} from 'eaasi-nav';
	import {Component, Prop} from 'vue-property-decorator';
	import {Get, Sync} from 'vuex-pathify';
	import ResourceAction from './ResourceAction.vue';
	import stringCleaner from '../../utils/string-cleaner';

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

		get onlySelectedResource() : IEaasiResource {
			if (this.resources.length === 1) return this.resources[0];
		}

		get hasDetails() {
			// If more than one resource is selected, we do not show Details tab.
			if (!this.onlySelectedResource) return false;
			if (this.onlySelectedResource.description !== null) {
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

		async setDetailsItems() : Promise<void> {

			if (!this.onlySelectedResource) return;

			let resource = this.onlySelectedResource as IEnvironment;

			if (this.onlySelectedResource.resourceType === resourceTypes.ENVIRONMENT) {
				await resourceService.getEnvironment(resource.envId).then((env) => {
					let detailsItems = [
						{
							label: 'Description',
							value: stringCleaner.stripHTML(env.description)
						},
						{
							label: 'Internet Enabled',
							value: env.enableInternet.toString()
						},
						{
							label: 'Printing Enabled',
							value: env.enablePrinting.toString()
						},
						{
							label: 'Operating System',
							value: env.os
						},
					];

					if (env.drives.length) {
						for (let i = 0; i < env.drives.length; i++) {
							detailsItems.push({
								label: `Drive (${i + 1})`,
								value: env.drives[i].type
							});
						}
					}

					this.detailsItems = detailsItems;
				});
			}
		};

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

		toggleSlide() {
			this.$emit('toggle');
		}

		async saveEnvironment() {
			this.confirmAction = null;
			await this.$store.dispatch('resource/saveEnvironment');
		}

		async deleteSelectedResource() {
			this.confirmAction = null;
			await this.$store.dispatch('resource/deleteSelectedResource');
		}

		doAction(action: IAction) {
			if (!action.isEnabled) return;
			const isEnvironment = this.onlySelectedResource.resourceType === resourceTypes.ENVIRONMENT;
			const isSoftware = this.onlySelectedResource.resourceType === resourceTypes.SOFTWARE;

			switch (action.shortName) {
				case 'run':
					// When Run is clicked, we send to Access Interface @ environmentId
					if (isEnvironment) {
						let environment = this.onlySelectedResource as IEnvironment;
						this.$router.push(`/access-interface/${environment.envId}`);
					}
					break;
				case 'viewDetails':
					// When View Details is clicked, we send to Resource Detail view
					if (isEnvironment) {
						const resourceId = this.onlySelectedResource.envId.toString();
						this.$router.push({ path:'/resources/environment', query: { resourceId } });
					} else if (isSoftware) {
						const resourceId = this.onlySelectedResource.id.toString();
						this.$router.push({ path:'/resources/software', query: { resourceId } });
					}
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