<template>
	<div :class="`eaasi-tabs ${colorPreset}`">
		<ul class="flex justify-stretch">
			<li
				v-for="(t, i) in tabs"
				:key="i"
				:class="['no-select', { active: t.label === value, disabled: t.disabled }]"
				@click="selectTab(t)"
			>
				<span>{{ t.label }}</span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';

/**
 * A component for performing tabbed navigation
 * @example ../docs/TabbedNav.Example.md
 */
@Component({
	name: 'TabbedNav'
})
export default class TabbedNav extends Vue {

	/* Props
	============================================*/

	// List of tabs
	@Prop({type: Array, required: true})
	readonly tabs: IEaasiTab[];

	// Active tab label (use v-model)
	@Prop({type: String, required: true})
	readonly value: string;

	@Prop({ type: String, default: 'default' })
	readonly colorPreset: string;

	/* Methods
	============================================*/

	selectTab(tab: IEaasiTab) {
		if (tab.label === this.value) return;
		return !tab.disabled && this.$emit('input', tab.label);
	}
}

</script>

<style lang="scss">
.eaasi-tabs {
	$animation-time: 0.3s;
	padding: 10px;

	&.clear-white {
		border-bottom: solid 2px $light-grey;
		border-top: none;
		padding-bottom: 3px;

		ul {
			padding: 0 2rem;
		}

		li {
			max-width: 16rem;
			padding: 0;

			span {
				padding: 1rem;
			}

			&::before {
				bottom: -4px;
				top: unset;
			}

			&.active {

				span {
					background-color: #ffffff;
					color: #000000;
				}
			}
		}
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		box-sizing: border-box;
		flex: 1 1 auto;
		max-width: 24rem;
		padding: 0.5rem;
		position: relative;
		transition: background-color $animation-time, color $animation-time;

		span {
			background-color: $medium-grey;
			border-radius: 10px;
			box-sizing: border-box;
			color:  lighten($dark-light-grey, 50%);
			cursor: pointer;
			display: block;
			padding: 1rem 1.6rem;
			position: relative;
			text-align: center;
			transition: background-color $animation-time, color $animation-time;

			&:hover {
				background-color: $green;
				color: black;
			}
		}

		&::before {
			background-color: $light-green-background;
			bottom: -4px;
			content: '';
			display: block;
			height: 4px;
			left: 0;
			position: absolute;
			transition: width $animation-time;
			width: 0;
		}

		&.active {
			span {
				background-color: $light-green-background;
				color: black;

				&:hover {
					background-color: $green;
				}
			}

			&::before {
				width: 100%;

				&:hover {
					background-color: $green;
				}
			}
		}

		&.disabled {
			opacity: 0.5;
			span {
				cursor: not-allowed;
			}
		}
	}
}
</style>