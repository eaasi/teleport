<template>
	<div class="environment-configure-hardware">
		<h3>Configure Hardware</h3>
		<row>
			<column size="6">
				<text-input
					label="RAM"
					rules="required|numeric"
				/>
			</column>
			<column size="6">
				<text-input
					label="CPU Cores"
					rules="required|numeric"
				/>
			</column>
		</row>

		<div class="checkbox-lane flex-row justify-between">
			<checkbox label="Relative Mouse" />
			<i class="far fa-info-circle"></i>
		</div>

		<div class="checkbox-lane flex-row justify-between">
			<checkbox label="Emulator Can Print" />
			<i class="far fa-info-circle"></i>
		</div>

		<div class="checkbox-lane flex-row justify-between">
			<checkbox label="High End Hardware" />
			<i class="far fa-info-circle"></i>
		</div>

		<descriptive-radios
			:options="hardwareOptions"
			v-model="hardware"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'EnvironmentConfigureHardware'
})
export default class EnvironmentConfigureHardware extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/

	hardware: number = 2; // TODO: Temporary
	hardwareOptions = [
		{
			label: 'Low-End Hardware',
			descroption: 'Limited graphics card, etc',
			value: 1
		},
		{
			label: 'Basic Hardware',
			descroption: 'Basic graphics card, etc',
			value: 2
		},
		{
			label: 'High-End Hardware',
			descroption: 'Advanced graphics card, etc',
			value: 3
		}
	]

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>