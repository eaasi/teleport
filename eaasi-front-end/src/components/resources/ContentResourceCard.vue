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
		:is-selected="isSelected"
	>
		<template v-slot:tagsLeft>
			<tag-group position="left" :tags="resourceTypeTags" />
		</template>
		<template v-slot:tagsRight>
			<tag-group v-if="summary" position="right" :tags="contentTagGroup" />
		</template>
	</selectable-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Get } from 'vuex-pathify';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary, IEaasiResource } from '@/types/Resource.d.ts';
import { ITag } from '@/types/Tag';
import { IBookmark } from '@/types/Bookmark';
import { resourceTypes } from '@/utils/constants';
import { ROUTES } from '../../router/routes.const';

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
	readonly bookmark: boolean;

	/* Data
	============================================*/
	resourceTypeTags: ITag[] =  [
		{
			text: 'Content',
			icon:'fa-file',
			color:'white'
		}
	];

	/* Computed
	============================================*/
	@Get('resource/selectedResources')
	selectedResources: IEaasiResource[];

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	get contentTagGroup(): ITag[] {
		if (this.content.archiveId === 'zero conf') {
			return [{
				text: 'Private',
				icon: 'fa-cloud-download-alt',
				color: 'yellow'
			}];
		}
	}

	get summary(): IEaasiResourceSummary {
		return {
			id: this.content.id,
			title: this.content.title,
			resourceType: resourceTypes.CONTENT,
			isPublic: false
		};
	}

	get isBookmarkSelected(): Boolean {
		return this.bookmarks?.some(b => b.resourceID === this.content.id);
	}

	get isSelected(): Boolean {
		return this.selectedResources.some(r => r.id === this.content.id);
	}

	/* Methods
	============================================*/
	goToDetailsPage() {
		this.$router.push({
			path: ROUTES.RESOURCES.CONTENT,
			query: {
				resourceId: this.content.id.toString(),
				archiveId: this.content.archiveId.toString()
			}
		});
	}

}

</script>

<style lang="scss"></style>