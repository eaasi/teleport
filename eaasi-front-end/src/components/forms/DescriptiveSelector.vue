<template>
	<div :class="['descriptive-selector', { checked }]" @click="$emit('input', selectableOption.id)">
		<div class="ds-info">
			<h3>{{ selectableOption.title }}</h3>
			<p>{{ selectableOption.description }}</p>
		</div>
		<div class="ds-footer">
			<div :class="['ds-checkbox', { checked }]"></div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'DescriptiveSelector',
})
export default class DescriptiveSelector extends Vue {

	/* Props
	============================================*/

	/**
	 * A selectable object
	 */
	@Prop({type: Object as () => any, required: true})
	readonly selectableOption: any

	/**
	 * The underlying value
	 */
	@Prop({type: Number, required: false})
	readonly value: number;

	/* Computed
	============================================*/
	get checked() {
		return this.selectableOption.id === this.value;
	}
}

</script>

<style lang="scss">
.descriptive-selector {
	background-color: #FFFFFF;
	border: solid 2px $light-blue;
	border-radius: 10px;
	box-sizing: border-box;
	color: $dark-blue;
	cursor: pointer;
	overflow: hidden;
	text-align: center;
	transition: background-color 0.3s;

	&.checked {
		background-color: lighten($light-blue, 80%);

		.ds-footer {
			background-color: lighten($light-blue, 50%);
		}
	}

	p {
		color: $dark-neutral;
	}

	.ds-info {
		padding: 1.5rem;
	}

	.ds-icon {
		font-size: 2.5rem;
		margin-bottom: 6px;
	}

	.ds-footer {
		background-color: lighten($light-blue, 90%);
		border-top: solid 2px $light-blue;
		padding: 1rem;
		transition: background-color 0.3s;
	}

	.ds-checkbox {
		border: solid 2px $light-blue;
		border-radius: 50%;
		display: inline-block;
		height: 1.6rem;
		padding: 2px;
		width: 1.6rem;

		&.checked {
			background-color: $light-blue;
			box-shadow: inset 0px 0px 2px 2px #FFFFFF;
		}
	}
}
</style>