<template>
	<div :class="['resource-object-container flex', selectStyle, { disabled } ]">
		<div :class="['panel-left grip-lines', disabled ? '' : 'drag-handler']">
			<span class="fas fa-grip-lines"></span>
		</div>

		<div :class="['panel-right', selectStyle, { clickable: isClickable }]" @click="toggleSelected">
			<div :class="['header', { mb: !data.content }]">
				{{ data.title }}
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
import { IEaasiResourceSummary } from '@/types/Resource.d.ts';
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
	border: solid 1px $light-blue;
	border-radius: 50%;
	display: inline-block;
	height: 1rem;
	margin: 0.3rem;
	padding: 1.4px;
	width: 1rem;

	&.checked {
		background-color: $dark-blue;
		border: solid 1px $dark-blue;
		box-shadow: inset 0px 0px 2px 2px #FFFFFF;
	}
}

hr {
	border: 0.5px solid #DDDDDD;
	margin-bottom: 1px;
}

.resource-object-container {
	background-color: #FFFFFF;
	border: 1px solid lighten($light-blue, 70%);
	border-radius: 0.5rem;
	margin-bottom: 0.5rem;
	min-height: 7rem;
	position: relative;

	&.selected {
		border: 1px solid darken($light-blue, 20%);
	}
}

.panel-left {
	border-bottom-left-radius: 0.5rem;
	border-top-left-radius: 0.5rem;
	padding: 0.5rem;

	&.grip-lines {
		display: flex;
		align-items: center;
		cursor: grab;

		span {
			color: lighten($dark-blue, 20%);
		}
	}
}

.panel-right {
	border-bottom-right-radius: 0.5rem;
	border-left: none;
	border-top-right-radius: 0.5rem;
	padding: 10px;
	width: 100%;

	.header {
		color: $dark-blue;
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