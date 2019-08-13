<template functional>
	<div class="options-box">
		<div class="ob-header" v-if="props.header">
			<span>{{ props.header }}</span>
		</div>
		<div class="ob-content text-center">
			<slot></slot>
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

}

</script>

<style lang="scss">
.options-box {
	background-color: lighten($light-neutral, 60%);
	border-radius: 1rem;
	display: inline-block;
	min-width: 320px;
	overflow: hidden;

	.ob-content {
		padding: 1.5rem;
	}

	.ob-header {
		background-color: $light-blue;
		color: #FFF;
		font-size: 1.2rem;
		padding: 2px 10px;
		text-align: center;
		text-transform: uppercase;
	}
}
</style>