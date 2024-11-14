<template>
	<div class="resource-list">
		<bento-header
			v-if="!hideHeader"
			:result="result"
			:type="type"
			@click:all="$emit('click:all')"
			@clear-search="clearSearch"
		/>
		<div v-for="(resource, index) in result.result" :key="index" class="card-wrapper">
			<environment-resource-card
				v-if="isEnvironment"
				:environment="resource"
				@change="toggleResource(resource)"
				bookmark
				is-clickable
				@bookmarked="isActive => handleBookmark(resource.envId, isActive)"
			/>
			<software-resource-card
				v-if="isSoftware"
				:software="resource"
				@change="toggleResource(resource)"
				bookmark
				is-clickable
				@bookmarked="isActive => handleBookmark(resource.id, isActive)"
			/>
			<content-resource-card
				v-if="isContent"
				:content="resource"
				bookmark
				@change="toggleResource(resource)"
				is-clickable
				@bookmarked="isActive => handleBookmark(resource.id, isActive)"
			/>
			<image-resource-card
				v-if="isImage"
				:image="resource"
				@change="toggleResource(resource)"
				@bookmarked="isActive => handleBookmark(resource.id, isActive)"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import User from '@/models/admin/User';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import { IEaasiResource, ResourceType } from '@/types/Resource';
import { IResourceSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { jsonEquals } from '@/utils/functions';
import { BookmarkRequest } from '@/types/Bookmark';

import BentoHeader from '@/components/resources/search/BentoHeader.vue';
import ContentResourceCard from '@/components/resources/ContentResourceCard.vue';
import EnvironmentResourceCard from '@/components/resources/EnvironmentResourceCard.vue';
import SoftwareResourceCard from '@/components/resources/SoftwareResourceCard.vue';
import ImageResourceCard from '@/components/resources/ImageResourceCard.vue';

@Component({
	name: 'ResourceList',
	components: {
		BentoHeader,
		EnvironmentResourceCard,
		SoftwareResourceCard,
		ContentResourceCard,
		ImageResourceCard,
	}
})
export default class ResourceList extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => IEaasiSearchResponse<IEaasiResource>, required: true})
	readonly result: IEaasiSearchResponse<IEaasiResource>;

	@Prop({type: Object as () => IResourceSearchQuery, required: true})
	readonly query: IResourceSearchQuery;

	@Prop({type: String, required: true})
	readonly type: ResourceType;

	@Prop({ type: Boolean })
	readonly hideHeader: Boolean;

	/* Computed
	============================================*/

	@Sync('resource/selectedResources')
	selectedResources: IEaasiResource[];

	@Get('loggedInUser')
	user: User;

	get isEnvironment(): boolean {
		return this.type === 'Environment';
	}

	get isSoftware(): boolean {
		return this.type === 'Software';
	}

	get isContent(): boolean {
		return this.type === 'Content';
	}

	get isImage(): boolean {
		return this.type === 'Image';
	}

	/* Methods
	============================================*/

	paginate(pageNum: number) {
		this.$emit('paginate', pageNum);
	}

	toggleResource(resource: IEaasiResource) {
		if(this.selectedResources.some(x => jsonEquals(x, resource))) {
			this.selectedResources = this.selectedResources.filter(x => !jsonEquals(x, resource));
		} else {
			this.selectedResources = [...this.selectedResources, resource];
		}
	}

	_removeFromActiveResources(resource: IEaasiResource) {
		let index = this.selectedResources.findIndex(o => o.title === resource.title);
		if (index !== -1) this.selectedResources.splice(index, 1);
	}

	async clearSearch() {
		await this.$store.dispatch('resource/clearSearch');
	}

	async handleBookmark(resourceId: number, isActive: boolean) {
		const resourceIdString = `${resourceId}`;
		const bookmarkRequest: BookmarkRequest = { userId: this.user.id, resourceId: resourceIdString };
		isActive
			? await this.$store.dispatch('bookmark/createBookmark', bookmarkRequest)
			: await this.$store.dispatch('bookmark/removeBookmark', bookmarkRequest);
		this.$emit('bookmarked');
	}
}

</script>

<style lang="scss"></style>