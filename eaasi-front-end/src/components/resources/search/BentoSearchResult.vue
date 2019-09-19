<template>
	<div class="bento-search-results">

	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResource } from '@/types/Resource';
import { IResourceSearchQuery, IEaasiSearchResponse  } from '@/types/Search';

@Component({
	name: 'BentoSearchResults',
})
export default class BentoSearchResults extends Vue {

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

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>