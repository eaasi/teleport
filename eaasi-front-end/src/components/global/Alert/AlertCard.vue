<template>
	<div :class="['card-container', color]">
		<alert :type="type" ref="_alert">
			<!-- @slot use to inject alert card content -->
			<slot></slot>
		</alert>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import isValidAlert from '@/types/validators/AlertType.validator';
import Alert from './Alert.vue';

/**
 * A Card showing information about an Error, Warning, Success, or Info
 * @example ../../docs/AlertCard.Example.md
 */
@Component({
	name: 'AlertCard',
	components: { Alert }
})
export default class AlertCard extends Vue {

	/**
	 * The type / level of the alert
	 */
	@Prop({validator: isValidAlert, required: true})
	readonly type: AlertType

	/* Getters
	============================================*/

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
}
</script>

<style lang="scss">
.card-container {
	border-top: 2px solid #DDDDDD;
	max-width: 230px;
	padding: 16px;

	&.red {
		background-color: lighten($red, 85%);
	}

	&.orange {
		background-color: lighten($orange, 80%);
	}

	&.blue {
		background-color: lighten($light-blue, 80%);
	}

	&.green {
		background-color: lighten($green, 95%);
	}

	&.neutral {
		background: transparent;
		border-top: none;
	}

	.icon {
		font-size: 2em;
		padding: 0 0 12px 0;
	}
}
</style>
