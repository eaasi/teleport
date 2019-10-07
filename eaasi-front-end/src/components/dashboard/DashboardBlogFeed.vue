<template>
	<div class="bf-container">
		<div id="bf-header">
			EaaSI Blog
		</div>
		<div class="bf-articles">
			<dashboard-blog-entry
				v-for="entry in placeholderEntries"
				:entry="entry"
				:key="entry.title"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RssService from '@/services/RssService';
import {IBlogEntry} from '@/types/IBlogEntry';
import DashboardBlogEntry from '@/components/dashboard/DashboardBlogEntry.vue';

let rssService = RssService;

@Component({
	name: 'DashboardBlogFeed',
	components: {DashboardBlogEntry}
})
export default class DashboardBlogFeed extends Vue {

	buildBlogFeed() {
		rssService.getBlogFeed().then(res => {
			console.log(res);
		});
	}

	created() {
		this.buildBlogFeed();
	}

	placeholderEntries: IBlogEntry[] = [
		{
			title: 'Who Preserves EaaSI?: In Pursuit of an EaaSI Preservation Package',
			date: Date.now(),
			link: '',
			topics: []
		},
		{
			title: 'Who Preserves EaaSI?: In Pursuit of an EaaSI Preservation Package Lorem Ipsum Dolor Sit Amet, Consectetur, Lorem Ipsum Dolor',
			date: Date.now(),
			link: '',
			topics: []
		},
		{
			title: 'Who Preserves EaaSI?: In Pursuit of an EaaSI Preservation Package.  Lorem Ipsum',
			date: Date.now(),
			link: '',
			topics: []
		},
	]
}
</script>

<style lang="scss">
	.bf-container {
		background-color: lighten($teal, 90%);
		min-height: 45vh;
		padding: 1.5rem;

		#bf-header {
			border-bottom: 2px solid lighten($teal, 60%);
			font-size: 2.2rem;
			padding: 2.4rem 0;
			width: 100%;
		}

		.bf-articles {
			display: flex;
		}
	}

</style>