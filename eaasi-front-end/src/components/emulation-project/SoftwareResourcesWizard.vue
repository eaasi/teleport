<template>
	<div class="srw-container">
		<attach-resource-card title="software" />
	</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

/**
 * Provides Wizard to Add Software Resources
 */
@Component({
	name: 'SoftwareResourcesWizard'
})
export default class SoftwareResourcesWizard extends Vue {
}

</script>

<style lang="scss">
	.srw-container {
		border-radius: 1rem;
		display: flex;
		padding: 1.2rem 0;
	}
</style>
