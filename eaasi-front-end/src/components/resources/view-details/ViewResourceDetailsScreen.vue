<template>
	<div id="myResources">
		<h1>Resource Details</h1>

		<tabbed-nav :tabs="tabs" v-model="activeTab" />

		<mode-toggle-bar />

		<div class="vrd-content">
			<tag icon="fa-box" text="Environment" />

			<div v-if="activeTab === 'Metadata'">
				<resource-details-metadata
					:resource-detail-summary="resourceData"
				/>
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
import ResourceDetailsMetadata from '@/components/resources/view-details/ResourceDetailsMetadata.vue';

	@Component({
		name: 'ViewResourceDetailsScreen',
		components: {
			ModeToggleBar,
			ResourceDetails,
			ResourceDetailsMetadata
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

		activeTab: string = 'Metadata';

		menuOpen: boolean = false;

		tabs: IEaasiTab[] = [
			{ label: 'Metadata' },
			{ label: 'History' },
		]

	/* Computed
    ============================================*/

	/* Methods
    ============================================*/

	/* Lifecycle Hooks
    ============================================*/

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