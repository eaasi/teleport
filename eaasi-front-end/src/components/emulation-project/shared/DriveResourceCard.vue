<template>
	<drive-card :label="driveCardLabel">
		<template #action v-if="hasResource">
			<ui-button color-preset="white" @click="removeResource">
				<div class="flex flex-row flex-cetner rm-btn">
					Remove Resource
					<span class="fas fa-times"></span>
				</div>
			</ui-button>
		</template>
		<div v-if="hasResource">
			<software-resource-card
				v-if="isSoftware"
				:software="resource"
				disable-select
				:bookmark="false"
				style="width: 100%;"
			/>
			<content-resource-card
				v-else-if="isContent"
				:content="resource"
				disable-select
				:bookmark="false"
				style="width: 100%;"
			/>
		</div>
		<div v-else-if="!hasResource" class="alert-wrapper">
			<alert no-icon type="warning" style-preset="border-right">
				Select project resources to fill drive
			</alert>
		</div>
		<search-select-list
			style="margin-top: 1rem;"
			v-model="driveSetting.objectId"
			option-label="label"
			anchor="id"
			placeholder="Select a project resource..."
			:data="resources"
			rules="required"
		/>
	</drive-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResource, IDriveSetting } from '@/types/Resource';
import { resourceTypes } from '@/utils/constants';
import ContentResourceCard from '@/components/resources/ContentResourceCard.vue';
import SoftwareResourceCard from '@/components/resources/SoftwareResourceCard.vue';
import DriveCard from './DriveCard.vue';

@Component({
	name: 'DriveResourceCard',
	components: {
		ContentResourceCard,
		DriveCard,
		SoftwareResourceCard,
	}
})
export default class DriveResourceCard extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Object as () => IDriveSetting, required: true })
	readonly driveSetting: IDriveSetting;

	@Prop({ type: Array as () => IEaasiResource[] })
	readonly resources: IEaasiResource[];

	/* Computed
	============================================*/
	get resource(): IEaasiResource {
		if (!this.driveSetting.objectId) return null;
		return this.resources.find(resource => resource.id === this.driveSetting.objectId || resource.id === this.driveSetting.imageId);
	}

	get hasResource(): boolean {
		return this.resource != null;
	}

	get isSoftware() {
		return this.hasResource && this.resource.resourceType === resourceTypes.SOFTWARE;
	}

	get isContent() {
		return this.hasResource && this.resource.resourceType === resourceTypes.CONTENT;
	}

	get driveCardLabel(): string {
		return `${this.driveSetting.drive.type}`;
	}

	removeResource() {
		this.driveSetting.objectId = null;
	}

}
</script>

<style lang='scss'>
.drive-card {
	flex-direction: column;
	.eaasi-search-select {
		width: 100%;
	}

	.resource-object-container {
		border: none;
		margin-bottom: 0;
		min-height: 5rem;

		.subcontent-divider,
		.content {
			display: none;
		}

		.panel-right {
			padding: 0;
		}

		.panel-footer {
			padding-top: 0.5rem;
		}
	}
}
</style>