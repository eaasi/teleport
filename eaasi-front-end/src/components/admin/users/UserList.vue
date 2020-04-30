<template>
	<div class="user-list" v-if="isViewable">
		<table
			id="node-user-table"
			class="eaasi-table"
			aria-label="Table of registered users for this EaaSI node"
			:aria-rowcount="users.length"
		>
			<thead>
				<tr>
					<sort-header sort-col="username" :query="query" @sort="sort">
						Username
					</sort-header>
					<sort-header sort-col="roleId" :query="query" @sort="sort">
						Role
					</sort-header>
					<sort-header sort-col="lastLogin" :query="query" @sort="sort">
						Last Login
					</sort-header>
					<td>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="u in users" :key="u.id">
					<td>{{ u.username }}</td>
					<td>{{ getRole(u) }}</td>
					<td v-if="u.lastLogin">{{ u.lastLogin | js-date-pretty-format }}</td>
					<td v-else>Unknown</td>
					<td class="details-cell">
						<span
							class="details-btn clickable"
							@click="editUser(u)"
						>
							DETAILS
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import PermissionResolver from '@/services/Permissions/PermissionResolver';
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
	get isViewable(): boolean {
		if (!this.currentUser) return false;
		return this.permit.allowsManageNodeUsers();
	};

	@Get('loggedInUser')
	currentUser: IEaasiUser;

	@Get('permissions')
	permit: PermissionResolver;

	@Get('admin/roles')
	roles: IEaasiRole[];

	@Sync('admin/usersQuery')
	query: IEaasiSearchQuery;

	/* Methods
	============================================*/

	editUser(u: User) {
		this.$emit('rowClick', u);
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

}

</script>

<style lang="scss">
	#node-user-table {
		max-width: 800px;
	}

	.details-cell {
		color: $dark-blue;
		text-align: center;
		transition: background-color 0.2s, color 0.2s;

		.details-btn {
			border-radius: 4px;
			font-weight: bold;
			padding: 1rem 2rem;
			transition: background-color 0.2s, color 0.2s;

			&:hover {
				background-color: #ffffff;
				transition: background-color 0.2s, color 0.2s;
			}
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