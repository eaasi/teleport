<template functional>
	<div>
		<span v-for="(value, property) in props.contentData" class="content-container" :key="property">
			<span class="label">
				{{ property }}:
			</span>
			<span class="value">
				{{ value }}
			</span>
		</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A container for SelectableCard content.
 * Presents data provided in a prop object in key-value format.
 */
@Component({
	name: 'SelectableCardContent',
})
export default class SelectableCardContent extends Vue {
    /* Props
    ============================================*/
    @Prop({type: Object, required: false})
    contentData: object
}
</script>

<style lang="scss">
	$defaultFontSize: 0.7em;
	$defaultLineHeight: 1.4em;

	.content-container {
		display: inline-block;
		font-size: $defaultFontSize;
	}

	.label {
		color: #555555;
		display: inline-block;
		line-height: $defaultLineHeight;
		margin: 0 0.5rem 0.5rem 0;
		text-transform: uppercase;
	}

	.value {
		color: $grey;
		display: inline-block;
		line-height: $defaultLineHeight;
		padding-right: 24px;
	}
</style>
