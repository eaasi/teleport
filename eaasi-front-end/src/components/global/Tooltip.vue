<template>
	<div class="tooltip">
		<span ref="icon" class="tooltip-icon" @mouseover="openTooltip" @mouseleave="closeTooltip">
			<span :class="`fas fa-${icon}`"></span>
		</span>
		<div ref="content" :class="`tooltip-content ${open ? 'opened' : ''}`">
			<div v-html="text"></div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A tooltip with icon
 * @example ../docs/Tooltip.Example.md
 */
@Component({
	name: 'Tooltip'
})
export default class Tooltip extends Vue {

	$refs!: {
		content: HTMLDivElement
		icon: HTMLSpanElement
	}
	/* Props
    ============================================*/

	/**
	 * The tooltip icon
	 */
	@Prop({type: String, required: false, default: 'question'})
	readonly icon: string;

	/**
	 * The tooltip content
	 */
	@Prop({type: String})
	readonly text: string;

	open: boolean = false;

	readonly offset: number = 10;

	openTooltip(): void {
		this.recalculateTooltipPosition();
		this.open = true;
	}

	closeTooltip(): void {
		this.open = false;
	}

	recalculateTooltipPosition(): void {
		const width = this.$refs.content.getBoundingClientRect().width;
		const height = this.$refs.content.getBoundingClientRect().height;
		let x = this.$refs.icon.getBoundingClientRect().x + this.$refs.icon.getBoundingClientRect().width / 2;
		if (x + width / 2 > window.innerWidth) {
			x = window.innerWidth - width / 2;
		}
		if (x < 0) {
			x = 0;
		}
		let y = this.$refs.icon.getBoundingClientRect().y + this.$refs.icon.getBoundingClientRect().height;
		if (y + height > window.innerHeight) {
			y = window.innerHeight - height - this.offset;
		}
		if (y < -this.offset) {
			y = -this.offset;
		}
		this.$refs.content.style.left = window.scrollX + x + 'px';
		this.$refs.content.style.top = window.scrollY + y + 'px';
	}
}
</script>

<style lang='scss'>
.tooltip {
	overflow: visible;
	display: contents;

	.tooltip-icon {
		cursor: pointer;
		margin: 2px 2px 2px 5px;

		span {
			color: darken($dark-neutral, 20%);
			font-size: 1.5rem;
		}
	}

	.tooltip-content {
		position: absolute;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.2s;
		z-index: 100;
		margin-top: 10px;
		top: 0;
		left: 0;
		transform: translateX(calc(-50%));
		width: fit-content;
		max-width: 300px;
		color: darken($dark-neutral, 20%);
		font-size: 1.6rem;

		&.opened {
			pointer-events: auto;
			opacity: 1;
		}

		div {
			border-radius: 0.4rem;
			border: 2px solid $light-neutral;
			padding: 5px;
			background-color: lighten($light-neutral, 30%);
		}

		code {
			font-family: monospace;
			font-size: 1.2rem;
			color: darken($dark-neutral, 35%);
			background-color: lighten($dark-neutral, 70%);
			border-radius: 0.3rem;
			padding: 0 2px;
		}
	}
}
</style>