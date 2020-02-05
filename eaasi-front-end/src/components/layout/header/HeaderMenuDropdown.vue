<template>
	<div class="header-menu-dropdown flex-row" @mouseleave="isDropDownVisible = false">
		<div class="hmd-user" @click="isDropDownVisible = !isDropDownVisible">
			<span>{{ label }}</span>
			<span v-if="icon" :class="`icon fas fa-fw fa-${icon}`"></span>
		</div>

		<transition name="fade">
			<ul class="hmd-list" v-if="isDropDownVisible">
				<li class="hmd-list-item" @click="logOut">
					Log Out
					<span class="icon fas fa-fw fa-sign-out"></span>
				</li>
			</ul>
		</transition>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import authService from '@/services/AuthService';

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

	/* Data
	============================================*/
	isDropDownVisible: boolean = false;

	/* Methods
	============================================*/

	/**
	 * Logs a User Out
	 */
	async logOut() {
		await authService.logout();
		location.assign('/');
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

	.icon {
		color: darken($teal, 20%);
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
	top: 64px;

	.hmd-list-item {
		border: 1px solid $light-neutral;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		display: block;
		float: left;
		padding: 1.6rem;
		position: relative;
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