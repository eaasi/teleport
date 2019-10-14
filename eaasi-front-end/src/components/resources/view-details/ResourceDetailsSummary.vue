<template>
	<div class="vds-container">
		<section-heading :title="summaryData.title" size="large" />
		<div class="vds-description">
			{{ environment.description }}
		</div>
		<div class="vds-footer">
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {IEaasiResourceSummary, IEnvironment} from '@/types/Resource';
import { Sync } from 'vuex-pathify';

@Component({
	name: 'ResourceDetailsSummary',
})
export default class ResourceDetailsScreen extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Object as () => IEaasiResourceSummary, required: true})
	summaryData: IEaasiResourceSummary;

	/* Data
	============================================*/
	title: string = this.summaryData.title;

	/* Computed
	============================================*/
	@Sync('resource/activeEnvironment')
	environment: IEnvironment

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