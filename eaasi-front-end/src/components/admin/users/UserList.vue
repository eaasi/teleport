<template>
	<div class="user-list">
		<table
			class="eaasi-table clickable"
			aria-label="Table of registered users for this EaaSI node"
			:aria-rowcount="users.length"
		>
			<thead>
				<tr>
					<sort-header sort-col="username" :query="query" @sort="sort">
						Username
					</sort-header>
					<sort-header sort-col="email" :query="query" @sort="sort">
						Email
					</sort-header>
					<sort-header sort-col="firstName" :query="query" @sort="sort">
						First Name
					</sort-header>
					<sort-header sort-col="lastName" :query="query" @sort="sort">
						Last Name
					</sort-header>
					<sort-header sort-col="roleId" :query="query" @sort="sort">
						Role
					</sort-header>
					<sort-header sort-col="lastLogin" :query="query" @sort="sort">
						Last Login
					</sort-header>
					<sort-header sort-col="lastLogin" :query="query" @sort="sort">
						Delete User
					</sort-header>
				</tr>
			</thead>
			<tbody>
				<tr v-for="u in users" :key="u.id">
					<td @click="editUser(u)">{{ u.username }}</td>
					<td @click="editUser(u)">{{ u.email }}</td>
					<td @click="editUser(u)">{{ u.firstName }}</td>
					<td @click="editUser(u)">{{ u.lastName }}</td>
					<td @click="editUser(u)">{{ getRole(u) }}</td>
					<td @click="editUser(u)">{{ u.lastLogin || 'Unknown' }}</td>

					<td v-if="currentUser.id != u.id" @click="deleteUser(u)" class="delete-cell">Delete User</td>
					<td v-else class="delete-cell disabled delete-disabled">Delete User</td>
				</tr>
			</tbody>
		</table>
		<confirm-modal
			cancel-label="Cancel"
			confirm-label="Delete User"
			:title="`Delete User: ${userToDelete.username} - ${userToDelete.email}`"
			v-if="isDeleteUserModalActive"
			@close="closeDeleteUserModal"
			@click:confirm="confirmDeleteUser(userToDelete.id)"
		>
			<alert-card type="warning" v-if="userToDelete">
				<div class="delete-message">
					You are about to delete the user <span class="user-to-delete">{{ userToDelete.username }}</span>.
				</div>
				<div class="delete-message">
					This will remove all data associated with the user in the system. Please confirm you would like to continue.
					This action cannot be undone.
				</div>
			</alert-card>
		</confirm-modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import { IEaasiRole, IEaasiUser } from 'eaasi-admin';
import { IEaasiSearchQuery } from '@/types/Search';
import User from '@/models/admin/User';
import SortHeader from '@/components/global/tables/SortHeader.vue';
import ConfirmModal from '@/components/global/Modal/ConfirmModal.vue';

@Component({
	name: 'UserList',
	components: {
		SortHeader, ConfirmModal
	}
})
export default class UserList extends Vue {

	/* Props
	============================================*/

	@Prop({type: Array, required: true})
	readonly users: User[];

	/* Computed
	============================================*/

	@Get('admin/roles')
	roles: IEaasiRole[];

	@Sync('admin/usersQuery')
	query: IEaasiSearchQuery;

	@Get('loggedInUser')
	currentUser: IEaasiUser;

	/* Data
	============================================*/
	isDeleteUserModalActive: boolean = false;
	userToDelete?: User;

	/* Methods
	============================================*/

	editUser(u: User) {
		this.$emit('rowClick', u);
	}

	deleteUser(user: User) {
		this.userToDelete = user;
		this.isDeleteUserModalActive = true;
	}

	closeDeleteUserModal() {
		this.userToDelete = null;
		this.isDeleteUserModalActive = false;
	}

	getRole(user: IEaasiUser) {
		if(!this.roles || !this.roles.length || !user.roleId) return '';
		let role = this.roles.find(x => x.id === user.roleId);
		return role ? role.roleName : '-';
	}

	sort(query: IEaasiSearchQuery) {
		this.query = query;
		this.$store.dispatch('admin/getUsers');
	}

	async confirmDeleteUser(userId: number) {
		await this.$store.dispatch('admin/deleteUser', userId);
		await this.$store.dispatch('admin/getUsers');
		this.isDeleteUserModalActive = false;
	}
}

</script>

<style lang="scss">
	.delete-cell {
		transition: background-color 0.2s, color 0.2s;

		&:hover {
			background-color: $red;
			color: #ffffff;
			transition: background-color 0.2s, color 0.2s;
		}
	}

	.delete-disabled {
		transition: background-color 0.2s, color 0.2s;
		&:hover {
			background-color: lighten($grey, 20%);
			color: darken($grey, 20%);
			transition: background-color 0.2s, color 0.2s;
		}
	}

	.delete-icon {
		color: $red;
		margin: auto;
	}

	.user-to-delete {
		font-weight: bold;
	}

	.delete-message {
		margin-bottom: 1rem;
	}
</style>