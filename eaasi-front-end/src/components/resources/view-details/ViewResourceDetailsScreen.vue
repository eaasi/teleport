<template>
	<div id="myResources">
		<h1>Resource Details</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<mode-toggle-bar />
		<div class="vrd-content">
			<tag icon="fa-box" text="Environment" />

			<div v-if="activeTab=='History'">
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
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import ModeToggleBar from '@/components/resources/view-details/ModeToggleBar.vue';
import ResourceDetails from '@/components/resources/ResourceDetails.vue';
import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';
import {ILabeledItem} from '@/types/ILabeledItem';

	@Component({
		name: 'ViewResourceDetailsScreen',
		components: {
			LabeledItemList,
			ModeToggleBar,
			ResourceDetails
		}
	})
export default class ViewResourceDetailsScreen extends Vue {

		/* Props
        ============================================*/
		@Prop({ type: String, required: true })
		resource: string;

		/* Data
        ============================================*/
		resourceData = JSON.parse(this.resource);

		emulatorLabeledItems: ILabeledItem[] = [];
		configuredMachineLabeledItems: ILabeledItem[] = [];
		osLabeledItems: ILabeledItem[] = [];

		activeTab: string = 'History';

		menuOpen: boolean = false;

		tabs: IEaasiTab[] = [
			{
				label: 'History'
			},
			{
				label: 'Metadata'
			},
		]

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
	.vrd-content {
		padding: 24px;

		.vrd-subsection {
			padding: 18px 0;
		}
	}

	#thisIncludedIn {
		background-color: lighten($light-neutral, 75%);
	}
</style>