<template>
	<div class="base-env-wiz-container">
		<div class="base-env-wiz-opt">
			<options-box optionName="Find a Base">
			</options-box>
		</div>
		<div class="base-env-wiz-opt">
			<options-box optionName="Start from Scratch" header="Less Common">
				Start from scratch
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
		display: flex;
		flex-direction: row;
	}

	.base-env-wiz-opt {
		margin: auto;
	}
</style>
