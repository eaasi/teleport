<template>
	<div class="vh-container">
		<div class="vh-title">
			{{ title }}
		</div>
		<div class="vh-sub-section">
			<div class="vh-description">
				<slot></slot>
			</div>
			<div class="vh-actions">
				<slot name="actions"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

/**
 * Provides title and description of a View
 * @example ../docs/ViewHeader.Example.md
 */
@Component({
	name: 'ViewHeader'
})
export default class ViewHeader extends Vue {
	/**
	 * Title of the View
	 */
	@Prop({ required: true, type: String })
	title: string
}

</script>

<style lang="scss">
	.vh-container {
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;
	}

	.vh-title {
		background: lighten($light-neutral, 80%);
		box-shadow: 0 3px 2px -2px rgba(0, 0, 0, 0.1);
		font-size: 1.6rem;
		font-weight: bold;
		padding-top: 2rem;
		padding-bottom: 2rem;
		padding-left: 4rem;
		position: relative;
		z-index: 2;
	}

	.vh-sub-section {
		background: lighten($light-neutral, 40%);
		border-bottom: 2px solid $light-neutral;
		display: flex;
		flex-direction: row;
		font-size: 1.4rem;
		max-width: 100%;
		padding-left: 24px;
		position: relative;
	}

	.vh-description {
		background: lighten($light-neutral, 40%);
		line-height: 2.1rem;
		padding: 1.4rem 20rem 1.1rem 1.8rem;
		width: 40vw;
	}

	.vh-actions {
		align-content: flex-end;
		flex-grow: 1;
		margin: auto;
	}
</style>
