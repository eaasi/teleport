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
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A Card showing information about an Error, Warning, Success, or Info
 * @example ../docs/AlertCard.Example.md
 */
@Component({
	name: 'AlertCard'
})
export default class AlertCard extends Vue {

/* Props
============================================*/
// Type of alert
@Prop({type: String, required: true})
readonly type: string
}
</script>

<style lang="scss">
	.card-container {
		border-top: 2px solid $lighter-grey;
		font-size: 0.9em;
		line-height: 1.5em;
		padding: 16px;
		width: 230px;

		&.error {
			background-color: $lighter-red;
			color: $darker-red;
		}

		&.warning {
			background-color: #FFF;
			color: $darker-red;
		}

		&.info {
			background-color: $lighter-sky-blue;
			color: $dark-sky-blue;
		}

		&.success {
			background-color: $lighter-success-green;
			color: $darker-success-green;
		}

		.icon {
			font-size: 2em;
			padding: 0 0 12px 0;
		}
	}
</style>
