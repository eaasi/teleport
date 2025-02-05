<template>
	<div>
		<form-modal
			@close="$emit('close')"
			:title="modalTitle"
			save-text="Save Changes"
			class="eaasi-user-modal"
			@save="handleSaveUser"
		>
			<div class="user-info">
				<h3>User Information</h3>
				<div class="row">
					<text-input
						v-model="user.email"
						label="Organization Email"
						rules="required|email"
						class="col-md-6"
						required
					/>
				</div>
				<div class="row">
					<text-input
						v-model="user.username"
						label="Username"
						rules="required"
						class="col-md-6"
						:disabled="!isNew"
						required
					/>
				</div>
				<div class="name-fields row">
					<text-input
						v-model="user.firstName"
						label="First Name"
						class="col-md-6"
					/>
					<text-input
						v-model="user.lastName"
						label="Last Name"
						class="col-md-6"
					/>
				</div>
			</div>

			<div class="user-roles">
				<h3>User Roles & Permissions</h3>
				<descriptive-radios
					:options="radioOptions"
					v-model="user.roleId"
					match-height
				/>
			</div>
			<div class="bottom-btn-wrapper" v-if="!isNew">
				<hr class="btn-wrapper-hr" />
				<div class="btn-wrapper">
					<ui-button
						@click.prevent="showDeleteModal"
						color-preset="white"
						:disabled="user.id === loggedInUser.id"
					>
						Delete User
					</ui-button>
					<ui-button
						v-if="showResetPassword"
						@click.prevent="isResetPasswordModalVisible = true"
						color-preset="white"
						style="margin-left: 2rem;"
						:disabled="user.id === loggedInUser.id"
					>
						Reset Password
					</ui-button>
				</div>
			</div>
		</form-modal>

		<confirm-modal
			cancel-label="Cancel"
			confirm-label="Delete User"
			:title="`Delete User: ${user.username} - ${user.email}`"
			v-if="isDeleteModalVisible"
			@close="isDeleteModalVisible = false"
			@click:confirm="confirmDeleteUser"
		>
			<alert card type="warning" v-if="user">
				<div class="delete-message">
					You are about to delete the user <span class="user-to-delete">{{ user.username }}</span>.
				</div>
				<div class="delete-message">
					This will remove all data associated with the user in the system. Please confirm you would like to continue.
					This action cannot be undone.
				</div>
			</alert>
		</confirm-modal>

		<confirm-modal
			cancel-label="Cancel"
			confirm-label="Reset Password"
			:title="`Reset Password for User: ${user.username} - ${user.email}`"
			v-if="isResetPasswordModalVisible"
			@close="isResetPasswordModalVisible = false"
			@click:confirm="resetPassword"
		>
			<alert card type="warning" v-if="user">
				<div class="delete-message">
					You are about to reset a password for user <span class="user-to-reset">{{ user.username }} - {{ user.email }}</span>.
				</div>
				<div class="delete-message">
					This will reset the current user password and send a new password to the user's email.
					This action cannot be undone.
				</div>
			</alert>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import { IEaasiUser, IEaasiRole } from 'eaasi-admin';
import { IRadioOption } from '@/types/Forms';
import FormModal from '@/components/global/forms/FormModal.vue';
import DescriptiveRadios from '@/components/global/forms/DescriptiveRadios.vue';
import TextInput from '@/components/global/forms/TextInput.vue';
import Modal from '@/components/global/Modal/Modal.vue';
import { userRoles } from '@/utils/constants';
import config from '../../../config';
import { generateNotificationError, generateNotificationSuccess } from '@/helpers/NotificationHelper';
import eventBus from '../../../utils/event-bus';

@Component({
	name: 'UserModal',
	components: {
		FormModal,
		DescriptiveRadios,
		TextInput,
		Modal
	}
})
export default class UserModal extends Vue {
	/* Data
	============================================*/
	isDeleteModalVisible: boolean = false;
	isResetPasswordModalVisible: boolean = false;

	/* Props
	============================================*/

	@Prop({type: Object as () => IEaasiUser, required: true})
	readonly user: IEaasiUser;

	@Prop()
  readonly oldRoleId: number;

	/* Computed
	============================================*/

	@Get('admin/roles')
	readonly roles: IEaasiRole[];

	@Get('loggedInUser')
	readonly loggedInUser: IEaasiUser;

	get isNew() {
		return !this.user.id;
	}

	get modalTitle() {
		return this.isNew ? 'Create New User' : 'Edit User';
	}

	get showResetPassword(): boolean {
		return this.isAdmin && !config.SAML_ENABLED;
	}

	get isAdmin(): boolean {
		return this.loggedInUser?.roleId === userRoles.ADMIN;
	}

	get radioOptions(): IRadioOption[] {
		if (!this.roles) return [];
		return this.roles.map(x => {
			return {
				value: x.id,
				label: x.roleName,
				description: x.roleDescription
			};
		});
	}

	/* Methods
	============================================*/

	async handleSaveUser() {
		if (this.isNew) {
			return await this.saveUser();
		}
		return await this.saveExistingUser();
	}

	async saveExistingUser() {
		let result = await this.$store.dispatch('admin/saveExistingUser', {user: this.user, roleUpdated: this.oldRoleId !== this.user.roleId});
		if (result.hasError) {
			const notification = generateNotificationError(result.message);
			eventBus.$emit('notification:show', notification);
		} else {
			await this.$store.dispatch('admin/getUsers');
		}
		this.$emit('close');
	}

	async saveUser() {
		let result = await this.$store.dispatch('admin/saveUser', this.user);
		if (result.hasError) {
			const notification = generateNotificationError(result.message);
			eventBus.$emit('notification:show', notification);
		} else {
			const message = `Account for ${this.user.username} created. Provide this temporary password to the user: ${result}`;
			const notification = generateNotificationSuccess(message, 20000);
			eventBus.$emit('notification:show', notification);
			await this.$store.dispatch('admin/getUsers');
		}
		this.$emit('close');
	}

	showDeleteModal() {
		this.isDeleteModalVisible = true;
	}

	async confirmDeleteUser() {
		let result = await this.$store.dispatch('admin/deleteUser', this.user.id);
		if (result.hasError) {
			const notification = generateNotificationError(result.message);
			eventBus.$emit('notification:show', notification);
		} else {
			await this.$store.dispatch('admin/getUsers');
		}
		this.isDeleteModalVisible = false;
		this.$emit('close');
	}

	async resetPassword() {
		const result = await this.$store.dispatch('admin/resetPassword', {id: this.user.id, email: this.user.email});
		if (result.hasError) {
			const notification = generateNotificationError(result.message);
			eventBus.$emit('notification:show', notification);
		} else {
			const message = `You have successfully reset ${this.user.username}'s password. Provide this temporary password to the user: ${result}`;
			const notification = generateNotificationSuccess(message, 20000);

			eventBus.$emit('notification:show', notification);
		}
		this.isResetPasswordModalVisible = false;
		this.$emit('close');
	}

}

</script>

<style lang="scss">

.eaasi-user-modal {

	h3 {
		font-weight: 300;
		margin-bottom: 3rem;
	}

	.eaasi-form {
		padding: 0 2rem 2rem;
	}

	.user-roles {
		margin-bottom: 3rem;
	}

	.bottom-btn-wrapper {

		.btn-wrapper {
			margin: 3rem 0;
		}
	}

	@media screen and (max-width: 800px) {
		.user-roles {
			.descriptive-radios.row {
				gap: 20px;

				.col-sm-6 {
					width: -webkit-fill-available;
				}
			}
		}
	}
}
</style>