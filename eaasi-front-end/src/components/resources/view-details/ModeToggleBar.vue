<template>
	<div class="mtb-container">
		<toggle-pill @check="toggleSelect" />
		<div class="mtb-mode">
			{{ toggleMode }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import TogglePill from '@/components/global/TogglePill.vue';

@Component({
	name: 'ModeToggleBar',
	components: {TogglePill}
})
export default class ModeToggleBar extends Vue {
	toggleMode: string = 'Review Mode'

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