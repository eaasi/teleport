<template>
	<div class="vds-container">
		<section-heading
			v-if="readonly"
			:title="summaryData.title"
			size="large"
		/>
		<text-input v-else v-model="summaryData.title" />
		<div class="vds-description">
			<span v-if="summaryData.description && readonly">
				{{ summaryData.description | stripHtml }}
			</span>
			<span v-else-if="!readonly">
				<text-area-input
					v-model="summaryData.description"
				/>
			</span>
		</div>
		<div class="vds-footer"></div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IEaasiResourceSummary } from '@/types/Resource';
import { Sync } from 'vuex-pathify';

@Component({
	name: 'ResourceDetailsSummary',
})
export default class ResourceDetailsSummary extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Object as () => IEaasiResourceSummary, required: true})
	summaryData: IEaasiResourceSummary;

	@Prop({ type: Boolean})
	readonly: Boolean;
	
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