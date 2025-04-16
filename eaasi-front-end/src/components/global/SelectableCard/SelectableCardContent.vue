<template functional>
	<div class="content-container" v-if="props.contentData">
		<span v-for="(value, property) in props.contentData" class="content-sub-container" :key="property">
			<span class="label">
				{{ property }}:&nbsp;
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
	$defaultFontSize: 0.75em;
	$defaultLineHeight: 1.8em;

	.content-container {
		display: inline-block;
		flex-wrap: wrap;
		font-size: $defaultFontSize;
		width: 100%;

		.content-sub-container {
			display: block;

			.label {
				color: $dark-grey;
				line-height: $defaultLineHeight;
				min-width: 25%;
				padding: 3px;
				text-transform: uppercase;
			}

			.value {
				color: $dark-light-grey;
				line-height: $defaultLineHeight;
				min-width: 25%;
				padding-right: 24px;
			}
		}
	}

</style>
