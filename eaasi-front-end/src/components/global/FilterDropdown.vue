<template>
	<div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

	/**
	 * A Drop-down menu
	 */
	@Component({
		name: 'FilterDropDown'
	})
export default class FilterDropdown extends Vue {

		/* Data
        ============================================*/
		isActive: boolean = true
		isOpen: boolean = false

		/* Methods
        ============================================*/
		fetchElements() {
		}
}

</script>

<style lang="scss">
</style>
