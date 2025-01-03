<template>
	<div class="inline-block">
		<div class="flex-row bookmark" @click="handleClickEvent">
			<svg
				class="bookmark"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="36px"
				height="36px"
				viewBox="0 0 172 172"
			>
				<g transform="translate(4.988,4.988) scale(0.942,0.942)">
					<g
						fill="none"
						fill-rule="nonzero"
						stroke-linecap="butt"
						stroke-miterlimit="10"
						:stroke-dasharray="dashSize"
						stroke-dashoffset="8"
						font-size="none"
						style="mix-blend-mode: normal;"
					>
						<g
							fill="#00d33e"
							stroke="#2479AA"
							stroke-width="9"
							stroke-linejoin="round"
						>
							<g id="surface1 1">
								<path d="M127.28,165.12c-0.60469,0 -1.19594,-0.16125 -1.73344,-0.47031l-39.54656,-23.07219l-39.54656,23.07219c-1.06156,0.61813 -2.37844,0.63156 -3.44,0.01344c-1.075,-0.61813 -1.73344,-1.74688 -1.73344,-2.98313v-151.36c0,-1.89469 1.54531,-3.44 3.44,-3.44h82.56c1.90813,0 3.44,1.54531 3.44,3.44v151.36c0,1.23625 -0.65844,2.365 -1.73344,2.98313c-0.52406,0.30906 -1.11531,0.45687 -1.70656,0.45687z" /></g></g><path
							d="M0,172v-172h172v172z"
							fill="none"
							stroke="none"
							stroke-width="1"
							stroke-linejoin="miter"
						/>
						<g
							:fill="fillColor"
							stroke="none"
							stroke-width="1"
							stroke-linejoin="miter"
						>
							<g id="surface1">
								<path d="M127.28,165.12c-0.60469,0 -1.19594,-0.16125 -1.73344,-0.47031l-39.54656,-23.07219l-39.54656,23.07219c-1.06156,0.61813 -2.37844,0.63156 -3.44,0.01344c-1.075,-0.61813 -1.73344,-1.74688 -1.73344,-2.98313v-151.36c0,-1.89469 1.54531,-3.44 3.44,-3.44h82.56c1.90813,0 3.44,1.54531 3.44,3.44v151.36c0,1.23625 -0.65844,2.365 -1.73344,2.98313c-0.52406,0.30906 -1.11531,0.45687 -1.70656,0.45687z" /></g></g><path
							d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z"
							fill="none"
							stroke="none"
							stroke-width="1"
							stroke-linejoin="miter"
						/>
						<path
							d="M86,168.56c-45.59663,0 -82.56,-36.96337 -82.56,-82.56v0c0,-45.59663 36.96337,-82.56 82.56,-82.56v0c45.59663,0 82.56,36.96337 82.56,82.56v0c0,45.59663 -36.96337,82.56 -82.56,82.56z"
							fill="none"
							stroke="none"
							stroke-width="1"
							stroke-linejoin="miter"
						/>
						<path
							d=""
							fill="none"
							stroke="none"
							stroke-width="1"
							stroke-linejoin="miter"
						/>
						<path
							d=""
							fill="none"
							stroke="none"
							stroke-width="1"
							stroke-linejoin="miter"
						/>
					</g>
				</g>
			</svg>
			<span class="add-remove-message">
				{{ actionMessage }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

	/**
	 * A small clickable Bookmark component
	 * @example ../docs/SmallBookmark.Example.md
	 */
	@Component({
		name: 'SmallBookmark',
	})
export default class SmallBookmark extends Vue {

		/* Data
        ============================================*/
		isActive: Boolean = false;

		/* Computed
        ============================================*/
		get fillColor() : String {
			return this.isActive ? '#00d33e' : 'white';
		}

		get dashSize() : Number {
			return this.isActive ? 0 : 12;
		}

		get actionMessage() {
			return this.isActive ? 'Remove Bookmark' : 'Add Bookmark';
		}

		/* Methods
        ============================================*/
		handleClickEvent() : void {
			this.isActive = !this.isActive;
			this.$emit('bookmarked', this.isActive);
		}
}
</script>

<style lang="scss">
	.bookmark {
		cursor: pointer;
		position: relative;
	}

	.add-remove-message {
		color: $green;
		font-size: 1.5rem;
		line-height: 3rem;
		padding-left: 4px;
	}
</style>
