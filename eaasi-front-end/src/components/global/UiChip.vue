<template>
	<div class="ui-chip flex-row">
		<span class="ui-chip-content">
			<slot></slot>
		</span>
		<div class="close-icon-container" v-if="close" @click="$emit('close')">
			<span class="fas fa-times"></span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A general chip for UI interaction
 * @example ../docs/UiChip.Example.md
 */
@Component({
	name: 'UiChip'
})
export default class UiChip extends Vue {

	/* Props
    ============================================*/

	/**
	 * Add close button
	 */
	@Prop({type: Boolean, required: false, default: false})
    readonly close: boolean;
}
</script>

<style lang='scss'>
.ui-chip {
	background-color: $light-green-background;
	border-radius: 20px;
	padding: 0.2rem 0.8rem;

	&:hover {
		background-color: $green;
	}

	.ui-chip-content {
		padding: 0.7rem;
		white-space: nowrap;
	}

	.close-icon-container {
		cursor: pointer;
		font-size: 0.8em;
		padding: 0.7rem 0 0.7rem 0.7rem;
	}
}
</style>