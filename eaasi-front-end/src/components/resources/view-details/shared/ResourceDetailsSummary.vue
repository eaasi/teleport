<template>
	<div class="vds-container">
		<span v-if="isEnvironment">
			<tag :text="'Environment'" :icon="'fa-box'" :color="'blue'" />
		</span>
		<span v-if="isSoftware">
			<tag :text="'Software'" :icon="'fa-circle'" :color="'blue'" />
		</span>
		<span v-if="isContent">
			<tag :text="'Content'" :icon="'fa-save'" :color="'blue'" />
		</span>
		<span v-if="isPublicArchive">
			<tag :text="'Saved'" :icon="'fa-map-marker-alt'" :color="'green'" />
		</span>
		<span v-if="isPrivateArchive">
			<tag :text="'Private'" :icon="'fa-cloud-download-alt'" :color="'green'" />
		</span>
		<span v-if="isRemoteArchive">
			<tag :text="'Remote'" :icon="'fa-map-marker-alt'" :color="'blue'" />
		</span>
		<div v-if="readonly" :class="{ 'changed': titleChanged }">
			<section-heading
				:title="summaryData.title"
				size="large"
				:class="{ 'changed': titleChanged }"
			/>
		</div>
		<text-input
			v-else-if="!readonly"
			v-model="summaryData.title"
			:class="{ 'changed': titleChanged }"
		/>
		<div class="vds-description" v-if="summaryData.description">
			<span
				v-if="readonly"
				:class="{ 'changed': descriptionChanged }"
			>
				{{ summaryData.description | stripHtml }}
			</span>
			<span v-else-if="!readonly">
				<text-area-input
					:class="{ 'changed': descriptionChanged }"
					v-model="summaryData.description"
				/>
			</span>
		</div>
		<div class="vds-footer"></div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import {archiveTypes, resourceTypes} from '@/utils/constants';
	import { Component, Prop } from 'vue-property-decorator';
	import { IEaasiResourceSummary } from '@/types/Resource';
	import { jsonCopy } from '@/utils/functions';

	@Component({
		name: 'ResourceDetailsSummary',
	})
	export default class ResourceDetailsSummary extends Vue {

		/* Props
        ============================================*/
		@Prop({ type: Object as () => IEaasiResourceSummary, required: true})
		summaryData: IEaasiResourceSummary;

		@Prop({ type: Boolean})
		readonly: Boolean;

		/* Props
        ============================================*/
		get titleChanged() {
			return this.localTitle !== this.summaryData.title;
		}

		get descriptionChanged() {
			return this.localDescription !== this.summaryData.description;
		}

		get isPublicArchive() {
			return this.summaryData.archive === archiveTypes.PUBLIC;
		}

		get isPrivateArchive() {
			return this.summaryData.archive === archiveTypes.DEFAULT;
		}

		get isRemoteArchive() {
			return this.summaryData.archive === archiveTypes.REMOTE;
		}

		get isSoftware() {
			return this.summaryData.resourceType === resourceTypes.SOFTWARE;
		}

		get isEnvironment() {
			return this.summaryData.envId != null ||
				this.summaryData.resourceType === resourceTypes.ENVIRONMENT;
		}

		get isContent() {
			return this.summaryData.resourceType === resourceTypes.CONTENT;
		}

		/* Data
        ============================================*/
		localTitle = jsonCopy(this.summaryData.title);
		localDescription = this.summaryData.description ? jsonCopy(this.summaryData.description) : null;

	}

</script>

<style lang="scss">
	.vds-container {
		width: 33vw;
		.eaasi-input {
			background: transparent;
		}
		.changed {
			background: lighten($yellow, 60%);
		}

		.vds-description {
			color: $dark-neutral;
			font-size: 1.5rem;
			padding: 1.2rem 0;
		}

		.vds-footer {
			font-size: 0.8rem;

			.vds-label {
				text-transform: uppercase;
			}
		}
	}
</style>