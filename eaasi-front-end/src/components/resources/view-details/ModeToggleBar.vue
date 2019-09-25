<template>
	<div class="mtb-container">
		<toggle-pill :options="editModeOptions"/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import TogglePill from '@/components/global/TogglePill.vue';

@Component({
	name: 'ModeToggleBar',
	components: {TogglePill}
})
export default class ModeToggleBar extends Vue {
	editModeOptions: EditModeOption[] = [
		{
			displayName: 'Review Mode',
			value: 'reviewMode',
			icon: 'lock'
		},
		{
			displayName: 'Edit Mode',
			value: 'editMode',
			icon: 'unlock'
		}
	]
};
</script>

<style lang="scss">
	.mtb-container {
		padding: 64px;
	}
</style>