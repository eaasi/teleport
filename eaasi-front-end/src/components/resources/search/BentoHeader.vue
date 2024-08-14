<template>
	<div class="bento-header" v-if="result">
		<div class="bh-label flex-row">
			<eaasi-icon :icon="icon" />
			<span>{{ label }}</span>
		</div>
		<div class="bh-description">
			<div>{{ description }}</div>
		</div>
		<div class="bh-footer flex-row justify-between">
			<span v-if="result.totalResults > 0">
				{{ result.result.length }} of {{ result.totalResults }} results
			</span>
			<span v-else>No {{ label }} Found</span>
			<ui-button
				@click="$emit('click:all')"
				icon="chevron-right"
				icon-right
				color-preset="green"
				size="sm"
				v-if="result.result.length < result.totalResults"
			>
				See all {{ label }}
			</ui-button>
			<ui-button
				@click="$emit('clear-search')"
				icon-right
				color-preset="green"
				size="sm"
				v-if="result.result.length === result.totalResults && result.result.length && result.totalResults > minSearchResultLimit"
			>
				Clear Search
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import EaasiIcon from '@/components/global/icons/EaasiIcon.vue';
import { ResourceType } from '@/types/Resource';
import { IEaasiResource } from '@/types/Resource';
import { IEaasiSearchResponse } from '@/types/Search';
import { MIN_SEARCH_RESULT_LIMIT } from '@/utils/constants';

@Component({
	name: 'BentoHeader',
	components: { EaasiIcon },
})
export default class BentoHeader extends Vue {

	/* Props
	============================================*/
	@Prop({ type: String, required: true })
	readonly type: ResourceType;

	@Prop({type: Object as () => IEaasiSearchResponse<IEaasiResource>, required: true})
	readonly result: IEaasiSearchResponse<IEaasiResource>;

	/* Computed
	============================================*/
	get label(): string {
		return this.type + ' Resources';
	}

	get icon(): string {
		if (this.type === 'Software') return 'disk';
		if (this.type === 'Content') return 'disk';
		if (this.type === 'Image') return 'disk';
		return 'config-environment';
	}

	get description(): string {
		if (this.type === 'Software') {
			return 'Results for software install media that can be attached to environments so you can install the software.';
		}
		if (this.type === 'Content') {
			return 'Files and objects from digital collections to be added to an environment for access.';
		}
		if (this.type === 'Environment') {
			return 'Pre-configured environments ready for access or as a base environment for new configurations.';
		}
		return '';
	}

	/* Data
	============================================*/
	minSearchResultLimit: Number = MIN_SEARCH_RESULT_LIMIT;
}

</script>

<style lang="scss">
.bento-header {
	margin-bottom: 2rem;

	.bh-label {
		border-bottom: solid 2px $green;
		color: black;
		font-size: 1.8rem;
		padding: 1rem 1rem 1.5rem;

		span {
			margin-left: 0.5rem;
		}
	}

	.bh-description {
		background-color: $medium-grey;
		color: black;
		padding: 1rem;
	}

	.bh-footer {
		background-color: $medium-grey;
		color: black;
		margin-top: 0.8rem;
		padding: 1rem;
	}
}
</style>