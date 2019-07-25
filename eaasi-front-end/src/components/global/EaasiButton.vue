<template>
	<button :class="['eaasi-button', {block, secondary}]" v-on="$listeners" v-bind="$attrs">
		<i :class="`fas fa-${icon} eb-icon`" v-if="icon && !iconRight"></i>
		<slot></slot>
		<i :class="`fas fa-${icon} eb-icon-right`" v-if="icon && iconRight"></i>
	</button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
	name: 'EaasiButton',
	props: {
		block: Boolean, // Make display type: block
		secondary: Boolean, // Use secondary styles
		icon: String, // Font icon name
		iconRight: Boolean // Show icon on right side of slot (instead of left)
	}
})
export default class EaasiButton extends Vue {}
</script>

<style lang="scss">
button.eaasi-button {
	appearance: none;
	background-color: $dark-blue;
	border: solid 2px darken($dark-blue, 20%);
	border-radius: 0.4rem;
	color: #FFF;
	cursor: pointer;
	font-size: 1.6rem;
	outline: none;
	padding: 0.8rem 1.6rem;
	transition: background-color 0.3s;
	min-width: 17.5rem;
	*.block {
		display: block;
		margin: 0 auto;
		max-width: 2.6rem;
	}
	&:hover {
		background-color: darken($dark-blue, 20%);
	}
	&.secondary {
		background-color: lighten($light-blue, 80%);
		border: solid 2px $light-blue;
		color: $dark-blue;
		&:hover {
			background-color: lighten($light-blue, 40%);
		}
	}
	.icon {
		margin-right: .4em;
	}
	.icon-right {
		margin-left: .4rem;
	}
}
</style>