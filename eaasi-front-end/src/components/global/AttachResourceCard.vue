<template>
	<div class="arc-container">
		<div class="arc-title">
			<div>
				<i :class="`fas fa-paperclip`"></i>
				Attach <span class="uppercase">{{ title }}</span> Resource from...
			</div>
		</div>
		<div class="arc-actions">
			<div class="arc-actions-content">
				<ui-button
					sub-label="...node or network saved resources"
					@btnClicked="searchForEnvironment"
				>
					Search/Browse
				</ui-button>

				<ui-button
					sub-label="...imported or bookmarked resources"
					@btnClicked="openMyResources"
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

/**
 * A Card providing user interface to Attach a Resource
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
}
</script>

<style lang="scss">
	.arc-container {
		background-color: lighten($light-neutral, 80%);
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 100%;
		padding: 1.2rem 0;
		text-align: center;

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
