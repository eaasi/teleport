<template>
	<div class="ob-footer-container">
		<div class="ob-footer-break">
			<hr />
		</div>
		<div class="ob-footer-content">
			<slot>
			</slot>
		</div>
	</div>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * Footer for OptionsBox component
 * @example ../docs/OptionsBox.Example.md
 */
@Component({
	name: 'OptionsBoxFooter'
})
export default class OptionsBoxFooter extends Vue {

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
</style>
