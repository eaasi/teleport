<template>
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
					v-model="tab"
					:tabs="tabs"
				/>
			</div>

			<labeled-item-list
				v-if="tab === 'Details'"
				class="rsm-details"
				:labeled-items="detailsItems"
			/>

			<div v-if="tab === 'Actions'">
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
		readonly open: boolean

		@Prop({type: Array as () => IEaasiResource[]})
		readonly resources: IEaasiResource[]

		/* Computed
        ============================================*/

		@Sync('resource/activeEnvironment')
		readonly environment: IEnvironment

		@Sync('resource/selectedResources')
		selectedResources: IEaasiResource[]

		@Get('loggedInUser')
		user: IEaasiUser


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
				this.tab = 'Actions';
				return true;
			};
			return false;
		}

		/**
		 * Populates the list of Local Actions in the Sidebar
		 */
		get localActionsForSelected() {
			return menuService.getLocalActions(
				this.selectedResources as IEnvironment[],
				this.user.roleId
			);
		}

		/**
		 * Populates the list of Node Actions in the Sidebar
		 */
		get nodeActionsForSelected() {
			return menuService.getNodeActions(
				this.selectedResources as IEnvironment[],
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

		tab: string = 'Actions'

		/* Methods
        ============================================*/

		toggleSlide() {
			this.$emit('toggle');
		}

		doAction(action: IAction) {
			if (!action.isEnabled) return;
			console.log(action);

			switch (action.shortName) {
				case 'run': {
					// When Run is clicked, we send to Access Interface @ environmentId
					if (this.onlySelectedResource.resourceType === resourceTypes.ENVIRONMENT) {
						let environment = this.onlySelectedResource as IEnvironment;
						this.$router.push(`/access-interface/${environment.envId}`);
					}
					break;
				}
				case 'viewDetails': {
					// When View Details is clicked, we send to Resource Detail view
					// with the (only) selected resource
					this.$router.push({
						name: 'Resource Detail',
						params: {resource: JSON.stringify(this.onlySelectedResource)}});
				}
					break;
				case 'save': {
					// When Save is clicked, we show the Save (Replicate) Modal to confirm
					this.$emit('show-save-modal');
				}
					break;
				case 'delete': {
					// When Delete is clicked, we show the Delete Modal to confirm
					this.$emit('show-delete-modal');
				}
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