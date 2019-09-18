<template>
	<form-modal
		@close="$emit('close')"
		:title="modalTitle"
		class="eaasi-user-modal"
		@save="saveUser"
	>
		<div class="user-info">
			<h3>User Information</h3>
			<text-input
				v-model="user.email"
				label="Organization Email"
				rules="required|email"
				class="col-6"
			/>
			<text-input
				v-model="user.username"
				label="Username"
				rules="required"
				class="col-6"
			/>
			<div class="flex-grid name-fields">
				<text-input
					v-model="user.firstName"
					label="First Name"
					rules="required"
					class="col-6"
				/>
				<text-input
					v-model="user.lastName"
					label="Last Name"
					rules="required"
					class="col-6"
				/>
			</div>
		</div>

		<div class="user-roles">
			<h3>User Roles & Permissions</h3>
			<div class="flex justify-between">
				<descriptive-selector
					:selectable-option="mapToSelectable(role)"
					v-for="role in roles"
					:key="role.id"
					v-model="user.roleId"
					class="col-4"
				/>
			</div>
		</div>
	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiUser, IEaasiRole } from 'eaasi-admin';
import { Get } from 'vuex-pathify';
import DescriptiveSelector from '@/components/global/forms/DescriptiveSelector.vue';
import FormModal from '@/components/global/forms/FormModal.vue';
import TextInput from '@/components/global/forms/TextInput.vue';

@Component({
	name: 'UserModal',
	components: {
		DescriptiveSelector,
		TextInput,
		FormModal
	}
})
export default class UserModal extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IEaasiUser, required: true})
	readonly user: IEaasiUser

	/* Computed
	============================================*/

	@Get('admin/roles')
	roles: IEaasiRole[]

	get isNew() {
		return !this.user.id;
	}

	get modalTitle() {
		return this.isNew ? 'Create New User' : 'Edit User';
	}

	mapToSelectable(role) {
		return {
			id: role.id,
			title: role.roleName,
			description: role.roleDescription
		};
	}

	/* Methods
	============================================*/

	/**
	 * Posts or puts the user via REST API and retreives update user list
	 */
	async saveUser() {
		let success = await this.$store.dispatch('admin/saveUser', this.user);
		if(!success) return;
		this.$store.dispatch('admin/getUsers');
		this.$emit('close');
	}

}

</script>

<style lang="scss">
.user-info,
.user-roles {
	margin: 2rem;
}

.eaasi-user-modal {

	h3 {
		font-weight: 300;
		margin-bottom: 3rem;
	}
}
</style>