<template>
	<div class="descriptive-radios row">
		<div :class="`col-sm-${colSize}`" v-for="option in options" :key="option.value">
			<div
				:class="['descriptive-radio', { checked: isChecked(option.value), 'match-height': matchHeight }]"
				@click="$emit('input', option.value)"
			>
				<div class="ds-info">
					<h3>{{ option.label }}</h3>
					<p v-if="option.description">{{ option.description }}</p>
				</div>
				<div class="ds-footer">
					<div :class="['ds-checkbox', { checked: isChecked(option.value) }]"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IRadioOption } from '@/types/Forms';

/**
 * A component to allow selection between two values, with a description
 * @example ../../docs/DescriptiveRadios.Example.md
 */
@Component({
	name: 'DescriptiveRadios',
})
export default class DescriptiveRadios extends Vue {

	/* Props
	============================================*/

	/**
	 * A list of descriptive radio button options
	 */
	@Prop({type: Array, required: true})
	readonly options: IRadioOption[]

	/**
	 * The selected option value for use with v-model directive
	 */
	@Prop({type: Number, required: false})
	readonly value: number;

	/**
	 * Option to match height of descriptive radios
	 */
	@Prop({ type: Boolean, default: false })
	readonly matchHeight: boolean;

	/* Computed
	============================================*/

	get colSize() {
		if(this.options.length <= 3) return 12 / this.options.length;
		return 4;
	}

	/* Methods
	============================================*/

	isChecked(val) {
		return val === this.value;
	}

}

</script>

<style lang="scss">
.descriptive-radio {
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

	&.match-height {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
	}

	h3 {
		user-select: none;
	}

	p {
		color: $dark-neutral;
		user-select: none;
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
			background-color: $dark-blue;
			border: solid 2px $dark-blue;
			box-shadow: inset 0px 0px 2px 2px #FFFFFF;
		}
	}
}
</style>