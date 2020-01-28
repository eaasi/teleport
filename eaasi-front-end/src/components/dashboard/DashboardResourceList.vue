<template>
	<div class="resource-list" v-if="result">
		<div v-for="(resource, index) in result.result" :key="resource.title + index">
			<environment-resource-card
				v-if="isEnvironment(resource)"
				:disable-select="true"
				:environment="resource"
				is-clickable
				@bookmarked="isActive => handleBookmark(resource.envId, isActive)"
			/>
			<software-resource-card
				v-if="isSoftware(resource)"
				:disable-select="true"
				:software="resource"
				is-clickable
				@bookmarked="isActive => handleBookmark(resource.id, isActive)"
			/>
			<content-resource-card
				v-if="isContent(resource)"
				:disable-select="true"
				:software="resource"
				is-clickable
				@bookmarked="isActive => handleBookmark(resource.id, isActive)"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import User from '@/models/admin/User';
import EnvironmentResourceCard from '@/components/resources/EnvironmentResourceCard.vue';
import SoftwareResourceCard from '@/components/resources/SoftwareResourceCard.vue';
import ContentResourceCard from '@/components/resources/ContentResourceCard.vue';
import {resourceTypes} from '@/utils/constants';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResource } from '@/types/Resource';
import { IEaasiSearchResponse } from '@/types/Search';
import { Get, Sync } from 'vuex-pathify';

@Component({
	name: 'DashboardResourceList',
	components: {
		ContentResourceCard,
		EnvironmentResourceCard,
		SoftwareResourceCard
	}
})
export default class DashboardResourceList extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IEaasiSearchResponse<IEaasiResource>, required: true})
	readonly result: IEaasiSearchResponse<IEaasiResource>;

	/* Computed
	============================================*/

	@Sync('resource/selectedResources')
	selectedResources: IEaasiResource[];

	@Get('loggedInUser')
	user: User;

	/* Methods
	============================================*/

	isEnvironment(resource: IEaasiResource) {
		return resource.resourceType === resourceTypes.ENVIRONMENT;
	}

	isSoftware(resource: IEaasiResource) {
		return resource.resourceType === resourceTypes.SOFTWARE;
	}

	isContent(resource: IEaasiResource) {
		return resource.resourceType === resourceTypes.CONTENT;
	}

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

<style lang="scss">
</style>