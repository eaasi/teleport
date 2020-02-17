<template functional>
	<div class="legend-container">
		<span :class="['legend-color', props.data.color]"></span>
		<span class="legend-text">
			{{ props.data.text }}
		</span>
	</div>
</template>

<script lang="ts">
	import {ILegend} from '@/types/Legend';
	import Vue from 'vue';
	import { Component, Prop } from 'vue-property-decorator';

	/**
	 * LegendElement are rectangular elements that can be used to
	 * provide explanation of particular color use in a view.
	 * The name `section-legend` is used to avoid conflict with
	 * native HTML `legend` tag.
	 * @example ../docs/LegendElement.Example.md
	 */
	@Component({
		name: 'LegendElement'
	})
	export default class LegendElement extends Vue {
		/* Props
        ============================================*/
		/**
		 * The legend data
		 */
		@Prop({type: Object as () => ILegend, required: true})
		readonly data: ILegend;
	}
</script>

<style lang="scss">
	.legend-container {
		display: flex;
		height: 2.2rem;

		.legend-color {
			border: 1px solid $light-neutral;
			box-sizing: border-box;
			display: inline-block;
			height: 2.2rem;
			width: 2.2rem;
		}

		.legend-text {
			align-self: center;
			padding: 0 0.8rem;
			text-align: center;
		}

		// Add additional colors as necessary
		.yellow {
			background: lighten($yellow, 60%);
		}
	}
</style>
