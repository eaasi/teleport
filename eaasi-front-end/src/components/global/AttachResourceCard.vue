<template>
	<div class="arc-container">
		<div class="arc-title">
			<!-- ATTACH RESOURCES TITLE -->
			<div>
				<i :class="`fas fa-paperclip`"></i>
				Attach <span class="uppercase">{{ title }}</span> Resource from...
			</div>
		</div>
		<!-- ATTACH RESOURCES TITLE -->

		<!-- ATTACH RESOURCES ACTIONS -->
		<div class="arc-actions">
			<div class="arc-actions-content">
				<labeled-ui-button
					label-text="...node or network saved resources"
					@btnClicked="searchForEnvironment"
				>
					Search/Browse
				</labeled-ui-button>

				<labeled-ui-button
					label-text="...imported or bookmarked resources"
					@btnClicked="openMyResources"
				>
					My Resources
				</labeled-ui-button>
			</div>
		</div>
		<!-- ATTACH RESOURCES ACTIONS /-->
	</div>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

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
}
</script>

<style lang="scss">
	.arc-container {
		background-color: lighten($light-neutral, 80%);
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		min-width: 100%;
		padding: 1.2rem 0;

		.arc-title {
			color: $dark-blue;
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
