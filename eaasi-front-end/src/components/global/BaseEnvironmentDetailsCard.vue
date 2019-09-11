<template functional>
	<div class="card-container">
		<div class="bedc-container">
			<div class="bedc-title">
				Template Details
			</div>
			<div class="bedc-content">
				<div class="bedc-row">
					<div class="bedc-col">
						<div class="bedc-kv">
							<div class="bedc-key">Emulator</div>
							<div class="bedc-value">{{ props.templateDetails.emulator }}</div>
						</div>
						<div class="bedc-kv">
							<div class="bedc-key">CPU Architecture</div>
							<div class="bedc-value">{{ props.templateDetails.cpuArchitecture }}</div>
						</div>
						<div class="bedc-kv">
							<div class="bedc-key">Audio Device</div>
							<div class="bedc-value">{{ props.templateDetails.audioDevice }}</div>
						</div>
					</div>
					<div class="bedc-col">
						<div class="bedc-kv">
							<div class="bedc-key">Network Device</div>
							<div class="bedc-value">{{ props.templateDetails.networkDevice }}</div>
						</div>
						<div class="bedc-kv">
							<div class="bedc-key">CPU Cores</div>
							<div class="bedc-value">{{ props.templateDetails.cpuCores }}</div>
						</div>
						<div class="bedc-kv">
							<div class="bedc-key">GPU Device</div>
							<div class="bedc-value">{{ props.templateDetails.gpuDevice }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * An "Index Card" showing a collection of labeled Base Environment data
 */
@Component({
	name: 'BaseEnvironmentDetailsCard',
})
export default class BaseEnvironmentDetailsCard extends Vue {
	/**
	 * Supplies values for card key-value pairs
	 */
	@Prop({ type: Object, required:true })
	templateDetails
}
</script>

<style lang="scss">
	.card-container {
		background-color: lighten($light-neutral, 75%);
		border-top: 2px solid #DDDDDD;
		font-size: 0.9em;
		line-height: 1.5em;
		padding: 16px;
	}

	.bedc-title {
		font-size: 1.2rem;
		font-weight: bold;
		text-transform: uppercase;
	}

	.bedc-container {
		display: flex;
		flex: 0 0 100%;
		flex-direction: row;
		margin: auto;
	}

	.bedc-row {
		display: flex;
		flex: 0 0 100%;
		flex-direction: row;
		flex-grow: 1;
	}

	.bedc-col {
		display: flex;
		flex-direction: column;
	}

	.bedc-kv {
		border-bottom: 2px solid lighten($dark-neutral, 80%);
		padding: 2.3rem;
	}

	.bedc-key {
		color: lighten($dark-neutral, 50%);
		text-transform: uppercase;
	}

	.bedc-value {
		padding: 2.3rem;
	}

	.bedc-content {
		padding: 2.3rem;
	}
</style>
