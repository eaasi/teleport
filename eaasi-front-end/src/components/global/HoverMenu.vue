<template>
	<div
		class="hover-menu-wrapper"
		@mouseenter="showMenu(true)"
		@mouseleave="showMenu(false)"
	>
		<div class="hover-menu-trigger">
			<slot name="trigger"></slot>
		</div>
		<slot name="menu" class="hover-menu" v-if="menuIsVisible"></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A simple, un-styled mouse-hover component with slots for the trigger and menu content
 * @example ../docs/HoverMenu.Example.md
 */
@Component({
	name: 'HoverMenu',
})
export default class HoverMenu extends Vue {

	/* Props
	============================================*/

	/**
	 * The delay before the menu closes after a mouseout event
	 */
	@Prop({type: Number, required: false, default: 150})
	readonly closeDelay: number

	/* Data
	============================================*/

	menuIsVisible: boolean = false;
	menuTimer: number;

	/* Methods
	============================================*/

	/**
	 * Closes the menu immediately
	 */
	closeMenu() {
		this.menuIsVisible = false;
		this.$emit('closed');
	}

	/**
	 * Opens the menu immediately
	 */
	openMenu() {
		this.menuIsVisible = true;
		this.$emit('opened');
	}

	/**
	 * Shows the menu or sets a timer to hide it
	 *
	 * @param {boolean} show = The boolean to set this.menuIsVisible
	 */
	showMenu(show: boolean): void {
		let self = this;
		if (show === true) {
			if (self.menuTimer) clearInterval(self.menuTimer);
			self.openMenu();
		} else {
			self.menuTimer = setTimeout(() => {
				self.closeMenu();
			}, self.closeDelay);
		}
	}

}

</script>

<style lang="scss"></style>