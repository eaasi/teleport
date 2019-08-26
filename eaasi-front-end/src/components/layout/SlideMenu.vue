<template>
	<div :class="['slide-menu', {'open': open}]" :style="styles">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A sliding menu positoned on the right side of the main UI
 */
@Component({
	name: 'SlideMenu',
})
export default class SlideMenu extends Vue {

	/* Props
	============================================*/

	/**
	 * The CSS easing rule for the open animation
	 */
	@Prop({type: String, required: false, default: 'ease-out'})
	readonly easing: string

	/**
	 * Opens the menu when true
	 */
	@Prop({type: Boolean, required: true})
	readonly open: boolean

	/**
	 * The open/close animation speed in seconds
	 */
	@Prop({type: Number, default: 0.4, required: false})
	readonly speed: number

	/* Computed
	============================================*/

	get styles(): any {
		let { speed, easing } = this;
		return {
			transition: `transform ${speed}s ${easing}`
		};
	}

}

</script>

<style lang="scss">
.slide-menu {
	bottom: 0;
	box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
	overflow-y: auto;
	position: fixed;
	right: 0;
	top: $headerHeight;
	transform: translate3d($slideMenuWidth + 1rem, 0, 0);
	width: $slideMenuWidth;

	&.open {
		transform: translate3d(0, 0, 0);
	}
}
</style>