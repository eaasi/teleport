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
			<tag-group position="left" :tags="resourceTypeTags" />
		</template>
		<template #tagsRight>
			<tag-group v-if="summary" position="right" :tags="tagGroup" />
		</template>
	</selectable-card>
</template>

<script lang="ts">
import {ITag} from '@/types/Tag';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary, ISoftwarePackage, IEaasiResource } from '@/types/Resource.d.ts';
import { IBookmark } from '@/types/Bookmark';
import { Get } from 'vuex-pathify';
import { ROUTES } from '@/router/routes.const';
import { resourceLabels, translatedIcon } from '@/utils/constants';

@Component({
	name: 'SoftwareResourceCard',
})
export default class SoftwareResourceCard extends Vue {

	/* Props
	============================================*/

	@Prop({type: Boolean, required: false, default: false})
	readonly bookmark: boolean;

	@Prop({type: Object as () => ISoftwarePackage, required: true})
	readonly software: ISoftwarePackage;

	@Prop({type: Boolean, required: false, default: false})
	readonly disableSelect: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly hideDetails: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly isClickable: boolean;

	/* Data
	============================================*/

	/* Computed
	============================================*/
	@Get('resource/selectedResources')
	selectedResources: IEaasiResource[];

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	get resourceTypeTags(): ITag[] {
		let text = this.software.isOperatingSystem ? resourceLabels.OPERATING_SYSTEM : resourceLabels.SOFTWARE;
		return [{
			text,
			icon: translatedIcon('disk'),
			color:'white'
		}];
	}

	get summary(): IEaasiResourceSummary | null {
		if (!this.software) return null;
		let summary = {
			title: this.software.label,
			tagGroup: []
		} as IEaasiResourceSummary;
		if (this.hideDetails) return summary;
		summary.content = {
			'Is Operating System': this.software.isOperatingSystem
		};
		return summary;
	}

	get isBookmarkSelected(): Boolean {
		return this.bookmarks?.some(b => b.resourceId === this.software.id);
	}

	get isSelected(): Boolean {
		return this.selectedResources.some(r => r.id === this.software.id);
	}

	get tagGroup(): ITag[] {
		if (this.software.isPublic) return [];
		let lock = translatedIcon('lock');
		return [{
			text: 'Private',
			icon: lock,
			color: 'red'
		}];
	}

	/* Methods
	============================================*/
	goToDetailsPage() {
		this.$router.push({
				path: ROUTES.RESOURCES.SOFTWARE,
				query: {
					resourceId: this.software.id.toString(),
					archiveId: this.software.archiveId.toString(),
					label: this.software.label
				}
			});
	}
}

</script>

<style lang="scss"></style>