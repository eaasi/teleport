<template>
	<div class="flex flex-row justify-between slide-menu-btn-wrapper">
		<div
			v-for="(tab, index) in filteredTabs"
			:key="index"
			:class="['btn-wrapper', { 'border-left': index > 0 }]"
		>
			<ui-button
				@click="$emit('open', tab)"
				color-preset="blue-transparent"
				size="sm"
			>
				{{ tab.label }}
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';

@Component({
	name: 'SlideMenuControlButtons'
})
export default class SlideMenuControlButtons extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Array as () => IEaasiTab[], required: true })
	readonly tabs: IEaasiTab[];

	get filteredTabs() {
		return this.tabs.filter(tab => !tab.disabled);
	}

}
</script>

<style lang='scss'>
.slide-menu-btn-wrapper {

	.btn-wrapper {
		position: relative;

		&.border-left {
			border-left: 1px solid darken($light-neutral, 10%);
		}

		button {
			font-size: 1.6rem;
			font-weight: bold;
		}
	}

	.btn-wrapper:after {
		content: "";
		background: $dark-blue;
		position: absolute;
		bottom: 0;
		left: 12%;
		height: 2px;
		width: 76%;
	}

}
</style>