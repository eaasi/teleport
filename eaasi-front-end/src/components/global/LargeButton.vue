<template>
	<div :class="['eb-wrapper', 'size-' + size, { block }]">
		<div
			class="eaasi-large-button"
			role="button"
			@click="$emit('click')"
		>
			<label>{{ label }}</label>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'LargeButton',
})
export default class largeButton extends Vue {

	/* Props
	============================================*/

	/**
	 * Primary label
	 */
	@Prop({type: String, required: true})
	readonly label: string;

	/**
	 * Make display type: block
	 */
	@Prop({type: Boolean, required: false})
	readonly block: boolean;

	/**
	 * Alternative size of the modal. Accepts 'sm, small, lg, or large'
	 */
	@Prop({type: String, required: false, default: 'sm'})
	readonly size: string;
}

</script>

<style lang="scss">
.eb-wrapper {
	max-width: 32rem;

	&.size-sm,
	&.size-small {
		max-width: 27rem;
	}

	&.size-lg,
	&.size-large {
		max-width: 40rem;
	}

	&.block {
		max-width: none;
		width: 100%;
	}
}

.eaasi-large-button {
	background-color: $white;
	border: solid 2px $black;
	color: $black;
	box-shadow: -8px -8px $green, -8px -8px 0px 2px $black;
	cursor: pointer;
	padding: 2.5rem;
	text-align: left;
	transition: background-color 0.3s;

	&.size-sm,
	&.size-small {
		max-width: 24rem;
	}

	&.size-lg,
	&.size-large {
		max-width: 40rem;
	}

	&:hover {
		background-color: $green;
		box-shadow: -8px -8px $black, -8px -8px 0px 2px $black;
	}

	label {
		color: $black;
		font-size: 1.8rem;
		font-weight: bold;
	}
}
</style>