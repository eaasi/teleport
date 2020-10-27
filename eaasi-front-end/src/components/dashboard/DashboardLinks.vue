<template>
	<div class="db-links-container padded">
		<div class="row">
			<div class="col-md-4">
				<div class="db-links-column">
					<h2>My Node Activity</h2>
					<div class="db-links-subheading">
						Local resources
					</div>
					<div class="db-links-btn">
						<ui-button
							@click="goToExploreResources"
							icon="chevron-right"
							icon-right
							color-preset="light-blue"
							block
							size="md"
						>
							See ALL Node Resources
						</ui-button>
					</div>
					<dashboard-resource-list
						:result="nodeResources"
					/>
				</div>
			</div>
			<div class="col-md-4">
				<div class="db-links-column">
					<h2>My Resources</h2>
					<div class="db-links-subheading">
						Bookmarked and Imported Resources
					</div>
					<div class="db-links-btn">
						<ui-button
							@click="goToMyResources"
							icon="chevron-right"
							icon-right
							color-preset="light-blue"
							block
							size="md"
						>
							See ALL My Resources
						</ui-button>
					</div>
					<dashboard-resource-list
						:result="myResources"
					/>
				</div>
			</div>
			<div class="col-md-4">
				<div class="db-links-column">
					<h2>Network Activity</h2>
					<div class="db-links-subheading">
						Network Activity on your Node
					</div>
					<div class="db-links-btn">
						<ui-button
							@click="$emit('click:network')"
							icon="chevron-right"
							icon-right
							color-preset="light-blue"
							block
							size="md"
							disabled
						>
							See ALL Network Resources
						</ui-button>
					</div>
				</div>
			</div>
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

	get myResources() {
		if (this.bentoResult) {
			let envResults = this.bentoResult.environments;
			let swResults = this.bentoResult.software;

			let envs = envResults.result.filter(r => this.bookmarks.some(b => b.resourceId === r.envId));
			let software = swResults.result.filter(s => this.bookmarks.some(b => b.resourceId === s.id));
			let myResources = [...envs, ...software];

			return { result: myResources };
		}
		return {};
	}

	get nodeResources() {
		if (this.bentoResult) {
			let envResults = this.bentoResult.environments;
			let envs = envResults.result.filter(r => r.archive === 'default');
			let myResources = [...envs,];

			return { result: myResources };
		}
		return {};
	}

	mounted() {
		this.search();
	}
}
</script>

<style lang="scss">
	.db-links-container {
		background-color: lighten($light-neutral, 82%);
		padding-left: 2.4rem;
		padding-right: 2.4rem;

		.db-links-column {
			display: flex;
			flex-direction: column;
		}

		.db-links-subheading {
			background-color: lighten($light-neutral, 50%);
			border-top: 3px solid darken($light-neutral, 10%);
			font-size: 1.6rem;
			padding: 2.2rem 1.2rem;
		}

		.db-links-btn {
			margin: 1.2rem 0;
		}
	}

</style>