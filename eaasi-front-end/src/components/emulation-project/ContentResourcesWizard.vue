<template>
	<div class="crw-container">
		<attach-resource-card title="content" />
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

/**
 * Provides Wizard to Add Content Resources
 */
@Component({
	name: 'SoftwareResourcesWizard'
})
export default class ContentResourcesWizard extends Vue {
}

</script>

<style lang="scss">
	.crw-container {
		border-radius: 1rem;
		display: flex;
		padding: 1.2rem 0;
	}
</style>

