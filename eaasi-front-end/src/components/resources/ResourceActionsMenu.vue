<template>
	<slide-menu class="resource-actions-slide-menu" :open="open">
		<div class="ra-resource-title">
			{{ resource.title }}
		</div>
		<resource-action
			v-for="a in actions"
			:action="a"
			:key="a.label"
		/>
		<div class="ra-local-actions">
			<resource-action
				v-for="a in localActions"
				:action="a"
				:key="a.label"
			/>
		</div>

		<div class="ra-node-actions">
			<resource-action
				v-for="a in nodeActions"
				:action="a"
				:key="a.label"
			/>
		</div>
	</slide-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IAction } from 'eaasi-nav';
import { IEaasiResource } from 'eaasi-resource';
import ResourceAction from './ResourceAction.vue';
import SlideMenu from '@/components/layout/SlideMenu.vue';

@Component({
	name: 'ResourceActionsMenu',
	components: {
		ResourceAction,
		SlideMenu
	}
})
export default class ResourceActionsMenu extends Vue {

	/* Props
	============================================*/

	@Prop({type: Boolean, required: true})
	readonly open: boolean

	@Prop({type: Object as () => IEaasiResource, required: true})
	readonly resource: IEaasiResource

	/* Data
	============================================*/

	// TODO: These should become dynamic based on resource type and user role
	localActions: IAction[] = [
		{
			label: 'View Details',
			description: 'Review full resource details',
			icon: 'file-alt',
		},
		{
			label: 'Bookmark This Resource',
			description: 'Add resource to my bookmarks in my resources',
			icon: 'bookmark',
		},
		{
			label: 'Run in Emulator',
			description: 'Emulate this resource without changes',
			icon: 'power-off',
		},
		{
			label: 'Add to Emulation Project',
			description: 'Emulate this resource without changes',
			icon: 'paperclip'
		}
	]

	// TODO: These should become dynamic based on resource type and user role
	nodeActions: IAction[] = [
		{
			label: 'Save To My Node',
			description: 'Make this resource available to all users of my node',
			icon: 'cloud'
		},
		{
			label: 'Publish To Network',
			description: 'Make this resource available to all users of my node.',
			icon: 'cloud-upload'
		},
		{
			label: 'Sync Metadata',
			description: 'Update resource with metadata from WikiData',
			icon: 'sync'
		},
		{
			label: 'Delete',
			description: 'Delete this resource',
			icon: 'trash-alt'
		}
	]

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss">
.resource-actions-slide-menu {
	background-color: lighten($light-neutral, 60%);
}

.ra-resource-title {
	background-color: #FFF;
	border-bottom: solid 4px lighten($dark-neutral, 70%);
	border-top: solid 6px $dark-blue;
	font-size: 1.7rem;
	padding: 2rem;
}

.ra-local-actions {
	border-bottom: solid 4px lighten($light-neutral, 10%);
	margin-bottom: 3rem;
}
</style>