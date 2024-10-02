<template>
	<div :class="['eaasi-alert', color, stylePreset, { card }]">
		<div :class="['flex-row justify-between', { clickable: collapsable }]" @click="collapse">
			<div class="flex-row">
				<div class="icon" v-if="!noIcon">
					<span :class="`fas fa-${icon}`"></span>
				</div>
				<div class="eaasi-alert-content">
					<slot></slot>
				</div>
			</div>
			<div class="collapse clickable" v-if="isCollapsable">
				<span :class="`fas fa-chevron-${collapsed ? 'down' : 'up'}`"></span>
			</div>
		</div>
		<div class="eaasi-alert-details" v-if="hasDetails && !collapsed">
			<slot name="details"></slot>
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
	 * Adds border and border-radius when true)
	 */
	@Prop({type: String, required: false})
	readonly stylePreset: string;

	/**
	 * Apply card styles (padding and background-color)
	 */
	@Prop({type: Boolean, required: false})
	readonly card: boolean;

	/**
	 * Makes details slot collapsible
	 */
	@Prop({type: Boolean, required: false})
	readonly collapsable: boolean;

	/**
	 * Determines the icon and font color
	 */
	@Prop({ validator: isValidAlert, required: false })
	type: AlertType;

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
		/*case 'success':
			return 'green';
		case 'error':
			return 'red';
		case 'info':
			return 'blue';
		case 'warning':
			return 'orange';*/
		default:
			return '';
		}
	}

	/**
	 * Return true if details slot is populated
	 */
	get hasDetails(): boolean {
		return !!this.$slots['details'];
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

	/**
	 * Return true if details slot is populated
	 */
	get isCollapsable(): boolean {
		return this.collapsable && this.hasDetails;
	}

	/* Data
	============================================*/

	collapsed: boolean = this.isCollapsable;

	/* Methods
	============================================*/

	collapse() {
		if(!this.isCollapsable) return;
		this.collapsed = !this.collapsed;
	}

};
</script>

<style lang="scss">
.eaasi-alert {
	font-size: 1.6rem;
	line-height: 2.2rem;
	text-align: left;
	user-select: none;

	.collapse {
		font-size: 1.8rem;
	}

	&.card {
		border-left: 2px solid #DDDDDD;
		min-width: 230px;
		padding: 16px;
	}

	&.bordered {
		border: solid 2px #DDDDDD;
		border-radius: 1rem;
		padding: 16px;
	}

	&.border-right {
		border-left: 2px solid $orange;
		padding: 1rem;
	}

	&.red {
		color: darken($red, 35%);
		&.card {
			background-color: lighten($red, 85%);
			border-color: darken($red, 10%);
		}
	}

	&.orange {
		color: darken($orange, 40%);
		&.card {
			background-color: lighten($orange, 90%);
			border-color: darken($orange, 40%);
		}
	}

	&.neutral {
		color: darken($light-neutral, 30%);
		&.card {
			background: transparent;
			border-color: darken($light-neutral, 30%);
		}
	}

	&.blue {
		color: $dark-blue;
		&.card {
			background-color: lighten($light-blue, 80%);
			border-color: $dark-blue;
		}
	}

	&.green {
		color: darken($green, 20%);
		&.card {
			background-color: lighten($green, 95%);
			border-color: darken($green, 20%);
		}
	}

	.icon {
		font-size: 1.4em;
		margin-right: 1rem;
		padding: 0;
	}

	.eaasi-alert-details {
		color: #222222;
		line-height: 1.3em;
		margin-top: 1rem;
	}
}
</style>