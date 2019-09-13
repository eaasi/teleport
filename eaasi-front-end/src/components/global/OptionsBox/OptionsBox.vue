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
			<div class="ob-footer" v-if="hasFooter()">
				<OptionsBoxFooter>
					<slot name="footer">
					</slot>
				</OptionsBoxFooter>
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
 * @example ../docs/OptionsBox.Example.md
 */
@Component({
	name: 'OptionsBox',
	components: {OptionsBoxFooter}
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
	display: inline-block;
	min-width: 32rem;
	overflow: hidden;

	.ob-content {
		padding: 2.4rem;
	}

	.ob-header {
		background-color: $light-blue;
		color: #FFFFFF;
		font-size: 1.1rem;
		padding: 0.4rem 1rem;
		text-align: center;
		text-transform: uppercase;
	}

	.ob-name {
		color: $dark-blue;
		font-size: 1.6rem;
		font-weight: bold;
		margin: auto;
		padding: 0.4rem 0 1.4rem 0;
	}

	.ob-desc {
		font-size: 1.5rem;
	}

	.ob-footer {
		align-content: center;
		align-items: center;
		justify-content: center;
		padding: 1.4rem;
		text-align: center;
	}
}
</style>