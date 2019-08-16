<template>
	<div class="user-list">
		<table class="eaasi-table clickable">
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
					<td>{{ u.lastLogin || 'Never' }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import { IEaasiRole, IEaasiUser } from 'eaasi-auth';
import User from '@/models/auth/User';
import { IEaasiSearchQuery } from 'eaasi-http';
import { SortHeader } from '@/components/global';

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

	@Get('users/roles')
	roles: IEaasiRole[]

	@Sync('users/query')
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
		this.$store.dispatch('users/getUsers');
	}

}

</script>

<style lang="scss">

</style>