<template>
	<div class="search-facet-wrapper">
		<div :class="['sfw-header', 'flex-row', 'justify-between', { collapsed: isCollapsed }]" @click="isCollapsed = !isCollapsed">
			<div class="sfw-label">{{ label }}</div>
			<div :class="['sfw-collapse', 'flex', 'flex-center', { chevdark: isCollapsed }]" v-if="collapsable">
				<span class="fas fa-chevron-up" v-show="!isCollapsed"></span>
				<span class="fas fa-chevron-down" v-show="isCollapsed"></span>
			</div>
		</div>
		<div class="sfw-content" v-show="!isCollapsed">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Component, Prop, Watch } from 'vue-property-decorator';

	@Component({
		name: 'SearchFacetWrapper',
	})
	export default class SearchFacetWrapper extends Vue {

		/* Props
        ============================================*/
		@Prop({type: String, required: true})
		readonly label: string;

		@Prop({type: Boolean, required: false, default: true})
		readonly collapsable: boolean;

		@Prop({ type: Boolean, default: false })
		readonly initState: boolean;

		/* Data
        ============================================*/
		isCollapsed: boolean = this.initState;

		@Watch('initState')
		onInitStateChange(cur, prev) {
			this.isCollapsed = cur;
		}
	}

</script>

<style lang="scss">
	.search-facet-wrapper {
		background-color: #FFFFFF;
		border: solid 1px lighten($light-neutral, 20%);
		margin-bottom: 2rem;
	}

	.sfw-header,
	.sfw-content {
		padding: 1rem;
	}
	.sfw-label {
		text-transform: uppercase;
	}

	.sfw-content {
		padding-top: 0;
	}

	.sfw-header {
		cursor: pointer;
		font-size: 1.4rem;
		user-select: none;

		&:hover {
			background-color: lighten($light-neutral, 90%);
		}
	}

	.sfw-collapse {
		background-color: lighten($light-blue, 80%);
		border-radius: 50%;
		color: $light-blue;
		height: 30px;
		width: 30px;
	}

	.sfw-header.collapsed {
		background-color: lighten($light-blue, 80%);
	}

	.chevdark {
		background-color: #FFFFFF;
	}
</style>