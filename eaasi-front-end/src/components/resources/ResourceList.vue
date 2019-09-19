<template>
	<div class="resource-list">
		<div class="row">
			<div class="col-md-12">
				<pagination
					:total-results="result.totalResults"
					:results-per-page="query.limit"
					@paginate="paginate"
				/>
				<br /><br />
			</div>
		</div>
		<bento-header
			label="Environment Results"
			icon="box"
			:length="result.result.length"
			:total="result.totalResults"
		>
			Ready-to-emulate results that include an operating system and hardware settings.
		</bento-header>
		<div class="row">
			<div v-for="env in result.result" :key="env.title" class="col-md-6">
				<environment-resource-card
					:environment="env"
					@change="setActiveResource(env, $event)"
				/>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import BentoHeader from '@/components/search/BentoHeader.vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IEaasiResource } from '@/types/Resource';
import { IResourceSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import EnvironmentResourceCard from './EnvironmentResourceCard.vue';
import { Sync } from 'vuex-pathify';

@Component({
	name: 'ResourceList',
	components: {
		BentoHeader,
		EnvironmentResourceCard
	}
})
export default class ResourceList extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IEaasiSearchResponse<IEaasiResource>, required: true})
	readonly result: IEaasiSearchResponse<IEaasiResource>

	@Prop({type: Object as () => IResourceSearchQuery, required: true})
	readonly query: IResourceSearchQuery

	/* Data
	============================================*/

	/* Computed
	============================================*/

	@Sync('resource/activeResource')
	activeResource: IEaasiResource

	/* Methods
	============================================*/

	paginate(pageNum: number) {
		this.$emit('paginate', pageNum);
	}

	setActiveResource(resource: IEaasiResource, isActive: boolean) {
		if(!isActive) this.activeResource = null;
		else this.activeResource = resource;
	}

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

	@Watch('result')
	onResultChanged(newRes) {
		console.log('result change');
		console.log(newRes.result[0].title);
	}

}

</script>

<style lang="scss"></style>