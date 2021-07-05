<template>
	<div class="vds-container">
		<div class="rds-tags">
			<span v-if="isEnvironment">
				<tag
					text="Content Environment"
					:icon="environmentIcon"
					color="white"
				/>
			</span>
			<span v-if="isSoftware">
				<tag
					text="Operating System"
					:icon="softwareIcon"
					color="white"
				/>
			</span>
			<span v-if="isSoftware && !isPublicArchive">
				<tag
					text="Private"
					:icon="privateIcon"
					color="red"
				/>
			</span>
			<span v-if="isContent">
				<tag
					text="Content"
					:icon="contentIcon"
					color="white"
				/>
			</span>
			<span v-if="isContent">
				<tag
					text="Private"
					:icon="privateIcon"
					color="red"
				/>
			</span>
			<span v-if="isPublicArchive">
				<tag
					text="Public"
					:icon="publicNetworkIcon"
					color="green"
				/>
			</span>
			<span v-if="isPublicArchive">
				<tag
					text="Saved Locally"
					:icon="savedLocallyIcon"
					color="green"
				/>
			</span>
			<span v-if="isPrivateArchive">
				<tag
					text="Private"
					:icon="privateIcon"
					color="red"
				/>
			</span>
			<span v-if="isRemoteArchive">
				<tag
					text="Remote"
					:icon="publicNetworkIcon"
					color="green"
				/>
			</span>
		</div>
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
		<div class="vds-description" v-if="summaryData.description && !isEnvironment">
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
	import {archiveTypes, resourceTypes, translatedIcon} from '@/utils/constants';
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

		/* Computed
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

		get contentIcon() {
			return translatedIcon('file');
		}

		get softwareIcon() {
			return translatedIcon('disk');
		}

		get environmentIcon() {
			return translatedIcon('config-environment');
		}

		get publicNetworkIcon() {
			return translatedIcon('public-network');
		}

		get savedLocallyIcon() {
			return translatedIcon('map-marker');
		}

		get privateIcon() {
			return translatedIcon('lock');
		}

	/* Data
	============================================*/
		localTitle = jsonCopy(this.summaryData.title);
		localDescription = this.summaryData.description ? jsonCopy(this.summaryData.description) : null;

	}

</script>

<style lang="scss">
	.rds-tags {
		display: flex;
		margin: 1rem 0;
	}

	.vds-container {
		margin-bottom: 1rem;
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
			font-weight: bold;
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