<template>
	<div>
		<div class="mtb-container">
			<dual-toggle 
				v-if="canUserToggle"
				:options="toggleOptions" 
				:value="toggleValue"
				@input="onToggleValueChange" 
			/>
			<div class="flex-center flex-row justify-between" style="flex: 1; margin-left: 2rem;">
				<div v-if="!canUserToggle" class="read-only-message no-select">
					{{ toggleOptions[0] }} Only
				</div>
				<div v-else-if="isEditMode" class="flex-center flex-row justify-between" style="flex: 1;">
					<span>
						Edit resource metadata and save changes.
					</span>
					<div>
						<ui-button secondary size="md" style="margin-right: 1rem;">
							Cancel Changes
						</ui-button>
						<ui-button primary size="md">
							Save Changes
						</ui-button>
					</div>
				</div>
				<div v-else>
					Visit this published resource on 
					<a href="">Wikidata for Digital Preservation</a>
					to initiate metadata changes.
				</div>
			</div>
		</div>
		<environment-metadata-section 
			v-if="isEnvironment"
			:resource="resource"
			:readonly="!isEditMode"
		/>
		<software-metadata-section
			v-else-if="isSoftware"
			:resource="resource"
			:readonly="!isEditMode"
		/>
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
import { IEaasiResourceSummary, IEnvironment, ISoftwarePackage } from '@/types/Resource';
import { ILabeledItem } from '@/types/ILabeledItem';
import EnvironmentMetadataSection from './EnvironmentMetadataSection.vue';
import SoftwareMetadataSection from './SoftwareMetadataSection.vue';
import User from '@/models/admin/User';
import { resourceTypes } from '@/utils/constants';

@Component({
	name: 'ResourceDetailsMetadata',
	components: {
		EnvironmentMetadataSection,
		SoftwareMetadataSection
	}
})
export default class ResourceDetailsMetadata extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Object as () => IEnvironment | ISoftwarePackage, required: true })
	resource: IEnvironment | ISoftwarePackage;

	/* Data
	============================================*/
	editable: Boolean = false;
	showEditConfirmModal: Boolean = false;
	toggleOptions = ['Review Mode', 'Edit Mode'];
	toggleValue: string = this.toggleOptions[0];
	
	/* Computed
	============================================*/
	
	@Get('loggedInUser')
	loggedInUser: User
	
	get isEnvironment() {
		return this.$route.path.indexOf('environment') > 0;
	}
	
	get isSoftware() {
		return this.$route.path.indexOf('software') > 0;
	}

	get canUserToggle() {
		return this.loggedInUser.userHasEditPermissions;
	}

	get isEditMode() {
		return this.toggleValue === 'Edit Mode';
	}

	/* Methods
	============================================*/
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
		padding-left: 2.4rem;
		padding-right: 2.4rem;

		.mtb-mode {
			margin-left: 1.2rem;
		}
		.read-only-message {
			border: 2px solid lighten($dark-neutral, 40%);
			border-radius: 2rem;
			color: $dark-neutral;
			padding: 1rem;
		}
	}
</style>