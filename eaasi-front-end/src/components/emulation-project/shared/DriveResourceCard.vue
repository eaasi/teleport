<template>
	<drive-card :label="drive.type">
		<software-resource-card
			v-if="resource && isSoftware"
			:software="resource"
			disable-select
			:bookmark="false"
			style="width: 100%;"
		/>
		<content-resource-card
			v-else-if="resource && isContent"
			:content="resource"
			disable-select
			:bookmark="false"
			style="width: 100%;"
		/>
		<search-select-list
			v-else-if="!resource"
			v-model="drive.resourceId"
			option-label="title"
			anchor="id"
			placeholder="Select a project resource..."
			:data="resources"
			rules="required"
		/>
	</drive-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IDrive, IEaasiResource, IResourceDrive } from '../../../types/Resource';
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
	@Prop({ type: Object as () => IDrive, required: true })
	readonly drive: IResourceDrive;
	
	@Prop({ type: Array as () => IEaasiResource[] })
	readonly resources: IEaasiResource[];

	/* Computed
	============================================*/
	get resource(): IEaasiResource {
		return {
			archiveId: 'zero conf',
			id: '1fbc9d79-708d-4cb8-aecb-9be3c7405fab',
			title: 'test object',
			resourceType: resourceTypes.CONTENT,
			isPublic: false
		};
		return this.resources.find(resource => resource.id === this.drive.resourceId);
	}

	get isSoftware() {
		return this.resource.resourceType === resourceTypes.SOFTWARE;
	}

	get isContent() {
		return this.resource.resourceType === resourceTypes.CONTENT;
	}

}
</script>

<style lang='scss'>
.drive-card {
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