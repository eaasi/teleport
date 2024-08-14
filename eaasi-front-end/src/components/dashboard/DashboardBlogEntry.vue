<template functional>
	<div class="dbe-container">
		<div class="entry-container">
			<div class="entry-header">
				<div id="categories">{{ props.entry.categories.join(', ') }}</div>
				<div id="date">{{ props.entry.pubDate }}</div>
			</div>
			<div class="entry-title">
				<a :href="props.entry.link" target="_blank">
					{{ props.entry.title }}
				</a>
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
	.entry-container {
		background-color: $white;
		border: 2px solid $grey;
		line-height: 2.4rem;
		position: relative;
		width: 90%;

		.entry-header {
			font-weight: 600;
			font-size: 1.5rem;
			padding: 1.1rem;

			#date {
				font-weight: 400;
				font-size: 1.2rem;
			}

			#categories {
				font-size: 1.4rem;
			}
		}

		.entry-title {
			font-size: 1.7rem;
			padding: 0 1.1rem 1.1rem 1.1rem;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			height: 50px;

			a {
				color: $green;
				line-height: 1.6em;
				text-decoration: none;
				white-space: normal;
			}
		}
	}

</style>