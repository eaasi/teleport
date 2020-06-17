<template>
	<div class="header-menu-dropdown flex-row" @mouseleave="isDropDownVisible = false">
		<div class="hmd-user" @click="isDropDownVisible = !isDropDownVisible">
			<span>{{ label }}</span>
			<span v-if="icon" :class="`icon fas fa-fw fa-${icon}`"></span>
		</div>

		<transition name="fade">
			<ul class="hmd-list" v-show="isDropDownVisible">
				<li v-if="allowResetPassword" class="hmd-list-item flex flex-row justify-between" @click="isResetPasswordModalVisible = true">
					<span>Reset Password</span>
					<span class="icon fas fa-fw fa-key"></span>
				</li>
				<li class="hmd-list-item flex flex-row justify-between" @click="logOut">
					<span>Log Out</span>
					<span class="icon fas fa-fw fa-sign-out"></span>
				</li>
			</ul>
		</transition>

		<confirm-modal
			cancel-label="Cancel"
			confirm-label="Reset Password"
			title="Reset Password"
			v-if="isResetPasswordModalVisible"
			@close="isResetPasswordModalVisible = false"
			@click:confirm="resetPassword"
		>
			<alert card type="warning" v-if="user">
				<div class="delete-message">
					You are about to reset your password
				</div>
				<div class="delete-message">
					This will reset your password and send a new password to your email.
					This action cannot be undone.
				</div>
			</alert>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import authService from '@/services/AuthService';
import { Get } from 'vuex-pathify';
import { IEaasiUser } from 'eaasi-admin';
import { generateNotificationSuccess, generateNotificationError } from '../../../helpers/NotificationHelper';
import eventBus from '../../../utils/event-bus';
import config from '../../../config';

@Component({
	name: 'HeaderMenuDropDown'
})
export default class HeaderMenuDropdown extends Vue {

	/* Props
	============================================*/

	/**
	 * The text to display in the trigger element
	 */
	@Prop({type: String, required: true})
	readonly label: string;

	/**
	 * The icon to display in the trigger element
	 */
	@Prop({type: String, required: false})
	readonly icon: string;

	/* Computed
	============================================*/

	@Get('loggedInUser')
	user: IEaasiUser;

	/* Data
	============================================*/

	isDropDownVisible: boolean = false;
	isResetPasswordModalVisible: boolean = false;
	allowResetPassword: boolean = !config.SAML_ENABLED;

	/* Methods
	============================================*/

	async logOut() {
		await this.$store.dispatch('logout');
	}

	async resetPassword() {
		const success = await this.$store.dispatch('admin/resetPassword', this.user.email);
		this.isResetPasswordModalVisible = false;
		const notification = success
			? generateNotificationSuccess('You successfully reset your password.')
			: generateNotificationError('Something went wrong, please try again.');
		eventBus.$emit('notification:show', notification);
		this.$emit('close');
	}

}

</script>

<style lang="scss">
.header-menu-dropdown {
	color: darken($grey, 30%);
	cursor: pointer;
	height: $headerHeight;
	margin-right: 1.2rem;
	padding: 0 2rem;
	position: relative;

	.hmd-user .icon,
	.hmd-list .icon {
		color: $dark-neutral;
		font-size: 2rem;
		margin-left: 5px;
	}

	.down-arrow {
		color: darken($teal, 20%);
		font-size: 1.2rem;
		margin-left: 5px;
	}

	ul {
		padding: 0;
	}
}

.hmd-list {
	background: #ffffff;
	list-style: none;
	position: absolute;
	right: 0;
	top: 64px;

	.hmd-list-item {
		border: 1px solid $light-neutral;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		min-width: 15rem;
		padding: 1.6rem;
		z-index: 2;
	}

	.hmd-list-item:hover {
		background-color: lighten($light-blue, 90%);
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

</style>