<template>
	<div class="bf-container">
		<div id="bf-header">
			{{ blogTitle }}
		</div>
		<row>
			<column size="4" v-for="entry in blogArticles" :key="entry.title">
				<dashboard-blog-entry :entry="entry" />
			</column>
		</row>
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
		background-color: lighten($teal, 90%);
		min-height: 50vh;
		padding: 1.5rem;

		#bf-header {
			border-bottom: 2px solid lighten($teal, 60%);
			font-size: 2.2rem;
			padding: 2.4rem 0;
			width: 100%;

			.bf-description {
				font-size: 1.8rem;
				margin-top: 1.2rem;
			}
		}
	}

</style>