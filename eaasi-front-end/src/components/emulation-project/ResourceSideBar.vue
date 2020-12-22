<template>
	<div class="resource-side-bar">
		<alert
			style-preset="bordered"
			card
			collapsable
			type="error"
			v-if="resourceLimit === 0"
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
					<a
						class="clickable txt-sm bold"
						@click="removeResourcesOfType([resourceTypes.ENVIRONMENT])"
					>
						Clear All
					</a>
				</div>
				<div
					v-for="env in environments"
					:key="env.envId"
					class="flex-row mb"
				>
					<selectable-radio-card
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
						<template v-slot:tagsRight>
							<tag-group position="right" :tags="getArchiveTags(env)" />
						</template>
					</selectable-radio-card>
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
					<a
						class="clickable txt-sm bold"
						@click="removeResourcesOfType([resourceTypes.CONTENT, resourceTypes.SOFTWARE])"
					>
						Clear All
					</a>
				</div>
				<div class="rsb-alert-container">
					<alert
						no-icon
						type="info"
						style="margin-bottom: 1rem;"
						v-if="resourceLimit === 1"
					>
						Only one object type can be emulated <br />
						at a time - content or software
					</alert>
				</div>
				<div
					v-for="obj in objects"
					:key="obj.id"
					class="flex-row mb"
				>
					<selectable-radio-card
						footer
						:data="{ title: obj.title || obj.label }"
						:value="isSelected(obj)"
						@change="(e) => selectResource(obj, e)"
						class="flex-grow no-mb"
						style="width: 30rem;"
					>
						<template v-slot:tagsLeft>
							<tag-group position="left" :tags="getTypeTags(obj)" />
						</template>
					</selectable-radio-card>
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
import { Component } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import InfoMessage from './shared/InfoMessage.vue';
import { Get, Sync } from 'vuex-pathify';
import {IEaasiResource, IEnvironment, ResourceType} from '@/types/Resource';
import { resourceTypes, IResourceTypes } from '@/utils/constants';
import {getEnvironmentResourceTypeTags, getResourceTypeTags} from '@/helpers/ResourceHelper';
import EnvironmentResourceCard from '@/components/resources/EnvironmentResourceCard.vue';
import SoftwareResourceCard from '@/components/resources/SoftwareResourceCard.vue';
import ContentResourceCard from '@/components/resources/ContentResourceCard.vue';
import { ROUTES } from '@/router/routes.const';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import SelectableRadioCard from '@/components/global/SelectableCard/SelectableRadioCard.vue';
import {archiveTypes} from "../../../../eaasi-web-api/src/utils/constants";

@Component({
	name: 'ResourceSideBar',
	components: {
		SelectableRadioCard,
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
	environment: EmulationProjectEnvironment;

	@Get('emulationProject/projectResources')
	readonly resources: IEaasiResource[];

	@Sync('emulationProject/selectedResources')
	selected: IEaasiResource[];

	@Get('emulationProject/constructedFromBaseEnvironment')
	constructedFromBaseEnvironment: boolean;

	get resourceLimit(): number {
		if (this.constructedFromBaseEnvironment) {
			return this.environment ? this.environment.drives.length : this.defaultDriveLimit;
		}
		else return 1;
	}

	@Get('emulationProject/projectEnvironments')
	environments: IEnvironment[];

	@Get('emulationProject/projectObjects')
	objects: IEaasiResource[];

	get hasObjectSlots(): boolean {
		return this.resourceLimit > this.selected.length;
	}

	/* Data
	============================================*/
	tabs: IEaasiTab[] = [
		{
			label: 'Project Resources'
		},
	];

	defaultDriveLimit: number = 3;
	activeTab: IEaasiTab = this.tabs[0];
	resourceTypes: IResourceTypes = resourceTypes;

	/* Methods
	============================================*/

	getTypeTags(resource: IEaasiResource) {
		return getResourceTypeTags(resource);
	}

	getArchiveTags(resource: IEaasiResource) {
		let tagGroup = [];
		if (resource.archive === archiveTypes.PUBLIC) {
			tagGroup.push({
				icon: 'fa-cloud-download', // TODO: Needs a custom icon - cloud with check mark
				color: 'green',
				text: 'Saved from network'
			});
		} else if (resource.archive === archiveTypes.REMOTE) {
			tagGroup.push({
				icon: 'fa-cloud',
				color: 'white',
				text: 'Remote'
			});
		} else if (resource.archive === archiveTypes.DEFAULT) {
			tagGroup.push({
				color: 'yellow',
				text: 'Local'
			});
		}
		return tagGroup;
	}

	isSelected(resource: IEaasiResource) {
		return this.selected.some(x => x.id === resource.id);
	}

	removeResource(resource: IEaasiResource) {
		this.$store.dispatch('emulationProject/removeResource', resource);
	}

	removeResourcesOfType(resourceTypes: ResourceType[]) {
		this.$store.dispatch('emulationProject/removeResourcesOfType', resourceTypes);
	}

	selectResource(resource: IEaasiResource, selected: boolean) {
		let resourcesToSelect = [];

		if (!selected || this.isSelected(resource)) {
			resourcesToSelect = this.selected.filter(x => x.id !== resource.id);
		} else {
			resourcesToSelect = [resource];
		}
		this.selected = resourcesToSelect.slice(0, this.resourceLimit);
	}

	setEnvironment(environment: IEnvironment, checked: boolean) {
		if (checked) {
			this.environment = new EmulationProjectEnvironment(environment);
			this.$router.push(ROUTES.EMULATION_PROJECT.DETAILS);
		} else {
			this.environment = null;
			this.$router.push(ROUTES.EMULATION_PROJECT.OPTIONS);
		}
	}

	isDisabled(resource: IEaasiResource): boolean {
		return !this.isSelected(resource) && !this.hasObjectSlots && this.selected.length > 0;
	}

	/* Lifecycle Hooks
	============================================*/

}
</script>

<style lang='scss'>
.resource-side-bar {
	padding: 1.8rem;

	.resource-object-container {
		width: 308px;
	}

	.rsb-alert-container {
		padding: 1rem 0;
	}
}

.rsb-header {
	border-bottom: solid 2px lighten($dark-neutral, 80%);
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
}
</style>