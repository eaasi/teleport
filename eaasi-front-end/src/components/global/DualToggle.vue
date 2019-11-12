<template>
	<div class="dt-wrapper flex-row">
		<div
			@click="toggle(options[0])"
			:class="['dt-option', {active: value === options[0]}]"
		>
			{{ options[0] }}
		</div>
		<div :class="['dual-toggle', { checked: value === options[1]}]" @click="toggle()">
			<label class="dt-label">
				<span class="dt-inner"></span>
				<span class="dt-switch"></span>
			</label>
		</div>
		<div
			@click="toggle(options[1])"
			:class="['dt-option', {active: value === options[1]}]"
		>
			{{ options[1] }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'DualToggle',
})
export default class DualToggle extends Vue {

	/* Props
	============================================*/

	/**
	 * The value of the field
	 */
	@Prop({type: String, required: true})
	readonly value: string

	@Prop({type: Array, required: true})
	readonly options: string[]

	/* Methods
	============================================*/

	changeVal() {
		let newOpt = this.value === this.options[0]
			? this.options[1]
			: this.options[0];
		this.$emit('input', newOpt);
	}

	toggle(option: string = null) {
		return option ? this.$emit('input', option) : this.changeVal();
	}

	/* Lifecycle Hooks
	============================================*/

	beforeMount() {
		if (!this.options || this.options.length !== 2) {
			console.error('DualToggle requires an options array with two string values');
		}
	}

}

</script>

<style lang="scss">
.dual-toggle {
	margin: 0 0.8rem;
	position: relative;
	user-select: none;
	width: 90px;
}

.dt-option {
	color: darken($dark-blue, 40%);
	font-size: 1.6rem;
	//font-weight: bold;
	opacity: 0.6;
	&.active {
		opacity: 1;
	}
}

.dt-checkbox {
	display: none;
}

.dt-label {
	border: 2px solid $dark-blue;
	border-radius: 20px;
	cursor: pointer;
	display: block;
	overflow: hidden;
}

.dt-inner {
	display: block;
	margin-left: -100%;
	transition: margin 0.2s ease-in 0s;
	width: 200%;
}

.dt-inner::before,
.dt-inner::after {
	box-sizing: border-box;
	color: #FFFFFF;
	display: block;
	float: left;
	font-size: 14px;
	height: 30px;
	line-height: 30px;
	padding: 0;
	width: 50%;
}

.dt-inner::before {
	background-color: $light-blue;
	color: $dark-blue;
	content: '';
	padding-left: 10px;
}

.dt-inner::after {
	background-color: lighten($light-blue, 80%);
	color: $dark-blue;
	content: '';
	padding-right: 10px;
	text-align: right;
}

.dt-switch {
	background: #FFFFFF;
	border: 2px solid $dark-blue;
	border-radius: 20px;
	bottom: 0;
	display: block;
	margin: 4.5px;
	position: absolute;
	right: 56px;
	top: 0;
	transition: all 0.2s ease-in 0s;
	width: 21px;
}

.dual-toggle.checked .dt-label .dt-inner {
	margin-left: 0;
}

.dual-toggle.checked .dt-label .dt-switch {
	right: 0px;
}

</style>