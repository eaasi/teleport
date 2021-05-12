<template>
	<div class="options-box">
		<div class="ob-header" v-if="header">
			<span>{{ header }}</span>
		</div>

		<div class="ob-content">
			<div class="ob-name text-center">
				<div :class="`ob-icon fas fa-${icon}`" v-if="icon"></div>
				<span v-if="title">{{ title }}</span>
			</div>

			<div class="ob-desc text-center">
				<slot></slot>
			</div>
		</div>

		<div class="ob-footer" v-if="hasFooter()">
			<div class="ob-footer-break"></div>
			<div class="ob-footer-content">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A reusable styled content wrapper
 * @example ../../docs/OptionsBox.Example.md
 */
@Component({
	name: 'OptionsBox',
})
export default class OptionsBox extends Vue {

	/* Props
	============================================*/

	// Optional header text
	@Prop({type: String, required: false})
	readonly header: String;

	// Optional name text
	@Prop({type: String, required: false})
	readonly title: String;

	// Optional icon name
	@Prop({type: String, required: false})
	readonly icon: String;

	hasFooter() {
		return this.$slots.footer;
	}
}

</script>

<style lang="scss">
.options-box {
	background-color: lighten($light-neutral, 80%);
	border-radius: 1rem;
	height: 100%;
	overflow: hidden;
	position: relative;

	.ob-name {
		color: $dark-blue;
		font-size: 1.6rem;
		font-weight: bold;
		margin-bottom: 1rem;

		.fal {
			display: block;
			font-size: 2.4rem;
			margin-bottom: 0.5rem;
		}
	}

	.ob-desc {
		font-size: 1.5rem;
		height: 5rem;
		line-height: 1.5em;
		padding: 1rem;
	}

	.ob-header {
		background-color: $light-blue;
		color: #FFFFFF;
		font-size: 1.1rem;
		padding: 0.4rem 1rem;
		position: absolute;
		text-align: center;
		text-transform: uppercase;
		top: 0;
		width: 100%;
	}

	.ob-content {
		padding: 4rem 2rem 1rem;
	}

	.ob-footer-content {
		padding: 2rem 2rem 3rem;
	}

	.ob-footer-break {
		background-color: #E2EBF0;
		height: 2px;
		margin: 0 1rem;
	}
}

.ob-icon {
	margin-right: 1rem;
}
</style>