<template>
	<section id="userManagement">
		<div class="user-search">
			<h1>Node Users</h1>
			<search-bar
				:border-color="$colors.lightNeutral"
				placeholder="Enter a search term..."
				v-model="query.keyword"
			>
				<div slot="left">
					<i class="fal fa-search"></i>
				</div>
			</search-bar>
		</div>
		<div class="padded" v-if="list">
			<pagination
				:total-results="(list.total_pages * query.limit)"
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
import { SearchBar } from '@/components/forms';
import { Pagination, UiButton } from '@/components/global';
import User from '@/models/auth/User';
import UserList from './UserList.vue';
import UserModal from './UserModal.vue';
import { Get, Sync } from 'vuex-pathify';
import { IEaasiSearchQuery, IEaasiSearchResponse } from 'eaasi-http';
import { IEaasiUser } from 'eaasi-auth';
import { jsonCopy } from '@/utils/functions';

@Component({
	name: 'UserManagement',
	components: {
		Pagination,
		SearchBar,
		UserList,
		UserModal,
		UiButton
	}
})
export default class UserManagement extends Vue {

	/* Props
	============================================*/

	@Prop({type: Boolean, required: false})
	readonly showCreateModal: boolean

	/* Computed
	============================================*/

	@Sync('users/activeUser')
	activeUser: User

	@Get('users/query')
	query: IEaasiSearchQuery

	@Sync('users/usersResult')
	list: IEaasiSearchResponse<User>

	/* Methods
	============================================*/

	getUsers() {
		this.$store.dispatch('users/getUsers');
		this.$store.dispatch('users/getRoles');
	}

	init() {
		this.$store.commit('global/SET_ADMIN_MENU_OPEN', true);
		this.getUsers();
	}

	paginate(page: number) {
		this.query.page = page;
		this.search();
	}

	search() {
		this.$store.dispatch('users/getUsers');
	}

	setActiveUser(user: IEaasiUser) {
		this.activeUser = jsonCopy(user);
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.init();
	}

	beforeDestroy() {
		this.$store.commit('global/SET_ADMIN_MENU_OPEN', false);
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

	.fa-search {
		color: darken($light-neutral, 80%);
		font-size: 1.4rem;
		margin: 0 0.6rem;
	}
}

.user-pagination {
	margin-bottom: 2rem;
}
</style>
