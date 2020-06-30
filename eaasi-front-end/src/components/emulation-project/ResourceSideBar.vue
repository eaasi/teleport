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
		<tabbed-nav
			:value="activeTab.label"
			:tabs="tabs"
			color-preset="clear-white"
		/>
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
				<div
					v-for="env in environments"
					:key="env.envId"
					class="flex-row"
				>
					<environment-resource-card
						:environment="env"
						is-clickable
						hide-details
					/>
				</div>
			</div>
			<!-- <div class="rsb-objects" v-if="objects.length">
				<selectable-card
					v-for="o in objects"
					:key="o.id"
				/>
			</div> -->
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import InfoMessage from './shared/InfoMessage.vue';
import { Get } from 'vuex-pathify';
import { IEmulationProjectResource } from '../../types/Emulation';
import { IEaasiResource, IEnvironment } from '../../types/Resource';
import { resourceTypes } from '../../utils/constants';
import { filterResourcesByType, removeResourcesByType } from '../../helpers/ResourceHelper';
import EnvironmentResourceCard from '@/components/resources/EnvironmentResourceCard.vue';

@Component({
	name: 'ResourceSideBar',
	components: {
		EnvironmentResourceCard,
		InfoMessage
	}
})
export default class ResourceSideBar extends Vue {

	/* Props
	============================================*/

	/* Computed
	============================================*/

	@Get('emulationProject/projectResources')
	readonly resources: IEaasiResource[];

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

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

}
</script>

<style lang='scss'>
.resource-side-bar {
	margin-top: 2rem;

	.content {
		padding: 2rem;
	}
}
</style>