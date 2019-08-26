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
		display: inline-block;
		color: #666666;
		margin: 0 4px 4px 0;
		line-height: $defaultLineHeight;
	}

	.value {
		display: inline-block;
		color: $grey;
		padding-right: 24px;
		line-height: $defaultLineHeight;
	}
</style>
