<template>
	<div class="resource-list">
		<bento-header
			:result="result"
			:type="type"
			@click:all="$emit('click:all')"
			@clear-search="clearSearch"
		/>
		<div v-for="(resource, index) in result.result" :key="resource.title + index">
			<environment-resource-card
				:environment="resource"
				@change="setActiveResource(resource, $event)"
				v-if="type === 'Environment'"
				@bookmarked="isActive => handleBookmark(resource.envId, isActive)"
			/>
			<software-resource-card
				:software="resource"
				@change="setActiveResource(resource, $event)"
				v-if="type === 'Software'"
				@bookmarked="isActive => handleBookmark(resource.id, isActive)"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import BentoHeader from '@/components/resources/search/BentoHeader.vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResource, ResourceType } from '@/types/Resource';
import { IResourceSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import EnvironmentResourceCard from './EnvironmentResourceCard.vue';
import SoftwareResourceCard from './SoftwareResourceCard.vue';
import { Get, Sync } from 'vuex-pathify';
import User from '../../models/admin/User';

@Component({
	name: 'ResourceList',
	components: {
		BentoHeader,
		EnvironmentResourceCard,
		SoftwareResourceCard
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

	setActiveResource(resource: IEaasiResource, isActive: boolean) {
		if (!isActive) this._removeFromActiveResources(resource);
		else this.selectedResources.push(resource);
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
		return isActive
			? await this.$store.dispatch('bookmark/createBookmark', bookmarkRequest)
			: await this.$store.dispatch('bookmark/removeBookmark', bookmarkRequest);
	}

}

</script>

<style lang="scss"></style>