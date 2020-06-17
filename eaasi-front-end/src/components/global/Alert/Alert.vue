<template>
	<div :class="['eaasi-alert flex-row', color, { card }]">
		<div class="icon" v-if="!noIcon">
			<span :class="`fas fa-${icon}`"></span>
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
	 * Apply card styles (padding and background-color)
	 */
	@Prop({type: Boolean, required: false})
	readonly card: boolean

	/**
	 * Determines the icon and font color
	 */
	@Prop({ validator: isValidAlert, required: false })
	type: AlertType

	/**
	 * Hides icon when true
	 */
	@Prop({type: Boolean, required: false})
	readonly noIcon: boolean

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
	font-size: 1.6rem;
	text-align: left;

	&.card {
		border-left: 2px solid #DDDDDD;
		min-width: 230px;
		padding: 16px;
	}

	&.red {
		color: darken($red, 35%);
		&.card {
			border-color: darken($red, 35%);
			background-color: lighten($red, 85%);
		}
	}

	&.orange {
		color: darken($orange, 40%);
		&.card {
			border-color: darken($orange, 40%);
			background-color: lighten($orange, 90%);
		}
	}

	&.neutral {
		color: darken($light-neutral, 30%);
		&.card {
			border-color: darken($light-neutral, 30%);
			background: transparent;
		}
	}

	&.blue {
		color: $dark-blue;
		&.card {
			border-color: $dark-blue;
			background-color: lighten($light-blue, 80%);
		}
	}

	&.green {
		color: darken($green, 20%);
		&.card {
			border-color: darken($green, 20%);
			background-color: lighten($green, 95%);
		}
	}

	.icon {
		font-size: 1.6em;
		margin-right: 1rem;
		padding: 0;
	}
}
</style>