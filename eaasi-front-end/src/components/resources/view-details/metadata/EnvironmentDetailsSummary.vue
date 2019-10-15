<template>
	<div class="vds-container">
		<section-heading
			:title="summaryData.title"
			size="large"
		/>
		<div class="vds-description">
			{{ environment.description | stripHtml }}
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
	name: 'EnvironmentDetailsSummary',
})
export default class EnvironmentDetailsSummary extends Vue {

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
		width: 33vw;

		.vds-description {
			color: $dark-neutral;
			font-size: 1.5rem;
			padding: 1.2rem 0;
		}

		.vds-footer {
			font-size: 0.8rem;

			.vds-label {
				text-transform: uppercase;
			}
		}
	}
</style>