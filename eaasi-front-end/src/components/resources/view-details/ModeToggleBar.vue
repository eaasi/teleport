<template>
	<div class="mtb-container">
		<dual-toggle
			:options="['Review', 'Edit']"
			:value="value"
			@input="changeValue"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import DualToggle from '@/components/global/DualToggle.vue';

@Component({
	name: 'ModeToggleBar',
	components: { DualToggle }
})
export default class ModeToggleBar extends Vue {
	toggleMode: string = 'Review Mode'

	value: string | null = 'Review';

	changeValue(newValue) {
		this.value = newValue;
	}

	toggleSelect(e) {
		if (e) {
			this.toggleMode = 'Edit Mode';
		} else {
			this.toggleMode = 'Review Mode';
		}
	}
};
</script>

<style lang="scss">
	.mtb-container {
		align-items: center;
		background-color: lighten($light-neutral, 40%);
		border-bottom: 2px solid darken($light-neutral, 20%);
		display: flex;
		height: 64px;
		padding-left: 24px;

		.mtb-mode {
			margin-left: 12px;
		}
	}
</style>