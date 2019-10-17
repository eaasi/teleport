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
				:labeled-items="labeledItems"
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
import { Component, Prop } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import { IAction, IEaasiTab } from 'eaasi-nav';
import { IEaasiResource, IEnvironment } from '@/types/Resource';
import { ILabeledItem } from '@/types/ILabeledItem';
import ResourceAction from './ResourceAction.vue';
import SlideMenu from '@/components/layout/SlideMenu.vue';
import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';
import ResourceSlideMenuService from '@/services/ResourceSlideMenuService';

let menuService = new ResourceSlideMenuService();

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

    @Get('resource/activeEnvironment')
    readonly environment: IEnvironment

    @Sync('resource/activeResources')
    activeResources: IEaasiResource[]

    get onlySelectedResource() : IEaasiResource {
    	if (this.resources.length === 1) {
    		return this.resources[0];
    	}
    }

    /**
     * Computes whether or not to show the details tab
     */
    // TODO: Logic for showing details tab
    get hasDetails() {
    	return true;
    }

    get areMultipleActiveResourcesSelected() : boolean {
    	return this.resources.length > 1;
    }

    /**
     * Populates the list of Local Actions in the Sidebar
     */
    get localActionsForSelected() {
    	return menuService.getLocalActions(this.activeResources);
    }

    /**
     * Populates the list of Node Actions in the Sidebar
     */
    get nodeActionsForSelected() {
    	return menuService.getNodeActions(this.activeResources);
    }

    /* Data
    ============================================*/

    // TODO: Labeled Items should be derived from the resource
    labeledItems: ILabeledItem[] = [];


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
    	switch (action.shortName) {
    	case 'run': {
    		// When Run is clicked, we send to Access Interface @ environmentId
    		if (this.environment) {
    			this.$router.push(`/access-interface/${this.environment.envId}`);
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