<template>
	<div class="resource-side-bar">
		<alert
			bordered
			card
			collapsable
			v-if="!hasDevicesAvailable"
			type="error"
			style="margin: 1rem 2rem 2rem 2rem;"
		>
			Available Devices Full
			<div slot="details">
				Unmark a selected resource to free up a drive to mark a new one.
			</div>
		</alert>
		<div class="content flex flex-column">
			<ui-button
				v-if="!resources && !resources.length"
				block
				class="mb"
				color-preset="light-blue"
			>
				Find Resource(s)
			</ui-button>
			<div class="rsb-environments" v-if="environments.length">
				<div class="flex-row justify-between rsb-header">
					<h4 class="no-mb">Environments</h4>
					<a class="clickable txt-sm bold">Clear All</a>
				</div>
				<div
					v-for="env in environments"
					:key="env.envId"
					class="flex-row mb"
				>
					<selectable-card
						footer
						:data="env"
						is-clickable
						hide-details
						class="flex-grow no-mb"
						@change="setEnvironment(env, $event)"
						:value="!!environment && environment.envId == env.envId"
					>
						<template v-slot:tagsLeft>
							<tag-group position="left" :tags="getTypeTags(env)" />
						</template>
					</selectable-card>
					<div>
						<circle-button
							color-preset="light-blue"
							icon="times"
							class="ml-sm"
							@click="removeResource(env)"
						/>
					</div>
				</div>
			</div>
			<div class="rsb-objects" v-if="objects.length">
				<div class="flex-row justify-between rsb-header">
					<h4 class="no-mb">Objects</h4>
					<a class="clickable txt-sm bold">Clear All</a>
				</div>
				<div
					v-for="obj in objects"
					:key="obj.id"
					class="flex-row mb"
				>
					<selectable-card
						footer
						:data="{ title: obj.title || obj.label }"
						:value="isSelected(obj)"
						@change="selectResource(obj)"
						class="flex-grow no-mb"
					>
						<template v-slot:tagsLeft>
							<tag-group position="left" :tags="getTypeTags(obj)" />
						</template>
					</selectable-card>
					<div>
						<circle-button
							color-preset="light-blue"
							icon="times"
							class="ml-sm"
							@click="removeResource(obj)"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import InfoMessage from './shared/InfoMessage.vue';
import { Get, Sync } from 'vuex-pathify';
import { IEmulationProjectResource } from '../../types/Emulation';
import { IEaasiResource, IEnvironment } from '../../types/Resource';
import { resourceTypes, IResourceTypes } from '../../utils/constants';
import { filterResourcesByType, getResourceTypeTags, removeResourcesByType } from '../../helpers/ResourceHelper';
import EnvironmentResourceCard from '@/components/resources/EnvironmentResourceCard.vue';
import SoftwareResourceCard from '@/components/resources/SoftwareResourceCard.vue';
import ContentResourceCard from '@/components/resources/ContentResourceCard.vue';

@Component({
	name: 'ResourceSideBar',
	components: {
		EnvironmentResourceCard,
		SoftwareResourceCard,
		ContentResourceCard,
		InfoMessage
	}
})
export default class ResourceSideBar extends Vue {

	/* Props
	============================================*/

	/* Computed
	============================================*/

	@Sync('emulationProject/environment')
	environment: IEnvironment;

	@Get('emulationProject/projectResources')
	readonly resources: IEaasiResource[];

	@Sync('emulationProject/selectedResources')
	selected: IEaasiResource[];

	get environments(): IEnvironment[] {
		return filterResourcesByType(this.resources, resourceTypes.ENVIRONMENT) as IEnvironment[];
	}

	get objects() {
		return removeResourcesByType(this.resources, resourceTypes.ENVIRONMENT);
	}

	get hasDevicesAvailable(): boolean {
		return true;
	}

	/* Data
	============================================*/
	tabs: IEaasiTab[] = [
		{
			label: 'Project Resources'
		},
	]
	activeTab: IEaasiTab = this.tabs[0];
	resourceTypes: IResourceTypes = resourceTypes;

	/* Methods
	============================================*/

	getTypeTags(resource: IEaasiResource) {
		return getResourceTypeTags(resource);
	}

	isSelected(resource: IEaasiResource) {
		return this.selected.some(x => x.id === resource.id);
	}

	removeResource(resource: IEaasiResource) {
		this.$store.dispatch('emulationProject/removeResource', resource);
	}

	selectResource(resource: IEaasiResource) {
		if(this.isSelected(resource)) {
			this.selected = this.selected.filter(x => x.id !== resource.id);
		} else {
			this.selected = [...this.selected, resource];
		}
	}

	setEnvironment(environment: IEnvironment, checked: boolean) {
		this.environment = checked ? environment : null;
	}

	/* Lifecycle Hooks
	============================================*/

}
</script>

<style lang='scss'>
.resource-side-bar {
	padding: 1.8rem;
}

.rsb-header {
	border-bottom: solid 2px lighten($dark-neutral, 80%);
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
}
</style>