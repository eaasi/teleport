<template>
	<div @click="handleClickEvent">
		<svg
			class="bookmark"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="45"
			height="45"
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
						stroke="#43ADD8"
						stroke-width="6"
						stroke-linejoin="round"
					>
						<g id="surface1 1">
							<path d="M127.28,165.12c-0.60469,0 -1.19594,-0.16125 -1.73344,-0.47031l-39.54656,-23.07219l-39.54656,23.07219c-1.06156,0.61813 -2.37844,0.63156 -3.44,0.01344c-1.075,-0.61813 -1.73344,-1.74688 -1.73344,-2.98313v-151.36c0,-1.89469 1.54531,-3.44 3.44,-3.44h82.56c1.90813,0 3.44,1.54531 3.44,3.44v151.36c0,1.23625 -0.65844,2.365 -1.73344,2.98313c-0.52406,0.30906 -1.11531,0.45687 -1.70656,0.45687z" />
						</g>
					</g>
					<g
						:fill="fillColor"
						stroke="none"
						stroke-width="1"
						stroke-linejoin="miter"
					>
						<g id="surface1">
							<path d="M127.28,165.12c-0.60469,0 -1.19594,-0.16125 -1.73344,-0.47031l-39.54656,-23.07219l-39.54656,23.07219c-1.06156,0.61813 -2.37844,0.63156 -3.44,0.01344c-1.075,-0.61813 -1.73344,-1.74688 -1.73344,-2.98313v-151.36c0,-1.89469 1.54531,-3.44 3.44,-3.44h82.56c1.90813,0 3.44,1.54531 3.44,3.44v151.36c0,1.23625 -0.65844,2.365 -1.73344,2.98313c-0.52406,0.30906 -1.11531,0.45687 -1.70656,0.45687z" />
						</g>
					</g>
				</g>
			</g>
		</svg>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Watch} from 'vue-property-decorator';
import Vue from 'vue';

	/**
	 * A clickable Bookmark for a SelectableCard
	 */
	@Component({
		name: 'Bookmark',
	})
	export default class Bookmark extends Vue {

		@Prop({ type: Boolean, default: false })
		readonly initState: boolean;

		/* Data
        ============================================*/
		isActive: Boolean = this.initState;

		/* Computed
        ============================================*/
		get fillColor() : String {
			// $dark-blue
			return this.isActive ? '#2479AA' : 'white';
		}

		get dashSize() : Number {
			return this.isActive ? 0 : 9;
		}

		/* Methods
        ============================================*/
		handleClickEvent() : void {
			this.isActive = !this.isActive;
			this.$emit('bookmarked', this.isActive);
		}

		/* Watcherss
        ============================================*/
		@Watch('initState')
		onWatchChange(newValue, oldValue) {
			if (oldValue !== newValue) {
				this.isActive = this.initState;
			}
		}
	}

</script>

<style lang="scss">
</style>