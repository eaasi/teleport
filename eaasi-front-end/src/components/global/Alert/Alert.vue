<template>
	<div :class="`eaasi-alert ${color}`">
		<div class="icon">
			<i :class="`fas fa-${icon}`"></i>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import isValidAlert from '@/types/validators/AlertType.validator';

/**
 * An alert icon + message combo
 * @example ../../docs/Alert.Example.md
 */
@Component({
	name: 'Alert'
})
export default class Alert extends Vue {

	/**
	 * Determines the icon and font color
	 */
	@Prop({ validator: isValidAlert, required: false })
	type: AlertType

	/* Getters
	============================================*/

	/**
	 * Color based on AlertType
	 */
	get color() {
		switch(this.type) {
		case 'success':
			return 'green';
		case 'error':
			return 'red';
		case 'info':
			return 'blue';
		case 'warning':
			return 'orange';
		default:
			return 'neutral';
		}
	}

	/**
	 * Icon based on AlertType
	 */
	get icon() {
		switch(this.type) {
		case 'success':
			return 'check-circle';
		case 'error':
		case 'warning':
			return 'exclamation-triangle';
		default:
			return 'info-circle';
		}
	}

};
</script>

<style lang="scss">
.eaasi-alert {
	font-size: 0.9em;
	text-align: left;

	&.red {
		color: darken($red, 35%);
	}

	&.orange {
		color: darken($orange, 30%);
	}

	&.neutral {
		color: darken($light-neutral, 30%);
	}

	&.blue {
		color: $dark-blue;
	}

	&.green {
		color: darken($green, 20%);
	}

	.icon {
		font-size: 2em;
		padding: 0 0 6px 0;
	}
}
</style>