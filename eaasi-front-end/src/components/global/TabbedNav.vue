<template>
	<div class="eaasi-tabs">
		<ul class="flex justify-stretch">
			<li
				v-for="(t, i) in tabs"
				:key="i"
				:class="['no-select', { active: t.label === value.label, disabled: t.disabled }]"
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
	@Prop({type: Object, required: true})
	readonly value: IEaasiTab;

	/* Methods
	============================================*/

	selectTab(tab: IEaasiTab) {
		if (tab.label === this.value.label) return;
		return !tab.disabled && this.$emit('input', tab);
	}
}

</script>

<style lang="scss">
.eaasi-tabs {
	$animation-time: 0.3s;
	border-bottom: solid 4px lighten($dark-neutral, 70%);
	border-top: solid 4px lighten($light-neutral, 10%);
	padding-bottom: 5px;

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		background-color: #FFFFFF;
		box-sizing: border-box;
		flex: 1 1 auto;
		max-width: 24rem;
		padding: 0.5rem;
		position: relative;
		transition: background-color $animation-time, color $animation-time;

		span {
			background-color: lighten($light-neutral, 80%);
			border-radius: 6px;
			box-sizing: border-box;
			color: $dark-blue;
			cursor: pointer;
			display: block;
			padding: 1rem 1.6rem;
			position: relative;
			text-align: center;
			transition: background-color $animation-time, color $animation-time;
		}

		&::before {
			background-color: $dark-blue;
			content: '';
			display: block;
			height: 4px;
			left: 0;
			position: absolute;
			top: -4px;
			transition: width $animation-time;
			width: 0;
		}

		&.active {

			span {
				background-color: lighten($light-blue, 80%);
				color: $dark-neutral;
			}

			&::before {
				width: 100%;
			}
		}

		&.disabled {
			opacity: .5;
			span {
				cursor: not-allowed;
			}
		}
	}
}
</style>