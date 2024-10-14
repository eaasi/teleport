<template>
	<div class="arc-container">
		<div class="arc-title">
			<div>
				<span>{{ paperclipIcon }}</span>
				Attach <span class="uppercase">{{ title }}</span> Resource from...
			</div>
		</div>
		<div class="arc-actions">
			<div class="arc-actions-content">
				<ui-button
					class="arc-search-button"
					sub-label="...node or network saved resources"
					@btnClicked="searchForEnvironment"
					disabled
				>
					Search/Browse
				</ui-button>

				<ui-button
					class="arc-open-my-resources-button"
					sub-label="...imported or bookmarked resources"
					@btnClicked="openMyResources"
					disabled
				>
					My Resources
				</ui-button>
			</div>
		</div>
	</div>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {translatedIcon} from '@/utils/constants';

/**
 * A Card providing user interface to Attach a Resource
 * @example ../docs/AttachResourceCard.Example.md
 */
@Component({
	name: 'AttachResourceCard'
})
export default class AttachResourceCard extends Vue {
		/**
		 * Provides the title of the Resource Type to be attached
		 */
		@Prop({ type: String, required: true })
		title: string;

		searchForEnvironment() {
		}

		openMyResources() {
		}

		get paperclipIcon() {
			return translatedIcon('paperclip');
		}
}
</script>

<style lang="scss">
	.arc-container {
		background-color: $light-grey;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 100%;
		padding: 1.2rem 0;
		text-align: center;

		.arc-title {
			color: $dark-green;
			font-size: 1.8rem;
			font-weight: bold;
			padding: 1.2rem;
		}
	}

	.arc-actions-content {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
