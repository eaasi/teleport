<template functional>
	<div class="options-box">
		<div class="ob-header" v-if="props.header">
			<span>{{ props.header }}</span>
		</div>
		<div class="ob-content">
			<div class="ob-name text-center" v-if="props.optionName">
				<span>{{ props.optionName }}</span>
			</div>
			<div class="ob-desc text-center">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A reusable styled content wrapper
 * @example ../docs/OptionsBox.Example.md
 */
@Component({
	name: 'OptionsBox'
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

}

</script>

<style lang="scss">
.options-box {
	background-color: lighten($light-neutral, 60%);
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
		font-size: 1.2rem;
		padding: 0.2rem 1rem;
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
}
</style>