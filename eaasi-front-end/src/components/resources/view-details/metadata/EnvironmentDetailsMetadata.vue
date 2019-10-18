<template>
	<div>
		<div class="mtb-container">
			<dual-toggle 
				v-if="showToggle"
				:options="toggleOptions" 
				:value="toggleValue"
				@input="onToggleValueChange" 
			/>
			<div class="flex-center flex-row">
				<div v-if="!showToggle" class="read-only-message no-select">
					{{ toggleOptions[0] }} Only
				</div>
				<div style="margin-left: 1rem;">
					Visit this published resource on 
					<a href="">Wikidata for Digital Preservation</a>
					to initiate metadata changes.
				</div>
			</div>
		</div>
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
		<confirm-modal
			v-if="showEditConfirmModal"
			title="Confirm Edit Modal"
			confirm-label="Continue to Edit Mode"
			@click:cancel="showEditConfirmModal = false"
			@click:confirm="confirmEdit"
		>
			<alert type="warning">
				Editing the metadata of this resource will create a local copy at your node.
			</alert>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Sync, Get } from 'vuex-pathify';
import { IEaasiResourceSummary, IEnvironment } from '@/types/Resource';
import { ILabeledItem } from '@/types/ILabeledItem';
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
	editable: bool = false;
	showEditConfirmModal: bool = false;
	toggleOptions = ['Review Mode', 'Edit Mode'];
	toggleValue: string = this.toggleOptions[0];
	
	/* Computed
	============================================*/
	@Sync('resource/activeEnvironment')
	environment: IEnvironment

	@Sync('software/activeSoftware')
	software: any
	
	@Sync('user')
	user: User
	
	get showToggle() {
		return true;
		return this.user && this.user.roleID < 3;
	}

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

	confirmEdit() {
		this.editable = true;
		this.showEditConfirmModal = false;
		this.toggleValue = this.toggleOptions[1];
	}

	onToggleValueChange(val) {
		val === this.toggleOptions[1] && !this.editable 
			? this.showEditConfirmModal = true 
			: this.toggleValue = val;
	}

}

</script>

<style lang="scss">
	.rdm-container {
		padding: 24px;
	}
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

	.mtb-container {
		align-items: center;
		background-color: lighten($light-neutral, 40%);
		border-bottom: 2px solid darken($light-neutral, 20%);
		display: flex;
		height: 64px;
		padding-left: 24px;

		.mtb-mode {
			margin-left: 12px;
		}
		.read-only-message {
			border: 2px solid lighten($dark-neutral, 40%);
			border-radius: 20px;
			color: $dark-neutral;
			padding: 1rem;
		}
	}
</style>