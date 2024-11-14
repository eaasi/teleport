<template>
	<div class="bf-container">
		<div id="bf-header">
			{{ blogTitle }}
		</div>
		<div class="dashboard-blog-entry-row">
			<div class="dashboard-blog-entry-item" v-for="entry in blogArticles" :key="entry.title">
				<dashboard-blog-entry :entry="entry" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RssService from '@/services/RssService';
import DashboardBlogEntry from '@/components/dashboard/DashboardBlogEntry.vue';
import {IBlogArticleLink} from '@/types/RssFeed';

let rssService = RssService;

@Component({
	name: 'DashboardBlogFeed',
	components: {DashboardBlogEntry}
})
export default class DashboardBlogFeed extends Vue {
	blogTitle: string = '';
	blogArticles: IBlogArticleLink[] = []

	async buildBlogFeed() {
		let res = await rssService.getBlogFeed();
		if(!res) return;
		this.blogTitle = res.blogTitle;
		this.blogArticles = res.articleLinks;
	}

	created() {
		this.buildBlogFeed();
	}
}
</script>

<style lang="scss">
	.bf-container {
		background-color: $light-grey;
		min-height: 25vh;
		border-top: 2px solid $green;
		padding: 1.5rem 0;

		#bf-header {
			font-size: 2.2rem;
			padding: 20px 40px;
			width: -webkit-fill-available;
			font-weight: 700;

			.bf-description {
				font-size: 1.8rem;
				margin-top: 1.2rem;
			}
		}

		.dashboard-blog-entry-row {
			display: flex;
			flex-direction: row;
			margin: 20px 40px;
			gap: 40px;

			.dashboard-blog-entry-item {
				height: auto;
				width: calc(100% / 3);

				.dbe-container {
					width: 100%;
					height: 100%;
					display: flex;
				}
			}
		}
	}

	@media screen and (max-width: 950px) {
		.bf-container {
			.dashboard-blog-entry-row {
				flex-wrap: wrap;
				gap: 20px;

				.dashboard-blog-entry-item {
					width: -webkit-fill-available;
				}
			}
		}
	}
</style>