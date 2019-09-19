<template>
	<div class="resource-list">
		<div class="row">
			<div class="col-md-12">
				<pagination :total-results="result.totalResults" />
				<br/><br/>
			</div>
		</div>
		<div class="row">
			<div v-for="env in result.result" :key="env.id" class="col-md-6">
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
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResource } from '../../types/Resource';
import { IEaasiSearchResponse } from 'eaasi-http';
import { IResourceSearchQuery } from '@/types/Search.d.ts';
import EnvironmentResourceCard from './EnvironmentResourceCard.vue';
import { Sync } from 'vuex-pathify';

@Component({
	name: 'ResourceList',
	components: {
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

	setActiveResource(resource: IEaasiResource, isActive: boolean) {
		if(!isActive) this.activeResource = null;
		else this.activeResource = resource;
	}

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>