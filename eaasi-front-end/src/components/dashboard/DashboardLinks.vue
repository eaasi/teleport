<template>
	<div class="db-links-container padded">
		<div class="db-links-column">
			<large-button
				label="All resources"
				block
				size="sm"
				@click="goToExploreResources"
			/>
			<large-button
				label="My resources"
				block
				size="sm"
				@click="goToMyResources"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import User from '@/models/admin/User';
import DashboardResourceList from '@/components/dashboard/DashboardResourceList.vue';
import ResourceList from '@/components/resources/ResourceList.vue';
import { IBookmark } from '@/types/Bookmark';
import { IResourceSearchResponse } from '@/types/Search';
import { Component, Vue } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';

@Component({
	name: 'DashboardLinks',
	components: {
		ResourceList,
		DashboardResourceList
	}
})
export default class DashboardLinks extends Vue {
	goToExploreResources() {
		this.$router.push({ name: 'Explore Resources' });
	}

	goToMyResources() {
		this.$router.push({ name: 'My Resources' });
	}

	@Get('loggedInUser')
	user: User;

	@Get('resource/result')
	bentoResult: IResourceSearchResponse;

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	async search() {
		await this.$store.dispatch('bookmark/getBookmarks', this.user.id);
		await this.$store.dispatch('resource/searchResources', this.bookmarks);
	}

	mounted() {
		this.search();
	}
}
</script>

<style lang="scss">
	.db-links-container {
		padding-left: 2.4rem;
		padding-right: 2.4rem;

		.db-links-column {
			display: flex;
			flex-direction: row;

			.eb-wrapper {
				max-width: 250px;
				margin-right: 40px;
			}
		}

		.db-links-btn {
			margin: 1.2rem 0;
		}

		&.padded {
			padding: 2rem 3.4rem;
		}
	}
</style>