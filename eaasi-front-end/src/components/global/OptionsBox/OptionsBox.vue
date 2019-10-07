<template>
	<div class="options-box">
		<div class="ob-header" v-if="header">
			<span>{{ header }}</span>
		</div>

		<div class="ob-content">
			<div class="ob-name text-center" v-if="optionName">
				<span>{{ optionName }}</span>
			</div>

			<div class="ob-desc text-center">
				<slot></slot>
			</div>

			<div class="ob-footer-container" v-if="hasFooter()">
				<div class="ob-footer-break">
					<hr />
				</div>
				<div class="ob-footer-content">
					<slot name="footer">
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import OptionsBoxFooter from '@/components/global/OptionsBox/OptionsBoxFooter.vue';

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
	readonly header: String

	// Optional name text
	@Prop({type: String, required: false})
	readonly optionName: String

	hasFooter() {
		return this.$slots.footer;
	}
}

</script>

<style lang="scss">
.options-box {
	background-color: lighten($light-neutral, 80%);
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	min-width: 32rem;
	overflow: hidden;
	position: relative;

	.ob-content {
		display: flex;
		flex-direction: column;
		margin-top: auto;
		padding: 2.8rem 1.2rem;

		.ob-name {
			color: $dark-blue;
			font-size: 1.6rem;
			font-weight: bold;
			padding: 0.4rem 0 1.4rem 0;
		}

		.ob-desc {
			font-size: 1.5rem;
			margin: auto;
			width: 75%;
		}

		.ob-footer {
			display: flex;
			flex-direction: column;
			text-align: center;
		}
	}

	.ob-header {
		background-color: $light-blue;
		color: #FFFFFF;
		font-size: 1.1rem;
		padding: 0.4rem 1rem;
		text-align: center;
		text-transform: uppercase;
		width: 100%;
	}

	.ob-footer-container {
		display: flex;
		flex-direction: column;
		padding: 1.2rem 0;
	}

	.ob-footer-break {
		margin: 0.9rem 0;
	}

	.ob-footer-content {
		display: flex;
		justify-content: center;
	}
}
</style>