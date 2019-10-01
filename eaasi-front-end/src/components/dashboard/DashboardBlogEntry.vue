<template>
	<div class="entry-bg-trim">
		<div class="entry-container">
			<div class="entry-header">
				[ Topics ] | [ Date ]
			</div>
			<div class="entry-title">
				<a href="" target="_blank">
					{{ entry.title }}
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';
import {IBlogEntry} from '@/types/IBlogEntry';


@Component({
	name: 'DashboardBlogEntry'
})
export default class DashboardBlogEntry extends Vue {
	@Prop({ type: Object as () => IBlogEntry})
	entry: IBlogEntry;
}
</script>

<style lang="scss">

	.entry-container {
		background-color: #FFFFFF;
		border-top-right-radius: 8px;
		line-height: 2.4rem;
		position: relative;
		top: 48px;
		width: 350px;

		.entry-header {
			background-color: lighten($light-neutral, 50%);
			border-left: 6px solid $teal;
			border-top-right-radius: 8px;
			font-size: 1.5rem;
			padding: 1.1rem;
		}

		.entry-title {
			font-size: 1.9rem;
			padding: 2.8rem 1.6rem 4rem 1.6rem;

			a {
				color: $dark-blue;
				text-decoration: none;
			}
		}
	}

	.entry-bg-trim {
		background: #000000 url('../../assets/login-bg.png') center;
		height: 200px;
		margin: 1.8rem;
		position: relative;
		width: 380px;
	}

</style>