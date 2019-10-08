<template functional>
	<div class="dbe-container">
		<div class="entry-bg-trim">
			<div class="entry-container">
				<div class="entry-header">
					<span id="categories">{{ props.entry.categories.join(', ') }}</span>
					|
					<span id="date">{{ props.entry.pubDate }}</span>
				</div>
				<div class="entry-title">
					<a :href="props.entry.link" target="_blank">
						{{ props.entry.title }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';
import {IBlogArticleLink} from '@/types/RssFeed';


@Component({
	name: 'DashboardBlogEntry'
})
export default class DashboardBlogEntry extends Vue {

	@Prop({ type: Object as () => IBlogArticleLink})
	entry: IBlogArticleLink;
}
</script>

<style lang="scss">

	.dbe-container {
		display: inline-block;
	}

	.entry-bg-trim {
		background: #000000 url('~@/assets/login-bg.png') center;
		height: 200px;
		margin: 1.8rem;
		position: relative;
		width: 380px;
	}

	.entry-container {
		background-color: #FFFFFF;
		border-top-right-radius: 1.2rem;
		line-height: 2.4rem;
		position: relative;
		top: 4.8rem;
		width: 350px;

		.entry-header {
			background-color: lighten($light-neutral, 50%);
			border-left: 0.4rem solid $teal;
			border-top-right-radius: 4rem;
			font-size: 1.5rem;
			padding: 1.1rem;

			#date {
				font-size: 1.2rem;
			}

			#categories {
				font-size: 1.4rem;
			}
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

</style>