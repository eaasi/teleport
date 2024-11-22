<template>
	<div :class="['resource-object-container flex', selectStyle, { disabled } ]">
		<div v-show="!hideGripLines" :class="['panel-left grip-lines', disabled ? '' : 'drag-handler']">
			<span class="fas fa-grip-lines"></span>
		</div>

		<div :class="['panel-right', selectStyle, { clickable: isClickable }]" @click="toggleSelected">
			<div :class="['header', { mb: !data.content }]">
				{{ data.title || data.label }}
			</div>

			<div class="content" v-if="data.content">
				<selectable-card-content :content-data="data.content" />
			</div>

			<div v-if="data.subContent">
				<hr class="subcontent-divider" />
				<selectable-card-content :content-data="data.subContent" />
			</div>

			<div v-if="footer" class="panel-footer">
				<slot name="tagsLeft"></slot>
				<slot name="tagsRight"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary } from '@/types/Resource';
import Tag from '../Tag.vue';
import Bookmark from '../SelectableCard/Bookmark.vue';
import SelectableCardContent from '../SelectableCard/SelectableCardContent.vue';
import Checkbox from '@/components/global/forms/Checkbox.vue';

/**
 * A Card for displaying information that can be selected as a radio option
 * @example ../../docs/SelectableCard.Example.md
 */
@Component({
	name: 'DraggableCard',
	components: {
		SelectableCardContent,
		Bookmark,
		Tag,
		Checkbox
	}
})
export default class SelectableRadioCard extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => IEaasiResourceSummary, required: true})
	readonly data: IEaasiResourceSummary;

	@Prop({type: Boolean, required: false, default: false})
	readonly footer: boolean;

	@Prop({type: Boolean, required: false, default: true})
	readonly isClickable: boolean;

	@Prop({ type: Boolean, required: false })
	readonly value: boolean;

	@Prop({ type: Boolean, default: false })
	readonly disabled: boolean;

	@Prop({ type: Boolean, default: false })
	readonly hideGripLines: boolean;

	/* Computed
	============================================*/
	get selectStyle() : string {
		return this.value ? 'selected' : '';
	}

	/* Methods
	============================================*/
	isChecked(val) {
		return val === this.value;
	}

	toggleSelected() : void {
		this.$emit('input', !this.value);
		this.$emit('change', !this.value);
	}
}
</script>

<style lang="scss">

.ds-checkbox {
	border: solid 2px $medium-grey;
	border-radius: 50%;
	display: inline-block;
	height: 1rem;
	margin: 0.3rem;
	padding: 1.4px;
	width: 1rem;

	&.checked {
		background-color: $dark-light-grey;
		border: solid 1px $dark-light-grey;
	}
}

hr {
	border: 0.5px solid #DDDDDD;
	margin-bottom: 1px;
}

.resource-object-container {
	background-color: #FFFFFF;
	border: 2px solid black;
	margin-bottom: 0.5rem;
	min-height: 7rem;
	position: relative;

	&.selected {
		border: 2px solid $green;
	}
}

.panel-left {
	padding: 0.5rem;

	&.grip-lines {
		align-items: center;
		cursor: grab;
		display: flex;

		span {
			color: $light-green;
		}
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
		padding-right: 10px;

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