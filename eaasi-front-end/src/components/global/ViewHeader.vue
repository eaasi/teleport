<template>
	<div>
		<div class="vh-title">
			{{ title }}
		</div>
		<div class="vh-subtitle">
			<div class="vh-description">
				<slot></slot>
			</div>
			<div v-if="hasActions()" class="vh-actions">
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

	/**
	 * Returns true if there is content in the actions slot
	 */
	hasActions() {
		return this.$slots.actions;
	}
}

</script>

<style lang="scss">
	.vh-title {
		background: lighten($light-neutral, 80%);
		box-shadow: 0 3px 2px -2px rgba(0, 0, 0, 0.1);
		font-size: 1.6rem;
		font-weight: bold;
		padding: 2rem 1.3rem;
		position: relative;
		z-index: 2;
	}

	.vh-subtitle {
		border-bottom: 2px solid $light-neutral;
		display: flex;
		flex-direction: row;
		font-size: 1.4rem;
		position: relative;
	}

	.vh-description {
		background: lighten($light-neutral, 40%);
		flex-grow: 1;
		padding: 2.4rem 1.3rem;
	}

	.vh-actions {
		align-content: flex-end;
		background: lighten($light-neutral, 95%);
		padding: 2.4rem 1.3rem;
	}
</style>
