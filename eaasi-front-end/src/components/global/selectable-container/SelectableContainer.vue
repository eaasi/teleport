<template>
	<div :class="['selectable-icon-container flex flex-column', selectStyle]">
		<div v-if="!disableSelect" :class="['panel-top flex flex-row justify-between', selectStyle]">
			<checkbox :value="isSelected" @input="toggleSelected" />
			<div style="flex: 1; text-align: center;">
				{{ title }}
			</div>
		</div>
		<div class="content" @click="toggleSelected(!isSelected)">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Checkbox from '@/components/global/forms/Checkbox.vue';

/**
 * A Card for displaying information that can be selected or bookmarked
 * @example ../../docs/SelectableCard.Example.md
 */
@Component({
	name: 'SelectableContainer',
	components: {
        Checkbox,
	}
})
export default class SelectableContainer extends Vue {

	/* Props
	============================================*/
	@Prop({ type: String, required: true })
	readonly title: string;

	@Prop({type: Boolean, default: false })
	readonly disableSelect: boolean;

	@Prop({type: Boolean, default: true})
	readonly isClickable: boolean;

	@Prop({ type: Boolean, default: false })
	readonly isSelected: boolean;

	@Prop({ type: String, default: 'lg' })
	readonly iconSize: string;

	/* Computed
	============================================*/
	get selectStyle() : string {
		return this.isSelected ? 'selected' : '';
	}

	/* Methods
	============================================*/

	toggleSelected(isSelected) : void {
		this.$emit('input', isSelected);
		this.$emit('change', isSelected);
	}

}
</script>

<style lang="scss">
	hr {
		border: 0.5px solid #DDDDDD;
		margin-bottom: 1px;
	}

	.selectable-icon-container {
		background-color: #FFFFFF;
		border: 2px solid black;
		cursor: pointer;
		margin-bottom: 1.5rem;
		min-height: 8rem;
		position: relative;

		&.selected {
			background-color: $light-grey;
			border: 2px solid $green;
		}

		.content {

			&.lg {

				.eaasi-icon-container {
					font-size: 3rem;
				}
			}
		}
	}

	.panel-top {
		background-color: $green-background;
		padding: 0.2rem 0.5rem 0.5rem 0.5rem;

		&.selected {
			background-color: $green;
			color: black;
		}
	}

	.panel-right {
		border-left: none;
		padding: 10px;
		width: 100%;

		.header {
			color: $dark-green;
			font-size: 1.6rem;
			line-height: 2rem;
			padding-right: 4.5rem;

			.loading-icon {
				margin-left: 1rem;
			}
		}

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
		margin-top: 1.4rem;
	}

</style>