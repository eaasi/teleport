<template>
	<div class="header-menu-dropdown flex-row" @mouseleave="isDropDownVisible = false">
		<div class="hmd-user" @click="isDropDownVisible = !isDropDownVisible">
			<span>{{ label }}</span>
			<span v-if="icon" :class="`icon fas fa-fw fa-${icon}`"></span>
		</div>

		<transition name="fade">
			<ul class="hmd-list" v-show="isDropDownVisible">
				<li v-if="allowChangePassword" class="hmd-list-item flex flex-row justify-between" @click="isChangePasswordModalVisible = true">
					<span>Change Password</span>
					<span class="icon fas fa-fw fa-key"></span>
				</li>
				<li class="hmd-list-item flex flex-row justify-between" @click="logOut">
					<span>Log Out</span>
					<span class="icon fas fa-fw fa-sign-out-alt"></span>
				</li>
			</ul>
		</transition>
		<change-password-modal
			v-if="isChangePasswordModalVisible"
			@close="isChangePasswordModalVisible = false"
		/>
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
import ChangePasswordModal from './ChangePasswordModal.vue';

@Component({
	name: 'HeaderMenuDropDown',
	components: {
		ChangePasswordModal
	}
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
	isChangePasswordModalVisible: boolean = false;
	allowChangePassword: boolean = !config.SAML_ENABLED;

	/* Methods
	============================================*/

	async logOut() {
		await this.$store.dispatch('logout');
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