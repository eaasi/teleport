<template>
	<div class="vds-container">
		<section-heading :title="title" size="large" />
		<div class="vds-description">
			{{ resourceDetailSummary.content }}
		</div>
		<div class="vds-footer">
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {IEaasiResourceSummary} from '@/types/Resource';

@Component({
	name: 'ResourceDetailsSummary',
})
export default class ResourceDetailsScreen extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Object as () => IEaasiResourceSummary, required: true})
	resourceDetailSummary: IEaasiResourceSummary;

	/* Data
	============================================*/
	title: string = this.resourceDetailSummary.title;

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	created() {
	}
}

</script>

<style lang="scss">
	.vds-container {

		.vds-description {
			font-size: 1rem;
		}

		.vds-footer {
			font-size: 0.8rem;

			.vds-label {
				text-transform: uppercase;
			}
		}
	}
</style>