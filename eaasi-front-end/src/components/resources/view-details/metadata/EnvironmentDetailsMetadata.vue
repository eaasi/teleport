<template>
	<div class="rdm-container">
		<div class="row">
			<div class="col-md-4">
				<environment-details-summary :summary-data="resourceDetailSummary" />
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<section-heading title="Operating System" size="large" />
				<labeled-item-list
					:labeled-items="osLabeledItems"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="Configured Machine" size="large" />
				<labeled-item-list
					:labeled-items="configMachineLabeledItems"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="Emulator" size="large" />
				<labeled-item-list
					:labeled-items="emulatorLabeledItems"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<section-heading title="Configured Drives" size="large" />
				<labeled-item-list
					:labeled-items="driveLabeledItems"
				/>
			</div>
		</div>
		<div class="row">
			<div class="softwareIncluded col-md-12 vrd-subsection">
				<section-heading title="Software Included In This Resource" size="large" />
				<div class="active-software-items" v-if="activeSoftware">
					<selectable-card :data="activeSoftware" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="thisIncludedIn col-md-12 vrd-subsection">
				<section-heading title="This Resource Is Included In" size="large" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {Sync} from 'vuex-pathify';
import {IEaasiResourceSummary, IEnvironment} from '@/types/Resource';
import {ILabeledItem} from '@/types/ILabeledItem';
import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';
import EnvironmentDetailsSummary from '@/components/resources/view-details/metadata/EnvironmentDetailsSummary.vue';

@Component({
	name: 'EnvironmentDetailsMetadata.vue',
	components: {
		LabeledItemList,
		EnvironmentDetailsSummary
	}
})
export default class EnvironmentDetailsMetadata extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Object as () => IEaasiResourceSummary, required: true})
	resourceDetailSummary: IEaasiResourceSummary;

	/* Data
	============================================*/
	title: string = this.resourceDetailSummary.title;

	/* Computed
	============================================*/
	@Sync('resource/activeEnvironment')
	environment: IEnvironment

	@Sync('software/activeSoftware')
	software: any

	// TODO: This temporarily just returns the first active software for proof of concept integration
	get activeSoftware() : IEaasiResourceSummary {
		if (this.software == null) return null;

		return {
			content: undefined,
			subContent: undefined,
			tagGroup: [],
			title: this.software.label,
			id: this.software.id
		};
	}

	/**
	 * Parses the environment data for emulator-specific properties
	 */
	get emulatorLabeledItems() : ILabeledItem[] {
		if (this.environment == null) return [];

		let emuItems = [];

		if (this.environment.emulator) {
			emuItems.push({
				label: 'Name',
				value: this.environment.emulator
			});
		}

		if (this.environment.containerName) {
			emuItems.push({
				label: 'Container Name',
				value: this.environment.containerName
			});
		}

		if (this.environment.containerVersion) {
			emuItems.push({
				label: 'Container Version',
				value: this.environment.containerVersion
			});
		}

		if (this.environment.nativeConfig) {
			emuItems.push({
				label: 'Emulator Configuration',
				value: this.environment.nativeConfig
			});
		}

		return emuItems;
	}

	/**
	 * Parses the environment data for emulator-specific properties
	 */
	get driveLabeledItems() {
		if (this.environment == null || !this.environment.drives) return [];

		let driveItems = [];

		this.environment.drives.map(drive => {
			driveItems.push({
				label: drive.type,
				value: this._createFileSystemLabel(drive.filesystem)
			});
		});

		return driveItems;
	}

	get configMachineLabeledItems() : ILabeledItem[] {
		return [];
	}

	get osLabeledItems() : ILabeledItem[] {
		return [];
	}

	/* Methods
	============================================*/
	_createFileSystemLabel(fileSystem: string): string {
		if (!fileSystem) fileSystem = 'Not specified';
		return `File System: ${fileSystem}`;
	}

	/* Lifecycle Hooks
	============================================*/
}

</script>

<style lang="scss">
	.vds-container {

		.vds-description {
			font-size: 1.6rem;
		}

		.vds-footer {
			font-size: 0.8rem;

			.vds-label {
				text-transform: uppercase;
			}
		}
	}

	.active-software-items {
		display: flex;
		flex-direction: row;
		padding: 16px;
	}
</style>