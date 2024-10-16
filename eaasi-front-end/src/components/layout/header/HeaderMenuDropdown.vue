<template>
	<div class="header-menu-dropdown flex-row" @mouseleave="isDropDownVisible = false" v-bind="$attrs">
		<div class="hmd-user" @click="isDropDownVisible = !isDropDownVisible">
			<div class="user-name">{{ label }}</div>
			<span v-if="icon" :class="`icon fas fa-fw fa-${icon}`"></span>
		</div>

		<transition name="fade">
			<ul class="hmd-list" v-show="isDropDownVisible">
				<li class="hmd-list-item flex flex-row justify-between" @click="isNodePreferencesModalVisible = true">
					<span>Keyboard Preferences</span>
					<span class="icon fas fa-fw fa-edit"></span>
				</li>
				<li v-if="allowChangePassword" class="hmd-list-item flex flex-row justify-between" @click="changePassword">
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
		<node-preferences-modal
			v-if="isNodePreferencesModalVisible"
			@close="isNodePreferencesModalVisible = false"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import { IEaasiUser } from 'eaasi-admin';
import config from '../../../config';
import ChangePasswordModal from './ChangePasswordModal.vue';
import NodePreferencesModal from './NodePreferencesModal.vue';

@Component({
	name: 'HeaderMenuDropDown',
	components: {
		ChangePasswordModal,
		NodePreferencesModal
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
	isNodePreferencesModalVisible: boolean = false;

	/* Methods
	============================================*/

	async logOut() {
		await this.$store.dispatch('logout');
	}

	changePassword() {
		window.location.href = (window as any).keycloak.createAccountUrl() + '#/security/signingin';
	}
}

</script>

<style lang="scss">
.header-menu-dropdown {
	color: $dark-light-grey;
	cursor: pointer;
	height: $headerHeight;
	margin-right: 1.2rem;
	padding: 0 2rem;
	position: relative;

	.hmd-user {
		display: flex;
		align-items: center;
		.user-name {
			width: max-content;
		}
	}

	.hmd-user .icon,
	.hmd-list .icon {
		color: $dark-light-grey;
		font-size: 2rem;
		margin-left: 5px;
	}

	.down-arrow {
		color: $dark-light-grey;
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
		border-bottom: 1px solid $dark-light-grey;
		min-width: 15rem;
		padding: 1.6rem;
		z-index: 2;
	}

	.hmd-list-item:hover {
		background-color: $medium-grey;
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