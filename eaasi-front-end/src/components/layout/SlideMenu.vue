<template>
	<div :class="['slide-menu', {'open': open}]" :style="styles">
		<div class="slideOutTab">
			<div>
				View Actions
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A sliding menu positioned on the right side of the main UI
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
	position: fixed;
	right: 8px;
	top: $headerHeight;
	transform: translate3d($slideMenuWidth + 1rem, 0, 0);
	width: $slideMenuWidth;

	&.open {
		transform: translate3d(0, 0, 0);
	}

	.slideOutTab {
		background: $dark-blue;
		border-radius: 15px 0px 0px 15px;
		color: #FFFFFF;
		height: 180px;
		left: -40px;
		margin-top: 50px;
		position: absolute;
		width: 40px;
	}

	.slideOutTab div {
		position: relative;
		right: 70px;
		text-align: center;
		top: 80px;
		transform: rotate(270deg);
		width: 180px;
		writing-mode: lr-tb;
	}

	.thumb-tab {
		background: #F2AB34;
		border-radius: 15px 0px 0px 15px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
		height: 200px;
		left: -40px;
		margin-top: 50px;
		position: absolute;
		width: 40px;

		div {
			background: #F2AB34;
			position: relative;
			right: 70px;
			text-align: center;
			top: 90px;
			width: 180px;
			writing-mode: lr-tb;
		}
	}
}
</style>