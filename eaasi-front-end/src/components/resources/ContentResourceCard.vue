<template>
	<selectable-card
		:bookmark="bookmark"
		footer
		:data="summary"
		:disable-select="disableSelect"
		:is-bookmark-selected="isBookmarkSelected"
		:is-clickable="false"
		@change="$emit('change', $event)"
		@bookmarked="isActive => $emit('bookmarked', isActive)"
		@click:header="goToDetailsPage"
		:value="isSelected"
	>
		<template #tagsLeft>
			<tag-group position="left" :tags="resourceTypeTags" />
		</template>
		<template #tagsRight>
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
import { resourceLabels, resourceTypes, translatedIcon } from '@/utils/constants';
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
			text: resourceLabels.CONTENT,
			icon:  translatedIcon('disk'),
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
		// As far as we know, Content on its own is never public.
		// Once content is associated with an environment, a
		// Content environment is created.
		if (this.content.archiveId === 'zero conf') {
			return [{
				text: 'Private',
				icon:  translatedIcon('lock'),
				color: 'red'
			}];
		}
		return [];
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
		return this.bookmarks?.some(b => b.resourceId === this.content.id);
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