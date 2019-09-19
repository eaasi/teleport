<template>
	<div class="resource-list">
		<bento-header
			:result="result"
			:type="type"
		/>
		<div v-for="(env, index) in result.result" :key="env.title + index">
			<environment-resource-card
				:environment="env"
				@change="setActiveResource(env, $event)"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import BentoHeader from '@/components/resources/search/BentoHeader.vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IEaasiResource, ResourceType } from '@/types/Resource';
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

	@Prop({type: String, required: true})
	readonly type: ResourceType

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

}

</script>

<style lang="scss"></style>