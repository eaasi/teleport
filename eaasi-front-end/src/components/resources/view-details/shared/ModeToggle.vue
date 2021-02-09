<template>
	<div>
		<div class="mtb-container">
			<dual-toggle
				v-if="userCanEdit"
				:options="toggleOptions"
				:value="toggleValue"
				@input="onToggleValueChange"
			/>
			<div class="flex-center flex-row" style="flex: 1; justify-content: flex-start; margin-left: 2rem;">
				<div v-if="!userCanEdit" class="read-only-message no-select" style="margin-right: 2rem;">
					{{ toggleOptions[0] }} Only
				</div>
				<div v-else-if="isEditMode" class="flex-center flex-row justify-between" style="flex: 1;">
					<span>
						Edit resource metadata and save changes.
					</span>
					<div>
						<ui-button
							color-preset="light-blue"
							size="md"
							style="margin-right: 1rem;"
							@click="$emit('refresh')"
						>
							Cancel Changes
						</ui-button>
						<ui-button primary size="md" @click="$emit('save')">
							Save Changes
						</ui-button>
					</div>
				</div>
				<slot name="meta-description">
				</slot>
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
import { Get } from 'vuex-pathify';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/models/admin/User';

@Component({
    name: 'ModeToggle'
})
export default class ModeToggle extends Vue {

    /* Props
	============================================*/
	@Prop({ type: String })
	toggleValue: string;

	@Prop({ type: Array as () => String[], required: true })
	toggleOptions: String[]

	@Prop({ type: Boolean, default: false })
	supressConfirmation: boolean;

	@Prop({ type: Boolean, default: false })
	isPublic: boolean;

    /* Computed
    ============================================*/
	@Get('loggedInUser')
    loggedInUser: User;

    get userCanEdit() {
		return this.loggedInUser.userHasEditPermissions && this.toggleOptions.length > 1;
	}

	get isEditMode(): boolean {
		return this.toggleValue === 'Edit Mode';
	}

    /* Data
    ============================================*/
    showEditConfirmModal: Boolean = false;
	editable: Boolean = false;

    /* Methods
    ============================================*/
    confirmEdit() {
		this.editable = true;
		this.showEditConfirmModal = false;
		this.$emit('mode-change', this.toggleOptions[1]);
	}

    onToggleValueChange(val) {
		if (val === 'Edit Mode' && !this.editable && !this.supressConfirmation) {
			this.showEditConfirmModal = true;
		} else {
			this.$emit('mode-change', val);
		}
    }

}
</script>

<style lang='scss' scoped>
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