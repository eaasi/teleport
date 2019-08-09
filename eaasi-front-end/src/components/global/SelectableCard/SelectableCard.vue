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
import {IResource} from '@/types/Resource';
import Tag from '../Tag.vue';
import Checkbox from '../../forms/Checkbox.vue';
import Bookmark from './Bookmark.vue';
import SelectableCardContent from './SelectableCardContent.vue';

/**
 * A Card for displaying information that can be selected or bookmarked
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
		@Prop({type: Object as () => IResource, required: true})
		data: IResource

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
		margin-bottom: 1px;
		border: .5px solid $lighter-grey;
	}

	.resource-object-container {
		position: relative;
		display: flex;
		flex-direction: row;
		width: 420px;
		min-height: 80px;
		margin-top: 12px;
		border: 1px solid $light-sky-blue;

		&.selected {
			border: 2px solid $sky-blue;
			background-color: $light-sky-blue;
		}

		.bookmark {
			position: absolute;
			right: 0;
			top: 1px;
		}
	}

	.panel-left {
		width: 32px;
		background-color: $lighter-sky-blue;

		&.selected {
			background-color: $light-sky-blue;
		}
	}

	.panel-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 10px;
		width: 100%;

		&.selected {
			background-color: $lighter-sky-blue;
		}

		.header {
			font-size: 1.06em;
			color: $dark-sky-blue;
		}

		.content {
			padding-top: 9px;
			width: 85%;
		}
	}

	.panel-footer {
		display: flex;
		justify-content: space-between;
		padding-top: 10px;
		bottom: 8px;
	}
</style>