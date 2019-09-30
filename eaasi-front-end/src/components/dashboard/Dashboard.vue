<template>
	<div class="dashboard-container padded-lg">
		<dashboard-header />
		<dashboard-links />
		<dashboard-blog-feed />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import DashboardLinks from '@/components/dashboard/DashboardLinks.vue';
import DashboardBlogFeed from '@/components/dashboard/DashboardBlogFeed.vue';

@Component({
	name: 'Dashboard',
	components: {
		DashboardHeader,
		DashboardLinks,
		DashboardBlogFeed
	}
})
export default class Dashboard extends Vue {
}
</script>

<style>
	.dashboard-container {

	}
</style>