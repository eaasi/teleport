<template>
	<div class="component-loader">
		<svg
			viewBox="0 0 38 38"
			xmlns="http://www.w3.org/2000/svg"
			width="48px"
			height="48px"
			:stroke="color"
			class="cl-svg"
		>
			<g fill="none" fill-rule="evenodd">
				<g transform="translate(1 1)" stroke-width="2">
					<circle stroke-opacity=".25" cx="18" cy="18" r="18" />
					<path d="M36 18c0-9.94-8.06-18-18-18">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 18 18"
							to="360 18 18"
							dur="0.8s"
							repeatCount="indefinite"
						/>
					</path>
				</g>
			</g>
		</svg>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

/**
 * A loading component with an animated spinner that covers a component
 */
@Component({
	name: 'ComponentLoader'
})
export default class ComponentLoader extends Vue {
	@Prop({ required: false, type: String })
	color: string = '#888888';

	height: string = '32px';
	width: string = '32px';
}
</script>

<style lang="scss">
	.component-loader {
		background-color: lighten($light-blue, 90%);
		height: 100%;
		opacity: 0.5;
		position: absolute;
		width: 100%;

		.cl-svg {
			left: 40%;
			position: absolute;
			top: 32%;
		}
	}
</style>