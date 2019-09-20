<template>
	<slide-menu class="resource-slide-menu" :open="open">
		<div v-if="resource">
			<div class="rsm-header">
				<div class="rsm-resource-title flex-row">
					<span class="flex-adapt">{{ resource.title }}</span>
					<i class="fas fa-times" @click="$emit('close')"></i>
				</div>
				<tabbed-nav
					v-if="hasDetails"
					v-model="tab"
					:tabs="tabs"
				/>
			</div>
			<resource-details
				v-if="tab === 'Details'"
				class="rsm-details"
				:resource="resource"
			/>
			<div v-if="tab === 'Actions'">
				<div class="rsm-local-actions">
					<resource-action
						v-for="a in localActions"
						:action="a"
						:key="a.label"
						@click="doAction(a)"
					/>
				</div>

				<div class="rsm-node-actions">
					<resource-action
						v-for="a in nodeActions"
						:action="a"
						:key="a.label"
						@click="doAction(a)"
					/>
				</div>
			</div>
		</div>
	</slide-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IAction, IEaasiTab } from 'eaasi-nav';
import { IEaasiResource, IEnvironment } from '@/types/Resource';
import ResourceAction from './ResourceAction.vue';
import ResourceDetails from './ResourceDetails.vue';
import SlideMenu from '@/components/layout/SlideMenu.vue';
import { Get } from 'vuex-pathify';

@Component({
	name: 'ResourceSlideMenu',
	components: {
		ResourceAction,
		ResourceDetails,
		SlideMenu
	}
})
export default class ResourceSlideMenu extends Vue {

	/* Props
	============================================*/

	@Prop({type: Boolean, required: true})
	readonly open: boolean

	@Prop({type: Object as () => IEaasiResource})
	readonly resource: IEaasiResource

	/* Computed
	============================================*/

	@Get('resource/activeEnvironment')
	readonly environment: IEnvironment

	/* Data
	============================================*/

	// TODO: Actions should become dynamic based on resource type and user role
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

	tabs: IEaasiTab[] = [
		{
			label: 'Details'
		},
		{
			label: 'Actions'
		}
	]

	tab: string = 'Actions'

	/* Computed
	============================================*/

	/**
	 * Computes whether or not to show the details tab
	 */
	get hasDetails() {
		// TODO: Logic for showing details tab
		return true;
	}

	/* Methods
	============================================*/

	doAction(action: IAction) {
		console.log(`Action clicked: ${action.label}`);
		if(action.label === 'Run in Emulator') {
			if(this.environment) {
				this.$router.push('/access-interface');
			}
		}
	}

}

</script>

<style lang="scss">
.resource-slide-menu {
	background-color: lighten($light-neutral, 60%);

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