<template>
	<div :class="['resource-object-container flex', selectStyle, { disabled }]">
<!--		<div v-if="bookmark && !isLoading">
			<bookmark
				class="bookmark"
				:init-state="isBookmarkSelected"
				@bookmarked="isActive => $emit('bookmarked', isActive)"
			/>
		</div>-->

		<div v-if="!disableSelect" :class="['panel-left', selectStyle]">
			<checkbox :value="value" @input="toggleSelected" />
		</div>

		<div :class="['panel-right', selectStyle]">
			<div :class="['header', { clickable: isClickable, mb: !data.content }]" @click="handleClick">
				{{ data.title }}
			</div>

			<div class="content" v-if="data.content">
				<selectable-card-content :content-data="data.content" />
			</div>

			<hr class="subcontent-divider" />

			<div v-if="data.subContent && Object.keys(data.subContent).length !== 0">
				<selectable-card-content
					:content-data="data.subContent"
				/>
			</div>

			<div v-if="isLoading" class="panel-footer loading-tag">
				<tag
					text="Saving to Node"
					external-icon="fa-spinner fa-spin"
					color="yellow"
				/>
			</div>

			<div v-if="footer && !isLoading" class="panel-footer">
				<slot name="tagsLeft"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary } from '@/types/Resource';
import Tag from '../Tag.vue';
import Bookmark from './Bookmark.vue';
import SelectableCardContent from './SelectableCardContent.vue';
import Checkbox from '@/components/global/forms/Checkbox.vue';

/**
 * A Card for displaying information that can be selected and bookmarked
 * @example ../../docs/SelectableCard.Example.md
 */
@Component({
	name: 'SelectableCard',
	components: {
		SelectableCardContent,
		Bookmark,
		Tag,
		Checkbox
	}
})
export default class SelectableCard extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => IEaasiResourceSummary, required: true})
	readonly data: IEaasiResourceSummary;

	@Prop({type: Boolean, required: false, default: false})
	readonly bookmark: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly footer: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly isLoading: boolean;

	@Prop({ type: Boolean, default: false })
	readonly isBookmarkSelected: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly disableSelect: boolean;

	@Prop({type: Boolean, required: false, default: true})
	readonly isClickable: boolean;

	@Prop({ type: Boolean, required: true })
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

	toggleSelected() : void {
		this.$emit('input', !this.value);
		this.$emit('change', !this.value);
	}

	handleClick() {
		if (this.isClickable) {
			this.$emit('click:header');
		}
	}

}
</script>

<style lang="scss">
	hr {
		border: 0.5px solid #DDDDDD;
		margin-bottom: 1px;
	}

	.resource-object-container {
		background-color: #FFFFFF;
		border: 2px solid black;
		margin-bottom: 1.5rem;
		min-height: 7rem;
		position: relative;

		&.selected {
			background-color: $medium-grey;
			border: 2px solid $medium-grey;
		}

		&.disabled {
			opacity: 0.4;
			pointer-events: none;
		}

		.bookmark {
			position: absolute;
			right: 0;
			top: 2px;
		}
	}

	.panel-left {
		background-color: $green;
		padding: 0.5rem;

		&.selected {
			background-color: $medium-green;
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
			font-weight: 400;

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
		border-color: $medium-grey;
		margin-top: 1.4rem;
	}

</style>