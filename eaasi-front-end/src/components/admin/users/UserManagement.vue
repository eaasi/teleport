<template>
	<section id="userManagement" v-if="isViewable">
		<div class="user-search">
			<h1>Node Users</h1>
		</div>
		<div class="padded" v-if="list">
			<pagination
				:total-results="list.totalResults"
				:results-per-page="query.limit"
				:page-num="query.page"
				@paginate="paginate"
				class="user-pagination"
			/>
			<user-list :users="list.result" @rowClick="setActiveUser" />
		</div>
		<user-modal v-if="activeUser" :user="activeUser" :old-role-id="activeUserRoleId" @close="setActiveUser(null)" />
	</section>
</template>

<script lang="ts">
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import { Get, Sync } from 'vuex-pathify';
import { Component, Prop } from 'vue-property-decorator';
import { jsonCopy } from '@/utils/functions';
import { IEaasiSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { IEaasiUser } from 'eaasi-admin';
import AdminScreen from '@/components/admin/AdminScreen.vue';
import Pagination from '@/components/global/Pagination.vue';
import User from '@/models/admin/User';
import UserList from './UserList.vue';
import UserModal from './UserModal.vue';

@Component({
	name: 'UserManagement',
	components: {
		UserList,
		UserModal,
		Pagination,
	}
})
export default class UserManagement extends AdminScreen {

	/* Props
	============================================*/

	@Prop({type: Boolean, required: false})
	readonly showCreateModal: boolean;

	/* Data
	============================================*/
	activeUserRoleId: number = null;

	/* Computed
	============================================*/

	@Sync('admin/activeUser')
	activeUser: IEaasiUser;

	@Get('admin/usersQuery')
	query: IEaasiSearchQuery;

	@Sync('admin/usersResult')
	list: IEaasiSearchResponse<User>;

	@Get('permissions')
	permit: PermissionResolver;

	get isViewable(): boolean {
		return this.permit.allowsManageOrganizationUsers();
	};

	/* Methods
	============================================*/

	getUsers() {
		this.$store.dispatch('admin/getUsers');
		this.$store.dispatch('admin/getRoles');
	}

	init() {
		this.getUsers();
	}

	paginate(page: number) {
		this.query.page = page;
		this.search();
	}

	search() {
		this.$store.dispatch('admin/getUsers');
	}

	setActiveUser(user: IEaasiUser) {
		this.activeUser = user ? user.copy() : null;
		if (user) {
			this.activeUserRoleId = jsonCopy(user.roleId);
		}
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.init();
	}

}
</script>

<style lang="scss">
#userManagement {
	.user-search {
		background-color: $grey;
		padding: 5rem 5rem 2.5rem;

		h1 {
			font-size: 1.8rem;
		}
	}

	.user-pagination {
		margin-bottom: 2rem;
	}

	.user-list {
		overflow: auto;
		width: -webkit-fill-available;
	}

	@media screen and (max-width: 1050px) {
		width: 600px;
	}

	@media screen and (max-width: 1000px) {
		width: 500px;
	}

	@media screen and (max-width: 950px) {
		width: 450px;
	}

	@media screen and (max-width: 900px) {
		width: 400px;
	}
}
</style>
