<template>
	<div :class="['card-container', props.color]">
		<alert :type="props.type">
			<slot>
			</slot>
		</alert>
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
    /**
     * The color of the alert card
     */
    @Prop({type: String, required: true})
    readonly color: string
}
</script>

<style lang="scss">
	.card-container {
		border-top: 2px solid #DDDDDD;
		font-size: 0.9em;
		line-height: 1.5em;
		padding: 16px;
		width: 230px;

		&.red {
			background-color: lighten($red, 85%);
			color: darken($red, 35%);
		}

		&.orange {
			background-color: lighten($orange, 80%);
			color: darken($orange, 30%);
		}

		&.neutral {
			background-color: lighten($light-neutral, 80%);
			color: darken($light-neutral, 30%);
		}

		&.blue {
			background-color: lighten($light-blue, 80%);
			color: $dark-blue;
		}

		&.green {
			background-color: lighten($green, 95%);
			color: darken($green, 20%);
		}

		&.transparent {
			background: transparent;
			border-top: none;
		}

		.icon {
			font-size: 2em;
			padding: 0 0 12px 0;
		}
	}
</style>
