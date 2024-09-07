<template>
	<selectable-card
		:bookmark="bookmark"
		footer
		:data="summary"
		:disable-select="disableSelect"
		:is-bookmark-selected="isBookmarkSelected"
		:is-clickable="isClickable"
		@change="$emit('change', $event)"
		@bookmarked="isActive => $emit('bookmarked', isActive)"
		@click:header="goToDetailsPage"
		:value="isSelected"
	>
		<template #tagsLeft>
			<tag-group position="left" :tags="imageTypeTags" />
		</template>
	</selectable-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Get } from 'vuex-pathify';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary, IEaasiResource, IImageListItem } from '@/types/Resource';
import { ITag } from '@/types/Tag';
import { IBookmark } from '@/types/Bookmark';
import { resourceLabels, resourceTypes, translatedIcon } from '@/utils/constants';

@Component({
	name: 'ImageResourceCard',
})
export default class ImageResourceCard extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => IImageListItem, required: true})
	readonly image: IImageListItem;

	@Prop({type: Boolean, required: false, default: false})
	readonly disableSelect: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly isClickable: boolean;

	@Prop({ type: Boolean, default: true })
	readonly bookmark: boolean;

	/* Data
	============================================*/
	imageTypeTags: ITag[] =  [
		{
			text: resourceLabels.IMAGE,
			icon:  translatedIcon('disk'),
			color: 'white'
		}
	];

	/* Computed
	============================================*/
	@Get('resource/selectedResources')
	selectedResources: IEaasiResource[];

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	get summary(): IEaasiResourceSummary {
		return {
			id: this.image.id,
			title: this.image.title,
			resourceType: resourceTypes.IMAGE,
			content: { },
			subContent: { },
			isPublic: false
		};
	}

	get isBookmarkSelected(): Boolean {
		return this.bookmarks?.some(b => b.resourceId === this.image.id);
	}

	get isSelected(): Boolean {
		return this.selectedResources.some(r => r.id === this.image.id);
	}

	/* Methods
	============================================*/
	goToDetailsPage() {
        throw 'not implemented';
		// this.$router.push({
		// 	path: ROUTES.RESOURCES.CONTENT,
		// 	query: {
		// 		resourceId: this.content.id.toString(),
		// 		archiveId: this.content.archiveId.toString()
		// 	}
		// });
	}

}

</script>

<style lang="scss"></style>