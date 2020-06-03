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
				:environment="resource"
				@change="toggleResource(resource, $event)"
				is-clickable
				v-if="type === 'Environment'"
				@bookmarked="isActive => handleBookmark(resource.envId, isActive)"
			/>
			<software-resource-card
				:software="resource"
				@change="toggleResource(resource, $event)"
				is-clickable
				v-if="type === 'Software'"
				@bookmarked="isActive => handleBookmark(resource.id, isActive)"
			/>
			<content-resource-card
				:content="resource"
				@change="toggleResource(resource, $event)"
				is-clickable
				v-if="type === 'Content'"
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
import BentoHeader from '@/components/resources/search/BentoHeader.vue';
import ContentResourceCard from '@/components/resources/ContentResourceCard.vue';
import EnvironmentResourceCard from '@/components/resources/EnvironmentResourceCard.vue';
import SoftwareResourceCard from '@/components/resources/SoftwareResourceCard.vue';
import { resourceTypes } from '../../utils/constants';
import { jsonEquals } from '@/utils/functions';

@Component({
	name: 'ResourceList',
	components: {
		BentoHeader,
		EnvironmentResourceCard,
		SoftwareResourceCard,
		ContentResourceCard,
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

	/* Methods
	============================================*/

	paginate(pageNum: number) {
		this.$emit('paginate', pageNum);
	}

	toggleResource(resource: IEaasiResource, isActive: boolean) {
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

	async handleBookmark(resourceID: number, isActive: boolean) {
		const bookmarkRequest = { userID: this.user.id, resourceID };
		isActive
			? await this.$store.dispatch('bookmark/createBookmark', bookmarkRequest)
			: await this.$store.dispatch('bookmark/removeBookmark', bookmarkRequest);
		this.$emit('bookmarked');
	}
}

</script>

<style lang="scss">

</style>