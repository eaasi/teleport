<template>
	<selectable-card
		bookmark
		:data="summary"
		:disable-select="disableSelect"
		:is-bookmark-selected="isBookmarkSelected"
		:is-clickable="isClickable"
		@change="$emit('change', $event)"
		@bookmarked="isActive => $emit('bookmarked', isActive)"
		@click:header="goToDetailsPage"
	/>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary, ISoftwarePackage } from '@/types/Resource.d.ts';
import { IBookmark } from '@/types/Bookmark';
import { Get } from 'vuex-pathify';

@Component({
	name: 'SoftwareResourceCard',
})
export default class SoftwareResourceCard extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => ISoftwarePackage, required: true})
	readonly software: ISoftwarePackage;

	@Prop({type: Boolean, required: false, default: false})
	readonly disableSelect: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly isClickable: boolean;

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

	goToDetailsPage() {
		this.$router.push({ path:'/resources/software', query: { resourceId: this.software.id.toString()} });
	}

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>