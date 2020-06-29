<template>
	<form-modal
		ref="_form"
		size="sm"
		title="Change My Password"
		@save="changePassword"
		@close="$emit('close')"
		@click:cancel="$emit('close')"
		:error="error"
	>
		<text-input
			label="Current Password"
			v-model="request.password"
			type="password"
			rules="required"
		/>
		<text-input
			label="New Password"
			v-model="request.newPassword"
			type="password"
			rules="required"
		/>
		<text-input
			label="Confirm New Password"
			v-model="request.newPasswordConfirm"
			type="password"
			:rules="(val) => confirmRules(val)"
		/>
		<alert-card type="error" v-if="error">
			{{ error }}
		</alert-card>
	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IChangePasswordRequest } from '@/types/Auth';
import { EaasiForm } from '@/components/global';
import AuthService from '@/services/AuthService';
import { generateNotificationSuccess } from '@/helpers/NotificationHelper';
import eventBus from '@/utils/event-bus';

@Component({
	name: 'ChangePasswordModal',
})
export default class ChangePasswordModal extends Vue {

	$refs!: {
		_form: EaasiForm
	};

	/* Props
	============================================*/

	/* Data
	============================================*/

	error: string = null;
	request: IChangePasswordRequest = {
		password: '',
		newPassword: '',
		newPasswordConfirm: '',
	}

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	confirmRules(value: string): string | boolean {
		if(!value || this.request.newPassword !== value) {
			return 'Does not match new password';
		}
		return null;
	}

	async changePassword() {
		this.error = null;
		let res = await AuthService.changePassword(this.request);
		if(!res) {
			this.error = 'An error occurred. Please double-check your current password and try again.';
			return;
		}
		eventBus.$emit('notification:show', generateNotificationSuccess('Password updated successfully.'));
		this.$emit('close');
	}

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>