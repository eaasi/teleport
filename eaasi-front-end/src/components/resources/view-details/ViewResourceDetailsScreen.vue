<template>
	<div id="myResources">
		<h1>Resource Details</h1>
		<tabbed-nav :tabs="tabs" v-model="activeTab" />
		<mode-toggle-bar />
		<div class="vrd-content">
			<tag icon="fa-box" text="Environment" />
			<div class="row">
				<div class="col-md-4">
					<section-heading title="Operating System" size="large"/>
					<labeled-item-list :labeled-items="osLabeledItems"/>
				</div>
				<div class="col-md-4">
					<section-heading title="Configured Machine" size="large"/>
					<labeled-item-list :labeled-items="configuredMachineLabeledItems"/>
				</div>
				<div class="col-md-4">
					<section-heading title="Emulator" size="large"/>
					<labeled-item-list :labeled-items="emulatorLabeledItems"/>
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
	@Prop({ type: String })
	resourceEnvId: string;

	/* Data
	============================================*/
	emulatorLabeledItems: ILabeledItem[];
	configuredMachineLabeledItems: ILabeledItem[];
	osLabeledItems: ILabeledItem[];

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

	/* Lifecycle Hooks
	============================================*/

	created() {
	}
}

</script>

<style lang="scss">
	.vrd-content {
		padding: 24px;
	}
</style>