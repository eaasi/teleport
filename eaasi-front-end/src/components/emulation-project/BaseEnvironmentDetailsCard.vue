<template functional>
	<div class="template-card-container">
		<div class="bedc-title">
			Template Details
		</div>
		<div class="bedc-container">
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
	.template-card-container {
		background-color: lighten($light-neutral, 75%);
		border: 2px solid lighten($light-neutral, 50%);
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 0.9em;
		line-height: 1.5em;
		padding: 2.2rem 1.8rem;
		width: 100%;
	}

	.bedc-title {
		font-size: 1.2rem;
		font-weight: bold;
		padding-bottom: 0.8rem;
		text-transform: uppercase;
	}

	.bedc-row {
		display: flex;
		justify-content: flex-start;
		width: 100%;
	}

	.bedc-col {
		display: flex;
		flex-direction: column;
		padding: 0px 12px;
		width: 50%;
	}

	.bedc-kv {
		border-bottom: 2px solid lighten($dark-neutral, 80%);
	}

	.bedc-key {
		color: lighten($dark-neutral, 50%);
		font-size: 1.2rem;
		padding: 1.2rem 0 0.6rem 0;
		text-transform: uppercase;
	}

	.bedc-value {
		font-size: 1.5rem;
	}
</style>
