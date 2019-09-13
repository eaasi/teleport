<template>
	<div class="base-env-wiz-container">
		<div class="base-env-wiz-opt">
			<options-box option-name="Find a Base" >
				Find an existing base environment.
			</options-box>
		</div>
		<div class="base-env-wiz-opt">
			<options-box option-name="Start from Scratch" header="Less Common">
				Use a system template with no configured operating system or software.
			</options-box>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
	name: 'BaseEnvironmentWizard'
})
export default class BaseEnvironmentWizard extends Vue {
}
</script>

<style lang="scss">
	.base-env-wiz-container {
		align-items: stretch;
		display: flex;
		flex-direction: row;
	}

	.base-env-wiz-opt {
		align-self: flex-start;
		margin: 0 1.8rem;
		min-height: 32rem;
	}
</style>
