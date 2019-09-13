<template>
	<div class="crw-container">
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

/**
 * Provides Wizard to Add Software Resources
 */
@Component({
	name: 'ContentResourcesWizard'
})
export default class ContentResourcesWizard extends Vue {
    /**
     * Title of the View
     */
    @Prop({ required: true, type: String })
    title: string

    /**
     * Returns true if there is content in the actions slot
     */
    hasActions() {
    	return this.$slots.actions;
    }
}

</script>

<style lang="scss">
	.crw-container {
		padding: 1.2rem;
	}
</style>
