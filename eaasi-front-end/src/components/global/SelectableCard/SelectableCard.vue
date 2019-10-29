<template>
	<div :class="['resource-object-container flex', selectStyle]">
		<div v-if="bookmark && !isLoading">
			<bookmark class="bookmark" />
		</div>

		<div :class="['panel-left', selectStyle]">
			<checkbox :value="isSelected" @input="toggleSelected" />
		</div>

		<div :class="['panel-right', selectStyle]">
			<div class="header">
				{{ title }}
			</div>

			<div class="content">
				<selectable-card-content :content-data="contentData" />
			</div>

			<div v-if="hasSubContent">
				<hr />
				<selectable-card-content :content-data="subContentData" />
			</div>

			<div v-if="isLoading" class="panel-footer loading-tag">
				<tag text="Loading" icon="fa-spinner fa-spin" color="blue" />
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
	}
})
export default class SelectableCard extends Vue {

		/* Props
        ============================================*/
		@Prop({type: Object as () => IEaasiResourceSummary, required: true})
		data: IEaasiResourceSummary

		@Prop({type: Boolean, required: false, default: false})
		bookmark: boolean

        @Prop({type: Boolean, required: false, default: false})
		footer: boolean

        @Prop({type: Boolean, required: false, default: false})
        isLoading: boolean

		/* Data
        ============================================*/
		title: string = ''
		isSelected: boolean = false
		contentData: object = {}
		subContentData: object = {}
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
        	this.isSelected = isSelected;
        	this.$emit('change', isSelected);
        }

        buildResourceData() {
        	if (this.data) {
        		this.title = this.data.title;
        		this.contentData = this.data.content;
        		this.subContentData = this.data.subContent;
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
		border: solid 2px #FFFFFF;
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
			top: 1px;
		}
	}

	.panel-left {
		background-color: lighten($light-blue, 70%);
		padding: 0.3rem;

		&.selected {
			background-color: lighten($light-blue, 50%);
		}
	}

	.panel-right {
		border: 2px solid lighten($light-blue, 70%);
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
		padding-top: 10px;
	}

	.loading-tag {
		float: right;
	}

</style>