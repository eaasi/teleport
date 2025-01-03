<template>
	<div class="environment-configure-hardware">
		<h3>Configure Hardware</h3>
		<row>
			<column size="6">
				<text-input
					label="RAM"
					rules="required|numeric"
					value="512"
					required
				/>
			</column>
			<column size="6">
				<text-input
					label="CPU Cores"
					rules="required|numeric"
					value="2"
					required
				/>
			</column>
		</row>

		<div class="mb-lg"></div>

		<div class="checkbox-lane flex-row justify-between">
			<checkbox label="Relative Mouse" />
			<span class="fas fa-info-circle"></span>
		</div>

		<div class="checkbox-lane flex-row justify-between">
			<checkbox label="Emulator Can Print" />
			<span class="fas fa-info-circle"></span>
		</div>

		<div class="checkbox-lane flex-row justify-between">
			<checkbox label="High End Hardware" />
			<span class="fas fa-info-circle"></span>
		</div>

		<div class="mb-lg"></div>

		<descriptive-radios
			:options="hardwareOptions"
			v-model="hardware"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

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
			description: 'Limited graphics card, etc',
			value: 1
		},
		{
			label: 'Basic Hardware',
			description: 'Basic graphics card, etc',
			value: 2
		},
		{
			label: 'High-End Hardware',
			description: 'Advanced graphics card, etc',
			value: 3
		}
	]
}

</script>

<style lang="scss">
.checkbox-lane {
	background-color: $light-grey;
	margin-bottom: 1.5rem;
	padding: 0.5rem;
	label {
		font-weight: bold;
	}
	i {
		color: $green;
		font-size: 2rem;
	}
}
</style>