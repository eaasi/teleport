<template>
	<form-modal
		@close="$emit('close')"
		:title="modalTitle"
		class="eaasi-user-modal"
		@save="saveUser"
	>
		<div class="user-info">
			<h3>User Information</h3>
			<div class="row">
				<text-input
					v-model="user.email"
					label="Organization Email"
					rules="required|email"
					class="col-md-6"
				/>
			</div>

			<div class="row">
				<text-input
					v-model="user.username"
					label="Username"
					rules="required"
					class="col-md-6"
				/>
			</div>
			<div class="name-fields row">
				<text-input
					v-model="user.firstName"
					label="First Name"
					rules="required"
					class="col-md-6"
				/>
				<text-input
					v-model="user.lastName"
					label="Last Name"
					rules="required"
					class="col-md-6"
				/>
			</div>
		</div>

		<div class="user-roles">
			<h3>User Roles & Permissions</h3>
			<descriptive-radios
				:options="radioOptions"
				v-model="user.roleId"
			/>
		</div>
	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiUser, IEaasiRole } from 'eaasi-admin';
import { Get } from 'vuex-pathify';
import FormModal from '@/components/global/forms/FormModal.vue';
import TextInput from '@/components/global/forms/TextInput.vue';
import { IRadioOption } from '@/types/Forms';

@Component({
	name: 'UserModal',
	components: {
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

	get radioOptions(): IRadioOption[] {
		if(!this.roles) return [];
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

.eaasi-user-modal {

	h3 {
		font-weight: 300;
		margin-bottom: 3rem;
	}

	.eaasi-form {
		padding: 0 2rem 2rem;
	}
}
</style>