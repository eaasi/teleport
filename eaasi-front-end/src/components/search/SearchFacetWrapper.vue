<template>
	<div class="search-facet-wrapper">
		<div class="sfw-header flex-row justify-between">
			<div class="sfw-label">{{ label }}</div>
			<div class="sfw-collapse flex flex-center" v-if="collapsable">
				<i class="fal fa-chevron-up"></i>
			</div>
		</div>
		<div class="sfw-content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'SearchFacetWrapper',
})
export default class SearchFacetWrapper extends Vue {

	/* Props
	============================================*/
	@Prop({type: String, required: true})
	readonly label: string

	@Prop({type: Boolean, required: false, default: true})
	readonly collapsable: boolean

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

<style lang="scss">
.sfw-collapse {
	background-color: lighten($light-blue, 80%);
	border-radius: 50%;
	color: $light-blue;
	height: 30px;
	width: 30px;
}
</style>