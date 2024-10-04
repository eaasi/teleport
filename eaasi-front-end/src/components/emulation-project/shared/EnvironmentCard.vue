<template>
	<div class="environment-card">
		<div class="environment-title">
			{{ environment.title }}
		</div>
		<div class="flex flex-row">
			<tag-group
				position="left"
				:tags="environmentTags"
			/>
		</div>
		<div class="flex flex-row flex-wrap content">
			<labeled-item
				v-for="item in labeledItems"
				:key="item.label"
				:labeled-item="item"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Get } from 'vuex-pathify';
import { Component } from 'vue-property-decorator';
import {archiveTypes, translatedIcon} from '@/utils/constants';
import { ILabeledItem } from '@/types/ILabeledItem';
import { ITag } from '@/types/Tag';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import LabeledItem from '@/components/global/LabeledItem/LabeledItem.vue';

@Component({
	name: 'EnvironmentCard',
	components: {
		LabeledItem
	}
})
export default class EnvironmentCard extends Vue {

	/* Props
	============================================*/

	/* Computed
	============================================*/
	@Get('emulationProject/environment')
	environment: EmulationProjectEnvironment;

	get environmentTags(): ITag[] {
		let tagGroup = [];
		tagGroup.push({
			text: 'Content Environment',
			icon: translatedIcon('file'),
			color: 'white'
		});
		if (this.environment.archive === archiveTypes.PUBLIC) {
			tagGroup.push({
				icon:  translatedIcon('map-marker'),
				color: 'white',
				text: 'Saved'
			});
		} else if (this.environment.archive === archiveTypes.DEFAULT) {
			tagGroup.push({
				icon:  translatedIcon('cloud-download'),
				color: 'white',
				text: 'Private'
			});
		}
		return tagGroup;
	}

	/* Data
	============================================*/
	labeledItems: ILabeledItem[] = [];

	/* Methods
	============================================*/
	setLabeledItems(): void {
		let labeledItems: ILabeledItem[] = [];
		if (this.environment.os) {
			labeledItems.push({
				label: 'Operating System',
				value: this.environment.os
			});
		}
		if (this.environment.installedSoftwareIds?.length) {
			labeledItems.push({
				label: 'Installed Software:',
				value: this.environment.installedSoftwareIds.map(software => software.label).join(', '),
			});
		}
		if (this.environment.emulator) {
			labeledItems.push({
				label: 'Machine',
				value: this.environment.emulator
			});
		}
		if (this.environment.installedSoftwareIds?.length) {
			labeledItems.push({
				label: 'Content',
				value: this.environment.installedSoftwareIds.map(software => software.label).join(', '),
			});
		}
		this.labeledItems = labeledItems;
	}

	/* Lifecycle Hooks
	============================================*/
	beforeMount() {
		this.setLabeledItems();
	}

}
</script>

<style lang='scss'>
.environment-card {
	background: #ffffff;
	border: 1px solid lighten($dark-neutral, 50%);
	border-radius: 0.2rem;
	padding: 0.5rem 1rem;

	.environment-title {
		color: lighten($dark-blue, 30%);
		font-weight: 500;
		padding: 0.5rem 0 1rem 0;
	}

	.footer {
		border-top: 1px solid $dark-light-grey;
		color: $dark-neutral;
		font-size: 1.2rem;
		font-weight: 500;
		padding-top: 0.5rem;
	}

	.content {
		padding: 1rem 0;

		.li-container {
			margin-right: 8rem;
			margin-top: 0.5rem;

			.li-value {
				border: none;
				margin: 0.5rem 0;
				padding-bottom: 0.5rem;
			}

			.li-label {
				margin-top: 0;
			}
		}
	}
}
</style>