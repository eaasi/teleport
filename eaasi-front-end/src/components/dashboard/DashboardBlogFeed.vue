<template>
	<div class="bf-container">
		<div id="bf-header">
			{{ blogTitle }}
		</div>
		<div style="padding: 2.4rem;">
			<row>
				<column size="4" v-for="entry in blogArticles" :key="entry.title">
					<dashboard-blog-entry :entry="entry" />
				</column>
			</row>
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
		min-height: 30vh;
		border-top: 2px solid $green;
		padding: 1.5rem 0;

		#bf-header {
			font-size: 2.2rem;
			padding: 2.4rem 02.4rem;
			width: 100%;

			.bf-description {
				font-size: 1.8rem;
				margin-top: 1.2rem;
			}
		}
	}

</style>