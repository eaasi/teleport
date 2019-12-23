<template>
	<header id="header" class="flex-row">
		<div id="headerSearch" class="flex-grow">
			<form @submit.prevent="search">
				<search-bar
					placeholder="Search resources..."
					:border-color="searchBorderColor"
					v-model="searchKeyword"
					name="q"
					role="search"
					@search="search"
				/>
			</form>
		</div>
		<div id="headerRight" class="flex flex-end">
			<header-menu-item
				:label="nodeName"
				icon="cog"
				@click="$router.push('/admin')"
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
import { jsonCopy } from '../../../utils/functions';
import ResourceSearchQuery from '../../../models/search/ResourceSearchQuery';


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

	async search() {
		const keyword = this.searchKeyword;
		this.$store.dispatch('resource/clearSearchQuery');
		if (this.$route.name === 'Explore Resources') {
			const query = new ResourceSearchQuery();
			this.$store.commit('resource/SET_QUERY', {...query, keyword});
			await this.$store.dispatch('resource/searchResources');
		} else {
			this.$router.push({ name: 'Explore Resources', params: { keyword } });
		}
	}
};
</script>

<style lang="scss">
#header {
	background-color: #FFFFFF;
	border-bottom: 1px solid darken($light-neutral, 10%);
	height: $headerHeight;
	left: $leftSidebarWidth;
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