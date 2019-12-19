<template>
	<div :class="['resource-object-container flex', selectStyle]">
		<div v-if="bookmark && !isLoading">
			<bookmark
				class="bookmark"
				:init-state="isBookmarkSelected"
				@bookmarked="isActive => $emit('bookmarked', isActive)"
			/>
		</div>

		<div v-if="!disableSelect" :class="['panel-left', selectStyle]">
			<checkbox :value="isSelected" @input="toggleSelected" />
		</div>

		<div :class="['panel-right', selectStyle]">
			<div :class="['header', { clickable: isClickable }]" @click="handleClick">
				{{ title }}
			</div>

			<div class="content">
				<selectable-card-content :content-data="contentData" />
			</div>

			<div v-if="hasSubContent">
				<hr class="subcontent-divider" />
				<selectable-card-content :content-data="subContentData" />
			</div>

			<div v-if="isLoading" class="panel-footer loading-tag">
				<tag text="Saving to Node" icon="fa-spinner fa-spin" color="yellow" />
			</div>

			<div v-if="footer && !isLoading" class="panel-footer">
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
import Bookmark from './Bookmark.vue';
import SelectableCardContent from './SelectableCardContent.vue';
import Checkbox from '@/components/global/forms/Checkbox.vue';

/**
 * A Card for displaying information that can be selected or bookmarked
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
		data: IEaasiResourceSummary;

		@Prop({type: Boolean, required: false, default: false})
		bookmark: boolean;

        @Prop({type: Boolean, required: false, default: false})
		footer: boolean;

        @Prop({type: Boolean, required: false, default: false})
		isLoading: boolean;

		@Prop({ type: Boolean, default: false })
		isBookmarkSelected: boolean;

        @Prop({type: Boolean, required: false, default: false})
        disableSelect: boolean;

        @Prop({type: Boolean, required: false, default: false})
		isClickable: boolean;
		
		@Prop({ type: Boolean, default: false })
		isSelected: boolean;

		/* Data
        ============================================*/
		title: string = '';
		contentData: object = {};
		subContentData: object = {};
        error = {};

        /* Computed
        ============================================*/
        get hasError() : boolean {
        	return !!this.error;
        };

        get selectStyle() : string {
        	return this.isSelected ? 'selected' : '';
        }

        get hasSubContent() : boolean {
        	return !!this.subContentData;
        }

        /* Methods
		============================================*/

        toggleSelected(isSelected) : void {
        	this.$emit('input', isSelected);
        	this.$emit('change', isSelected);
        }

        buildResourceData() {
        	if (this.data) {
        		this.title = this.data.title;
        		this.contentData = this.data.content;
        		this.subContentData = this.data.subContent;
        	}
        }

        handleClick() {
        	if (this.isClickable) {
				this.$emit('click:header');
			}
		}

        /* Lifecycle Hooks
		============================================*/

        created() {
        	this.buildResourceData();
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
		border: 2px solid lighten($light-blue, 70%);
		margin-bottom: 1.5rem;
		min-height: 8rem;
		position: relative;

		&.selected {
			background-color: lighten($light-blue, 90%);
			border: 2px solid $light-blue;
		}

		.bookmark {
			position: absolute;
			right: 0;
			top: 2px;
		}
	}

	.panel-left {
		background-color: lighten($light-blue, 70%);
		padding: 0.5rem;

		&.selected {
			background-color: lighten($light-blue, 50%);
		}
	}

	.panel-right {
		border-left: none;
		padding: 10px;
		width: 100%;

		&.selected {
			background-color: lighten($light-blue, 90%);
		}

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