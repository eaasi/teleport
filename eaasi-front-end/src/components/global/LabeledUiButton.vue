<template>
	<div class="labeled-btn-container">
		<div class="labeled-btn-btn">
			<ui-button @click="emitClicked">
				<slot></slot>
			</ui-button>
		</div>
		<div class="labeled-btn-label">
			{{ labelText }}
		</div>
	</div>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A Labeled UI Button
 * @example ../docs/OptionsBox.Example.md
 */
@Component({
	name: 'LabeledUiButton'
})
export default class OptionsBoxFooter extends Vue {

	/* Props
    ============================================*/

    // Function to be called on click event
    @Prop({type: String, required: true})
    readonly clickEventAction: String

    // Label Text
    @Prop({type: String, required: true})
    readonly labelText: String

    emitClicked() {
    	this.$emit('clicked');
    }
}
</script>

<style lang="scss">
	.labeled-btn-label {
		font-size: 1.2rem;
		font-style: italic;
		padding: 1rem 0;
		text-align: center;
	}

	.labeled-btn-btn {
		margin: 1.2rem;
	}
</style>
