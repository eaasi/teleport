<template>
	<div
		:class="['resource-object-container', selectStyle]"
		@input="toggleSelected"
	>
		<div v-if="bookmark">
			<bookmark class="bookmark" />
		</div>

		<div :class="['panel-left', selectStyle]">
			<checkbox :value="false" />
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
import {IEaasiResource} from '@/types/Resource';
import Tag from '../Tag.vue';
import Checkbox from '../../forms/Checkbox.vue';
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
		Checkbox,
		Tag,
	}
})
export default class SelectableCard extends Vue {
		/* Props
        ============================================*/
		@Prop({type: Object as () => IEaasiResource, required: true})
		data: IEaasiResource

		@Prop({type: Boolean, required: false, default: false})
		bookmark: boolean

        @Prop({type: Boolean, required: false, default: false})
        footer: boolean

		/* Data
        ============================================*/
		title: string = ''
		isSelected: boolean = false

		contentData: object = {}
		subContentData: object = {}

		/* Computed
        ============================================*/
		get selectStyle() : string {
			return this.isSelected ? 'selected' : '';
		}

		get hasSubContent() : boolean {
			return !!this.subContentData;
		}

		/* Methods
        ============================================*/
		toggleSelected(event: boolean) : void {
			this.isSelected = event['srcElement'].checked;
		}

		buildResourceData() {
			this.title = this.data.title;
			this.contentData = this.data.content;
			this.subContentData = this.data.subContent;
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
		border: 2px solid lighten($light-blue, 70%);
		display: flex;
		flex-direction: row;
		margin-top: 12px;
		min-height: 80px;
		position: relative;
		width: 420px;

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
		width: 32px;

		&.selected {
			background-color: lighten($light-blue, 50%);
		}
	}

	.panel-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 10px;
		width: 100%;

		&.selected {
			background-color: lighten($light-blue, 90%);
		}

		.header {
			color: $dark-blue;
			font-size: 1.06em;
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
</style>