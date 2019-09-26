<template>
	<div class="rdm-container">
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
					:labeled-items="configuredMachineLabeledItems"
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
			<div id="softwareIncluded" class="col-md-12 vrd-subsection">
				<section-heading title="Software Included In This Resource" size="large" />
			</div>
		</div>
		<div class="row">
			<div id="thisIncludedIn" class="col-md-12 vrd-subsection">
				<section-heading title="This Resource Is Included In" size="large" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {IEaasiResourceSummary} from '@/types/Resource';
import {ILabeledItem} from '@/types/ILabeledItem';
import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';

@Component({
	name: 'ResourceDetailsMetadata',
	components: {
		LabeledItemList
	}
})
export default class ResourceDetailsMetadata extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Object as () => IEaasiResourceSummary, required: true})
	resourceDetailSummary: IEaasiResourceSummary;

	/* Data
	============================================*/
	title: string = this.resourceDetailSummary.title;

	emulatorLabeledItems: ILabeledItem[] = [];
	configuredMachineLabeledItems: ILabeledItem[] = [];
	osLabeledItems: ILabeledItem[] = [];

	/* Computed
	============================================*/

	/* Methods
	============================================*/
	populateEmulatorLabeledItems() {
		return [
			{ label: 'File Format', value: '.iso' },
			{ label: 'File Format', value: '.iso' },
			{ label: 'File Format', value: '.iso' },
		];
	}

	populateCfgMachineLabeledItems() {
		return [
			{ label: 'File Format', value: '.iso' },
			{ label: 'File Format', value: '.iso' },
		];
	}

	populateOsLabeledItems() {
		return [
			{ label: 'File Format', value: '.iso' },
			{ label: 'File Format', value: '.iso' },
			{ label: 'File Format', value: '.iso' },
			{ label: 'File Format', value: '.iso' },
			{ label: 'File Format', value: '.iso' },
		];
	}

	/* Lifecycle Hooks
	============================================*/

	created() {
		this.emulatorLabeledItems = this.populateEmulatorLabeledItems();
		this.configuredMachineLabeledItems = this.populateCfgMachineLabeledItems();
		this.osLabeledItems = this.populateOsLabeledItems();
	}
}

</script>

<style lang="scss">
	.vds-container {

		.vds-description {
			font-size: 1rem;
		}

		.vds-footer {
			font-size: 0.8rem;

			.vds-label {
				text-transform: uppercase;
			}
		}
	}
</style>