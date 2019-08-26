<template>
	<div :class="['slide-menu', {open}]" :style="styles">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'SlideMenu',
})
export default class SlideMenu extends Vue {

	/* Props
	============================================*/

	/**
	 * a CSS easing rule
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

	get styles() {
		let { speed, easing } = this;
		if(speed === 0) return {}; // If speed is 0, do not animate
		return {
			'transition': `transform ${speed}s ${easing}`
		};
	}

	mounted() {
		console.log(this.styles);
	}


}

</script>

<style lang="scss">
.slide-menu {
	background-color: #FFF;
	bottom: 0;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
	overflow-y: auto;
	position: fixed;
	right: 0;
	top: $headerHeight;
	width: $slideMenuWidth;

	&.open {
		transform: translate3d($slideMenuWidth, 0, 0);
	}
}
</style>