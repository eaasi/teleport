<template>
	<header id="header" class="flex-row">
		<div class="tablet-header-wrapper">
			<div class="header-h">Reviving histories, ensuring access</div>
			<div id="headerSearch">
				<form @submit.prevent="search">
					<search-bar
						placeholder="Search resources..."
						:border-color="searchBorderColor"
						v-model="searchKeyword"
						name="q"
						role="searchbox"
						@search="search"
						@clear="clearSearchQuery"
					/>
				</form>
			</div>
		</div>
		<div id="headerRight" class="flex flex-end">
			<header-menu-item
				:label="nodeName"
				icon="cog"
				@click="$router.push(manageNodeRoute)"
			/>
			<header-menu-drop-down
				:label="`${user.firstName} ${user.lastName}`"
				icon="user"
			/>
		</div>
	</header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import HeaderMenuItem from './HeaderMenuItem.vue';
import HeaderMenuDropDown from '@/components/layout/header/HeaderMenuDropdown.vue';
import { Get, Sync } from 'vuex-pathify';
import { IEaasiUser } from 'eaasi-admin';
import { jsonCopy } from '@/utils/functions';
import ResourceSearchQuery from '../../../models/search/ResourceSearchQuery';
import { ROUTES } from '@/router/routes.const';

@Component({
	name: 'AppHeader',
	components: {
		HeaderMenuDropDown,
		HeaderMenuItem
	}
})
export default class AppHeader extends Vue {

	/* Data
	============================================*/
	searchBorderColor = '#C7E4F5';
	manageNodeRoute = ROUTES.MANAGE_NODE.ROOT;

	/* Computed
	============================================*/

	@Get('nodeName')
	nodeName: string;

	@Get('loggedInUser')
	user: IEaasiUser;

	@Sync('resource/query@keyword')
	searchKeyword: string;

	/* Methods
	============================================*/

	clearSearchQuery() {
		this.searchKeyword = '';
		this.search();
	}

	async search() {
		const keyword = this.searchKeyword;
		if (this.$route.path === ROUTES.RESOURCES.EXPLORE) {
			await this.$store.dispatch('resource/searchResources');
		} else {
			const query = new ResourceSearchQuery();
			this.$store.commit('resource/SET_QUERY', {...query, keyword});
			this.$router.push({ name: 'Explore Resources', params: { keyword } });
		}
	}
};
</script>

<style lang="scss">
#header {
	background-color: #FFFFFF;
	border: 2px solid $green;
	height: $headerHeight;
	left: 156px;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 10;

	.tablet-header-wrapper {
		display: flex;
		align-items: center;
		height: -webkit-fill-available;
		width: -webkit-fill-available;
	}

	.header-h {
		font-weight: 700;
		font-size: large;
		color: $black;
		border-right: 2px solid $green;
		height: 100%;
		width: 100%;
		padding: 0 20px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
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
	width: fit-content;

	.eaasi-search-bar {
		margin-bottom: 0;
		width: fit-content;
	}
}

@media screen and (max-width: 950px) {
	#header {
		display: flex;
		flex-direction: column;
		left: 126px;

		.header-h {
			font-size: medium;
			border-right: none;
		}

		.tablet-header-wrapper {
			border-bottom: 2px solid $green;
		}
	}
}

</style>