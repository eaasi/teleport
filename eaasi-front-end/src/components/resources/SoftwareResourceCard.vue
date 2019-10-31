<template>
	<selectable-card
		bookmark
		:data="summary"
		@change="$emit('change', $event)"
		:is-bookmark-selected="isBookmarkSelected"
		@bookmarked="isActive => $emit('bookmarked', isActive)"
	/>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary, ISoftwarePackage } from '@/types/Resource.d.ts';
import { IBookmark } from '@/types/Bookmark';
import { Get } from 'vuex-pathify';

@Component({
	name: 'Software',
})
export default class Software extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => ISoftwarePackage, required: true})
	readonly software: ISoftwarePackage

	/* Data
	============================================*/

	/* Computed
	============================================*/

	get summary(): IEaasiResourceSummary | null {
		if(!this.software) return null;
		let summary = {
			id: this.software.id,
			title: this.software.label,
			tagGroup: [],
			content: {
				'id': this.software.id,
				'Is Operating System': this.software.isOperatingSystem
			}
		} as IEaasiResourceSummary;
		return summary;
	}

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	get isBookmarkSelected(): Boolean {
		return this.bookmarks.some(b => b.resourceID === this.software.id);
	}

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>