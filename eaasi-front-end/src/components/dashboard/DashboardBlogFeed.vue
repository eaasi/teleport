<template>
	<div class="bf-container">
		<div id="bf-header">
			EaaSI Blog
		</div>
		<div class="bf-articles">
			Articles here
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RssService from '@/services/RssService';

let rssService = RssService;

@Component({
	name: 'DashboardBlogFeed'
})
export default class DashboardBlogFeed extends Vue {
	getArticles() {
		rssService.getLatestBlogArticles();
	}

	created() {
		this.getArticles();
	}
}
</script>

<style lang="scss">
	.bf-container {
		background-color: lighten($light-blue, 90%);
		padding: 1.5rem;

		#bf-header {
			border-bottom: 1 px solid lighten($dark-blue, 20%);
			font-size: 2.2rem;
			padding: 2.4rem 0;
		}
	}
</style>