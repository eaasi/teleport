<template functional>
	<router-link
		:to="props.item.route"
		class="left-menu-item medium"
		active-class="active"
		data-test="left-menu-item"
	>
		<div class="left-menu-icon">
			<i :class="`fal fa-${props.item.icon}`"></i>
		</div>
		<p class="txt-sm no-mb">
			{{ props.item.label }}
		</p>
	</router-link>
</template>

<script lang="ts">
import Vue from 'vue';;
import { Component, Prop } from 'vue-property-decorator';
import { IMenuItem } from 'eaasi-nav';

@Component
export default class LeftMenuItem extends Vue {
	@Prop({type: Object as () => IMenuItem, required: true})
	readonly item: IMenuItem
}
</script>

<style lang="scss">
a.left-menu-item {
	color: #FFFFFF;
	cursor: pointer;
	display: block;
	padding: 1.5rem 1rem;
	position: relative;
	text-align: center;
	text-decoration: none;
	user-select: none;

	p {
		text-transform: uppercase;
	}

	i.fal {
		color: $teal;
		font-size: 3.6rem;
	}

	&::before {
		border-left: none;
		bottom: 0;
		content: '';
		display: block;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		transition: background-color 0.3s, border-left 0.3s;
	}

	&.active {
		background-color: #ffffff;
		color: darken($teal, 60%);

		&::before {
			border-left: 4px solid $teal;
		}
	}
}

.left-menu-icon {
	height: 3.8rem;
}
</style>