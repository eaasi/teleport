<template>
	<div class="environment-card">
		<h4>{{ environment.title }}</h4>
		<div class="flex flex-row">
			<tag-group position="left" :tags="environmentTags" />
		</div>
		<div class="flex flex-row flex-wrap content">
			<!-- <labeled-item :labeled-item="{label: 'Some label', value: 'some value'}" /> -->
			<labeled-item v-for="item in labeledItems" :key="item.label" :labeled-item="item" />
		</div>
		<div></div>
		<div></div>
		<div class="footer flex flex-row">
			<span style="margin-right: 2rem;">
				CREATED 03-06-18
			</span>
			<span>BY: Yale University Library</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { archiveTypes } from '@/utils/constants';
import { ITag } from '@/types/Tag';
import LabeledItem from '@/components/global/LabeledItem/LabeledItem.vue';
import { ILabeledItem } from '@/types/ILabeledItem';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import { Get } from 'vuex-pathify';

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
			text: 'CONTENT ENVIRONMENT',
			icon: 'fa-file',
			color: 'white'
		});
		if (this.environment.archive === archiveTypes.PUBLIC) {
			tagGroup.push({
				icon: 'fa-map-marker-alt',
				color: 'green',
				text: 'SAVED'
			});
		} else if (this.environment.archive === archiveTypes.DEFAULT) {
			tagGroup.push({
				icon: 'fa-cloud-download-alt',
				color: 'green',
				text: 'PRIVATE'
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
	border: 1px solid lighten($light-blue, 60%);
	padding: 1rem 1.4rem;

	h4 {
		color: $dark-blue;
		font-weight: 500;
	}

	.footer {
		border-top: 1px solid darken($light-neutral, 10%);
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