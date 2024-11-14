<template>
	<div class="dashboard-container">
		<dashboard-header />
		<dashboard-blog-feed />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import DashboardBlogFeed from '@/components/dashboard/DashboardBlogFeed.vue';
import EaasiIcon from '@/components/global/icons/EaasiIcon.vue';

@Component({
	name: 'Dashboard',
	components: {
		DashboardHeader,
		DashboardBlogFeed,
		EaasiIcon,
	}
})
export default class Dashboard extends Vue {
}
</script>

<style lang="scss">
.dashboard-container {
	height: 100%;
}
</style>