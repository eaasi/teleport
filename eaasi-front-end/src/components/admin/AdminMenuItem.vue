<template>
	<router-link
		:to="item.route"
		class="admin-menu-item flex-row"
		active-class="admin-menu--active"
		data-test="admin-menu-item"
	>
		<div class="admin-menu-icon" @click="() => handleClick()">
			<span :class="`fas fa-fw fa-${item.icon}`"></span>
		</div>
		<p class="txt-sm no-mb" @click="() => handleClick()">
			{{ item.label }}
		</p>
	</router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IMenuItem } from 'eaasi-nav';

@Component
export default class AdminMenuItem extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IMenuItem, required: true})
	readonly item: IMenuItem

	/* Methods
	============================================*/

	handleClick() {
		if(!this.item.onClick) return;
		this.item.onClick();
	}

}
</script>

<style lang="scss">
a.admin-menu-item {
	color: $dark-neutral;
	cursor: pointer;
	position: relative;
	text-decoration: none;
	user-select: none;

	p {
		color: $dark-light-grey;
		font-size: 1.5rem;
		padding: 1.2rem 0;
		transition: color 0.1s;

		&:hover {
			color: black;
		}
	}

	span.fas {
		color: $dark-light-grey;
		font-size: 1.4rem;
		margin-right: 8px;

		&:hover {
			color: black;
		}
	}
}
</style>