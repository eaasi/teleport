<template>
	<header id="header" class="flex-row">
		<div id="headerSearch" class="flex-grow">
			<form @submit.prevent="search">
				<search-bar
					placeholder="Enter a search term..."
					v-model="searchKeyword"
					name="q"
					role="search"
				/>
			</form>
		</div>
		<div id="headerRight" class="flex flex-end">
			<!-- TODO: What does the user item do? -->
			<header-menu-item
				:label="`${user.firstName} ${user.lastName}`"
				icon="user"
				@click="logout"
			/>
			<header-menu-item
				:label="nodeName"
				icon="cog"
				@click="$router.push('/admin')"
			/>
		</div>
	</header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import HeaderMenuItem from './HeaderMenuItem.vue';
import { Get, Sync } from 'vuex-pathify';
import { IEaasiUser } from 'eaasi-admin';
import authService from '@/services/AuthService';


@Component({
	name: 'AppHeader',
	components: {
		HeaderMenuItem
	}
})
export default class AppHeader extends Vue {

	/* Computed
	============================================*/

	@Get('nodeName')
	nodeName: string

	@Sync('search/keyword')
	searchKeyword: string

	@Get('loggedInUser')
	user: IEaasiUser

	/* Methods
	============================================*/

	/**
	 * Route to search page with query string
	 */
	search(): void {
		this.$router.push(`/search?q=${this.searchKeyword}`);
	}

	/**
	 * Logs out a User
	 */
	logout() {
		this.$store.dispatch('logout');
		authService.logout();
	}
};
</script>

<style lang="scss">
#header {
	background-color: $teal;
	height: $headerHeight;
	left: $leftSidebarWidth;
	outline: solid 2px darken($teal, 59%);
	position: fixed;
	right: 0;
	top: 0;
	z-index: 10;
}

#headerRight {

	a {
		display: block;
		padding: 1rem;
		text-decoration: none;
	}
}

#headerSearch {
	padding: 0 2rem;

	.eaasi-search-bar {
		margin-bottom: 0;
		max-width: 70rem;
	}
}

</style>