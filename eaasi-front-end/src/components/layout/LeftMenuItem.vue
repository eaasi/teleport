<template>
	<div>
		<div v-if="item.isDivider" class="lmi-divider">
		</div>
		<router-link
			v-else
			:to="item.route"
			class="left-menu-item medium"
			active-class="active"
			data-test="left-menu-item"
		>
			<p class="txt-sm no-mb">
				{{ item.label }}
			</p>
		</router-link>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';;
	import { Component, Prop } from 'vue-property-decorator';
	import { IMenuItem } from 'eaasi-nav';
	import EaasiIcon from '@/components/global/icons/EaasiIcon.vue';
	@Component({
		components: { EaasiIcon }
	})
	export default class LeftMenuItem extends Vue {
		@Prop({type: Object as () => IMenuItem, required: true})
		readonly item: IMenuItem
	}
</script>

<style lang="scss">
	a.left-menu-item {
		color: $black;
		border-bottom: 2px solid $green;
		cursor: pointer;
		display: block;
		padding: 25px 15px;
		position: relative;
		text-align: center;
		text-decoration: none;
		user-select: none;
		font-weight: 400;

		p {
			font-size: 1.6rem;
		}

		&.active {
			border-right: none;
			font-weight: 700;

			&::after {
				border-left: none;
				bottom: 0;
				background-color: white;
				width: 2px;
				content: '';
				display: block;
				position: absolute;
				right: -2px;
				top: 0;
				transition: background-color 0.3s, border-left 0.3s;
			}
		}
	}
	@media screen and (max-width: 950px) {
		a.left-menu-item {
			padding: 25px 10px;
		}
	}
</style>