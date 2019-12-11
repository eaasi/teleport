<template>
	<modal 
		@close="$emit('close')"
		@click:cancel="$emit('close')"
	>
		<template #header>
			<h3>Change Media</h3>
		</template>
		<div class="media-items-wrapper flex flex-row justify-between">
			<div
				v-for="item in labeledMediaItems"
				:key="item.id"
				:class="['media-item', { active: selectedMediaItem === item[1].value }]"
				@click="selectedMediaItem = item[1].value"
			>
				<span v-if="selectedMediaItem === item[1].value" class="fas fa-check selected-icon"></span>
				<labeled-item-list :labeled-items="item" />
			</div>
		</div>
		<template #footer>
			<div class="flex-row pull-right" style="padding: 1rem;">
				<ui-button @click="$emit('close')" color-preset="light-blue">
					Cancel
				</ui-button>
				<ui-button @click="$emit('change-media', selectedMediaItem)" :disabled="!selectedMediaItem">
					Change
				</ui-button>
			</div>
		</template>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { removeDuplicatesFromFlatArray } from '@/utils/functions';
import { ILabeledItem } from '../../types/ILabeledItem';
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
    get labeledMediaItems() {
		const labeledMediaItems = this.mediaItems.map(i => 
			[{
                label: 'Resource',
                value: i.type
            },
            {
                label: 'Media Label',
                value: i.id
			}]
		);
		if (labeledMediaItems.length) {
			labeledMediaItems.push(
				[
					{ label: 'Resource', value: '*' }, 
					{ label: 'Media Label', value: 'empty' }
				]
			);
		}
		return labeledMediaItems;
    }

    /* Data
    ============================================*/
    selectedMediaItem: string = null;

}
</script>

<style lang='scss'>
.media-items-wrapper {
	flex-wrap: wrap;
	max-height: 50rem;

	.media-item {
		border: 2px solid lighten($teal, 80%);
		border-radius: 6px;
		cursor: pointer;
		margin-bottom: 2.2rem;
		width: 35rem;
		&.active {
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
		.lil-container {
			background-color: #ffffff;
			min-height: 5rem;
			padding: 1rem;
		}
	}
}
</style>