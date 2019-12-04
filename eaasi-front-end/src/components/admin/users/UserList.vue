<template>
	<div class="user-list">
		<table class="eaasi-table clickable">
			<caption>List of Users by Username, Email, First Name, Last Name, Role, and Last Login</caption>
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
				</tr>
			</thead>
			<tbody>
				<tr v-for="u in users" :key="u.id" @click="$emit('rowClick', u)">
					<td>{{ u.username }}</td>
					<td>{{ u.email }}</td>
					<td>{{ u.firstName }}</td>
					<td>{{ u.lastName }}</td>
					<td>{{ getRole(u) }}</td>
					<td>{{ u.lastLogin || 'Unknown' }}</td>
				</tr>
			</tbody>
		</table>
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

@Component({
	name: 'UserList',
	components: {
		SortHeader
	}
})
export default class UserList extends Vue {

	/* Props
	============================================*/

	@Prop({type: Array, required: true})
	readonly users: User[]

	/* Computed
	============================================*/

	@Get('admin/roles')
	roles: IEaasiRole[]

	@Sync('admin/usersQuery')
	query: IEaasiSearchQuery

	/* Methods
	============================================*/

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

</style>