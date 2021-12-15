<template>
	<modal
		@close="$emit('close')"
		@click:cancel="$emit('close')"
		size="small"
	>
		<template #header>
			<div class="cm-modal-header">
				<h3>Change Media</h3>
			</div>
		</template>
		<div class="scrollable-wrapper">
			<div class="media-items-wrapper flex flex-center flex-column">
				<div
					v-for="group in labeledItemGroup"
					:key="group.title"
					:class="['media-item relative', { active: group.items[1].value === selectedMediaId }]"
					@click="select(group.items[1].value)"
				>
					<h4 class="group-title">
						{{ group.title }}
					</h4>
					<labeled-item-list :labeled-items="group.items" />
				</div>
			</div>
		</div>
		<template #footer>
			<div class="footer-btn-wrapper">
				<div class="flex-row pull-right">
					<ui-button @click="$emit('close')" color-preset="light-blue">
						Cancel
					</ui-button>
					<ui-button
						@click="$emit('change-media', selectedMediaId)"
						:disabled="!selectedMediaId"
					>
						Change
					</ui-button>
				</div>
			</div>
		</template>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { ILabeledItem, ILabeledItemGroup } from '@/types/ILabeledItem';
import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';

@Component({
    name: 'ChangeMediaModal',
    components: {
        LabeledItemList
    }
})
export default class ChangeMediaModal extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Array })
    mediaItems: any[];

    /* Computed
    ============================================*/
    get labeledItemGroup(): ILabeledItemGroup[] {
		if (!this.mediaItems.length) return [];
		let mediaItems: ILabeledItemGroup[] = [{
			title: '0 - empty',
			items: [
				{ label: 'Resource', value: '*' },
				{ label: 'Media Label', value: 'empty' }
			]
		}];

		this.mediaItems.forEach((item, index) => {
			mediaItems.push({
				title: `${index + 1} - ${item.type}`,
				items: [{
					label: 'Resource',
					value: item.dataResourceType
				},
				{
					label: 'Media Label',
					value: item.id
				}]
			});
		});

		return mediaItems;
    }

    /* Data
    ============================================*/
	selectedMediaId: string = null;
	select(mediaId: string) {
		this.selectedMediaId = mediaId;
	}

}
</script>

<style lang='scss'>

.cm-modal-header {
	border-bottom: 4px solid darken($light-neutral, 10%);
	padding: 2rem 0 0.5rem 1rem;
}
.scrollable-wrapper {
	max-height: 50rem;
	overflow-x: hidden;
	overflow-y: scroll;
	position: relative;
}

.media-items-wrapper {
	padding: 1rem 0;

	.media-item {
		cursor: pointer;
		margin-bottom: 2.2rem;
		width: 55rem;

		&.active {
			.lil-container {
				border: 2px solid $teal;
				position: relative;
				.selected-icon {
					color: $green;
					font-size: 16px;
					position: absolute;
					right: 1rem;
					top: 1rem;
				}
			}
		}

		.group-title {
			font-weight: bold;
			left: 1.5rem;
			position: absolute;
			top: -1rem;
		}

		.lil-container {
			background-color: #ffffff;
			border: 2px solid lighten($teal, 80%);
			border-radius: 6px;
			min-height: 5rem;
			padding: 2rem;
		}
	}
}
.footer-btn-wrapper {
	background-color: lighten($light-neutral, 80%);
	border-top: 2px solid darken($light-neutral, 10%);
	min-height: 4rem;
	padding: 2rem;
}
</style>