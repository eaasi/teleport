<template>
	<div class="ob-footer-container">
		<hr />
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
		align-content: center;
	}

	.ob-footer-content {
		align-content: center;
		display: flex;
		flex-direction: row;
		padding: 1rem;
	}
</style>
