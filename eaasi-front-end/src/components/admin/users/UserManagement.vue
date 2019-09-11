<template>
	<section id="userManagement">
		<div class="user-search">
			<h1>Node Users</h1>
			<search-bar
				:border-color="$colors.lightNeutral"
				placeholder="Enter a name or email address"
				v-model="query.keyword"
			/>
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
		<user-modal v-if="activeUser" :user="activeUser" @close="setActiveUser(null)" />
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import User from '@/models/admin/User';
import UserList from './UserList.vue';
import UserModal from './UserModal.vue';
import { Get, Sync } from 'vuex-pathify';
import { IEaasiSearchQuery, IEaasiSearchResponse } from 'eaasi-http';
import { IEaasiUser } from 'eaasi-admin';
import { jsonCopy } from '@/utils/functions';
import AdminScreen from '../AdminScreen.vue';

@Component({
	name: 'UserManagement',
	components: {
		UserList,
		UserModal
	}
})
export default class UserManagement extends AdminScreen {

	/* Props
	============================================*/

	@Prop({type: Boolean, required: false})
	readonly showCreateModal: boolean

	/* Computed
	============================================*/

	@Sync('admin/activeUser')
	activeUser: User

	@Get('admin/usersQuery')
	query: IEaasiSearchQuery

	@Sync('admin/usersResult')
	list: IEaasiSearchResponse<User>

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
		this.activeUser = jsonCopy(user);
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.init();
	}

}
</script>

<style lang="scss">
.user-search {
	background-color: lighten($light-neutral, 60%);
	padding: 5rem 5rem 2.5rem;

	h1 {
		font-size: 1.8rem;
	}
}

.user-pagination {
	margin-bottom: 2rem;
}
</style>
