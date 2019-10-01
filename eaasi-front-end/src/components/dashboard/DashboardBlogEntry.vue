<template>
	<div class="bfe-container">
	</div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';
import RssService from '@/services/RssService';


@Component({
	name: 'DashboardBlogEntry'
})
export default class DashboardBlogEntry extends Vue {
	@Prop({ type: String })
	title: string;

	@Prop({ type: String })
	date: string;

	@Prop({ type: Array })
	tags: string[];

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