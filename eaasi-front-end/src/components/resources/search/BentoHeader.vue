<template>
	<div class="bento-header">
		<div class="bh-label flex-row">
			<i :class="`fal fa-${icon}`"></i>
			<span>{{ label }}</span>
		</div>
		<div class="bh-description">
			<slot></slot>
		</div>
		<div class="bh-footer flex-row justify-between">
			<span>{{ length }} of {{ total }} results</span>
			<ui-button
				@click="$emit('click:all')"
				icon="chevron-right"
				icon-right
				secondary
				size="sm"
			>
				See all {{ label }}
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'BentoHeader',
})
export default class BentoHeader extends Vue {

	/* Props
	============================================*/

	@Prop({type: String, required: true})
	readonly icon: string

	@Prop({type: String, required: true})
	readonly label: string

	@Prop({type: Number, required: true})
	readonly total: number

	@Prop({type: Number, required: true})
	readonly length: number

	/* Data
	============================================*/

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss">
.bento-header {
	margin-bottom: 2rem;

	.bh-label {
		border-bottom: solid 4px darken($light-neutral, 10%);
		color: darken($dark-neutral, 40%);
		font-size: 1.8rem;
		padding: 1rem 1rem 1.5rem;

		span {
			margin-left: 0.5rem;
		}
	}

	.bh-description,
	.bh-footer {
		background-color: lighten($light-neutral, 60%);
		color: darken($dark-neutral, 40%);
		padding: 1rem;
	}

	.bh-footer {
		margin-top: 0.8rem;
	}
}
</style>