<template>
	<selectable-card
		bookmark
		footer
		:data="summary"
		:disable-select="disableSelect"
		:is-bookmark-selected="isBookmarkSelected"
		:is-clickable="isClickable"
		@change="$emit('change', $event)"
		@bookmarked="isActive => $emit('bookmarked', isActive)"
		@click:header="goToDetailsPage"
		:is-selected="isSelected"
	>
		<template v-slot:tagsLeft>
			<tag-group position="left" :tags="resourceTypeTags" />
		</template>
		<template v-slot:tagsRight>
			<tag-group v-if="summary" position="right" :tags="summary.tagGroup" />
		</template>
	</selectable-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Get } from 'vuex-pathify';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary } from '@/types/Resource.d.ts';
import { ITag } from '@/types/Tag';
import { IBookmark } from '@/types/Bookmark';

@Component({
	name: 'ContentResourceCard',
})
export default class ContentResourceCard extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => any, required: true})
	readonly content: any;

	@Prop({type: Boolean, required: false, default: false})
	readonly disableSelect: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly isClickable: boolean;

	@Prop({ type: Boolean, default: false })
	isSelected: Boolean;

	/* Data
	============================================*/

	summary: IEaasiResourceSummary = null;

	resourceTypeTags: ITag[] =  [
		{
			text: 'Content',
			icon:'fa-save',
			color:'blue'
		}
	];

	/* Computed
	============================================*/

	setCardSummary(): void {
		if (!this.content) return null;
		let summary = {
			title: this.content.title,
			tagGroup: [],
			content: { },
			subContent: { },
		} as IEaasiResourceSummary;

		if (this.content.archiveId === 'zero conf') {
			summary.tagGroup.push({
				text: 'Private',
				icon: 'fa-cloud-download-alt',
				color:'yellow'
			});
		}

		this.summary = summary;
	}

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	get isBookmarkSelected(): Boolean {
		return this.bookmarks.some(b => b.resourceID === this.content.id);
	}

	/* Methods
	============================================*/

	goToDetailsPage() {
		this.$router.push({
			path:'/resources/software',
			query: {
				resourceId: this.content.id.toString(),
				archiveId: this.content.archiveId.toString()
			}
		});
	}

	/* Lifecycle Hooks
	============================================*/

	created() {
		this.setCardSummary();
	}

}

</script>

<style lang="scss"></style>