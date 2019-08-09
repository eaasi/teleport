<template functional>
	<div :class="['card-container', props.type]">
		<div class="icon">
			<div v-if="props.type === 'error' || props.type === 'warning'">
				<i class="fas fa-exclamation-triangle"></i>
			</div>
			<div v-else-if="props.type === 'success'">
				<i class="fas fa-check-circle"></i>
			</div>
			<div v-else-if="props.type === 'info'">
				<i class="fas fa-info-circle"></i>
			</div>
		</div>

		<div class="content">
			{{ props.text }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A Card showing information about an Error, Warning, Success, or Info
 */
@Component({
	name: 'AlertCard'
})
export default class AlertCard extends Vue {

/* Props
============================================*/
// Text description of the alert
@Prop({type: String, required: true})
readonly text: string

// Type of alert
@Prop({type: String, required: true})
readonly type: string
}
</script>

<style lang="scss">
	.card-container {
		width: 230px;
		line-height: 1.5em;
		border-top: 2px solid $lighter-grey;
		padding: 16px;
		font-size: 0.9em;
	}

	.error {
		color: $darker-red;
		background-color: $lighter-red;
	}

	.warning {
		color: $darker-red;
		background-color: #FFF;
	}

	.info {
		color: $dark-sky-blue;
		background-color: $lighter-sky-blue;
	}

	.success {
		color: $darker-success-green;
		background-color: $lighter-success-green;
	}

	.icon {
		font-size: 2em;
		padding: 0 0 12px 0;
	}
</style>
