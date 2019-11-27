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
			<div class="left-menu-icon">
				<eaasi-icon :icon="item.icon" class="icon-teal" />
			</div>
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
		color: #FFFFFF;
		cursor: pointer;
		display: block;
		padding: 1.2rem 1rem 1rem 1rem;
		position: relative;
		text-align: center;
		text-decoration: none;
		user-select: none;

		p {
			text-transform: uppercase;
		}

		.icon-teal {
			color: $teal;
			font-size: 4.3rem;
			font-weight: 100;
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
			border-right: 2px solid lighten($teal, 80%);
			color: darken($teal, 60%);

			&::before {
				border-left: 4px solid $teal;
			}
		}
	}

	.left-menu-icon {
		height: 3.8rem;
		padding-bottom: 0.6rem;
	}

	.lmi-divider {
		border-bottom: 4px solid darken($teal, 73%);
	}
</style>