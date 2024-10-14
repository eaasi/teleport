<template>
	<div :class="['resource-object-container flex', selectStyle, { disabled }]" @click="toggleSelected">
		<div v-if="!disabled" :class="['panel-left', selectStyle]">
			<checkbox :value="value" />
		</div>
		<div class="selectable-text-card-content">
			<h2>{{ label }}</h2>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">

import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import Checkbox from '@/components/global/forms/Checkbox.vue';

@Component({
	name: 'SelectableTextCard',
	components: {
		Checkbox
	}
})
export default class SelectableTextCard extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Boolean, required: true })
	readonly value: boolean;

	@Prop({ type: Boolean, default: false })
	readonly disabled: boolean;

	@Prop({type: Boolean, required: false, default: true})
	readonly isClickable: boolean;

	@Prop({ type: String, required: true })
	readonly label: string;

	/* Computed
	============================================*/
	get selectStyle() : string {
		return this.value ? 'selected' : '';
	}

	/* Methods
	============================================*/
	isChecked(val) {
		return val === this.value;
	}

	toggleSelected() : void {
		this.$emit('input', !this.value);
		this.$emit('change', !this.value);
	}

}

</script>

<style lang="scss">
hr {
	border: 0.5px solid #DDDDDD;
	margin-bottom: 1px;
}

.resource-object-container {
	background-color: #FFFFFF;
	border: 2px solid $black;
	cursor: pointer;
	margin-bottom: 1.5rem;
	min-height: 7rem;
	position: relative;

	&.selected {
		background-color: $light-grey;
		border: 2px solid $green;
	}

	&.disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.bookmark {
		position: absolute;
		right: 0;
		top: 2px;
	}
}

.panel-left {
	align-items: center;
	background-color: lighten($green, 90%);
	display: flex;
	padding: 0.5rem;

	&.selected {
		background-color: $green;
	}
}

.panel-right {
	border-left: none;
	padding: 10px;
	width: 100%;

	.content {
		padding-top: 9px;
		width: 85%;
	}
}

.panel-footer {
	bottom: 8px;
	display: flex;
	justify-content: space-between;
	padding-top: 1.2rem;
}

.subcontent-divider {
	border-color: $medium-grey;
	margin-top: 1.4rem;
}

.selectable-text-card-content {
	padding: 2rem 1rem;
}

</style>