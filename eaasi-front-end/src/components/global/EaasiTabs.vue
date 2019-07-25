<template>
	<div class="eaasi-tabs">
		<ul>
			<li
				v-for="(t, i) in tabs"
				:key="i"
				:class="{active: t.label === value}"
				@click="selectTab(t)"
			>
				{{ t.label }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiTab } from '@/types/Navigation';

@Component({
	name: 'EaasiTabs'
})
export default class EaasiTabs extends Vue {
	@Prop({type: Array, required: true}) readonly tabs: Array<IEaasiTab> // List of tabs
	@Prop({type: String, required: true}) readonly value: string // Active tab label (use v-model)

	selectTab(tab: IEaasiTab) {
		this.$emit('input', tab.label);
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
		background-color: lighten($light-neutral, 80%);
		box-sizing: border-box;
		color: $dark-blue;
		cursor: pointer;
		display: inline-block;
		padding: .8rem 1.6rem;
		position: relative;
		text-align: center;
		width: 175px;
		transition: background-color $animation-time, color $animation-time;

		&:before {
			background-color: $dark-blue;
			content: "";
			display: block;
			position: absolute;
			height: 4px;
			top: -4px; left: 0;
			width: 0;
			transition: width $animation-time;
		}

		&.active {
			background-color: lighten($light-blue, 80%);
			color: $dark-neutral;
			&:before {
				width: 100%;
			}
		}
	}
}
</style>