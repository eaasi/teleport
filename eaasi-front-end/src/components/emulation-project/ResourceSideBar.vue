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
						class="clickable txt-sm"
						@click="removeResourcesOfType([resourceTypes.ENVIRONMENT])"
					>
						Clear List
					</a>
				</div>
				<draggable handle=".drag-handler" drag-class="drag" ghost-class="ghost">
					<div
						v-for="env in environments"
						:key="env.envId"
						class="mb"
					>
						<draggable-card
							disabled
							footer
							:data="env"
							is-clickable
							hide-details
							class="flex-grow no-mb"
							@change="setEnvironment(env, $event)"
						>
							<template #tagsLeft>
								<tag-group position="left" :tags="getTypeTags(env)"/>
							</template>
							<template #tagsRight>
								<tag-group position="right" :tags="getArchiveTags(env)"/>
							</template>
						</draggable-card>
						<div class="remove-resource-button text-right">
							<a class="clickable txt-sm" @click="removeResource(env)">Remove from project <span
								class="fas fa-times"
							></span></a>
						</div>
					</div>
				</draggable>
				<div class="flex-row justify-between rsb-header">
					<h4 class="no-mb">Images</h4>
					<a
						class="clickable txt-sm"
						@click="removeResourcesOfType([resourceTypes.IMAGE])"
					>
						Clear List
					</a>
				</div>
				<draggable handle=".drag-handler" drag-class="drag" ghost-class="ghost">
					<draggable-card
						disabled
						footer
						:data="emptyImage"
						is-clickable
						hide-details
						class="flex-grow no-mb"
					>
						<template #tagsLeft>
							<tag-group position="left" :tags="getTypeTags(emptyImage)"/>
						</template>
						<template #tagsRight>
							<tag-group position="right" :tags="getArchiveTags(emptyImage)"/>
						</template>
					</draggable-card>
				</draggable>
			</div>
			<div class="rsb-objects" v-if="objects.length">
				<div class="flex-row justify-between rsb-header">
					<h4 class="no-mb">Objects</h4>
					<a
						class="clickable txt-sm"
						@click="removeResourcesOfType([resourceTypes.CONTENT, resourceTypes.SOFTWARE])"
					>
						Clear All
					</a>
				</div>
				<!--<div class="rsb-alert-container">
					<alert
						no-icon
						type="info"
						style="margin-bottom: 1rem;"
						v-if="resourceLimit === 1"
					>
						Only one object type can be emulated <br/>
						at a time - content or software
					</alert>
				</div>-->

				<draggable handle=".drag-handler" drag-class="drag" ghost-class="ghost">
					<div
						v-for="obj in objects"
						:key="obj.id"
						class="mb"
					>
						<draggable-card
							disabled
							footer
							hide-details
							:data="{ title: obj.title || obj.label }"
							:value="isSelected(obj)"
							@change="(e) => selectResource(obj, e)"
							class="flex-grow no-mb"
						>
							<template #tagsLeft>
								<tag-group position="left" :tags="getTypeTags(obj)"/>
							</template>
						</draggable-card>
						<div class="remove-resource-button text-right">
							<a class="clickable txt-sm" @click="removeResource(obj)">Remove from project <span
								class="fas fa-times"
							></span></a>
						</div>
					</div>
				</draggable>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {IEaasiTab} from 'eaasi-nav';
import InfoMessage from './shared/InfoMessage.vue';
import {Get, Sync} from 'vuex-pathify';
import {IEaasiResource, IEnvironment, ResourceType} from '@/types/Resource';
import {resourceTypes, IResourceTypes, translatedIcon, archiveTypes} from '@/utils/constants';
import {getResourceTypeTags} from '@/helpers/ResourceHelper';
import EnvironmentResourceCard from '@/components/resources/EnvironmentResourceCard.vue';
import SoftwareResourceCard from '@/components/resources/SoftwareResourceCard.vue';
import ContentResourceCard from '@/components/resources/ContentResourceCard.vue';
import {ROUTES} from '@/router/routes.const';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import DraggableCard from '@/components/global/DraggableCard/DraggableCard.vue';
import SelectableRadioCard from '@/components/global/SelectableCard/SelectableRadioCard.vue';
import Draggable from 'vuedraggable';

@Component({
	name: 'ResourceSideBar',
	components: {
		DraggableCard,
		EnvironmentResourceCard,
		SoftwareResourceCard,
		ContentResourceCard,
		InfoMessage,
		SelectableRadioCard,
		Draggable
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
		} else return 1;
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

	emptyImage: IEaasiResource = {
		title: 'Empty Disk',
		resourceType: 'Image',
		isPublic: false,
		isEmpty: true,
	};

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
				icon: translatedIcon('map-marker'),
				color: 'green',
				text: 'Saved Locally'
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

<style lang="scss">
.resource-side-bar {
	padding: 1.8rem;

	.rsb-alert-container {
		padding: 1rem 0;
	}
}

.rsb-header {
	border-bottom: solid 2px lighten($dark-neutral, 80%);
	margin-bottom: 1.5rem;
	padding-bottom: 0.5rem;

	h4 {
		text-transform: uppercase;
	}
}

.remove-resource-button {
	padding: 2px 5px 0 5px;

	a > span {
		padding-left: 0.4rem;
	}
}

.drag:not(.ghost) .remove-resource-button {
	display: none;
}

.rsb-environments, .rsb-objects {
	padding: 1.5rem;
	margin-bottom: 1rem;
	border: 1px solid lighten($dark-neutral, 80%);
	border-radius: 1rem;
}

</style>