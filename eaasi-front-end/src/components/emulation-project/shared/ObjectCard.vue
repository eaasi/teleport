<template>
	<div class="object-card">
		<div class="object-title">
			{{ title }}
		</div>
		<div class="flex flex-row">
			<tag-group
				position="left"
				:tags="objectTags"
			/>
		</div>
		<div class="flex flex-row flex-wrap content">
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import LabeledItem from '@/components/global/LabeledItem/LabeledItem.vue';
import { ITag } from '@/types/Tag';
import {translatedIcon} from '@/utils/constants';

@Component({
	name: 'ObjectCard',
	components: {
		LabeledItem
	}
})
export default class ObjectCard extends Vue {
	/* Props
	============================================*/
	@Prop({ type: String, required: true })
	readonly title: string;

	@Prop({ type: String, required: true })
	readonly resourceTypeLabel: string;

	@Prop({ type: String, required: true })
	readonly archiveLabel: string;

	/* Computed
	============================================*/

	get objectTags(): ITag[] {
		let tagGroup = [];
		tagGroup.push({
			text: this.resourceTypeLabel,
			icon: translatedIcon('file'),
			color: 'white'
		});
		tagGroup.push({
			text: this.archiveLabel,
			icon: translatedIcon('file'),
			color: 'white'
		});
		return tagGroup;
	}
}
</script>

<style lang='scss'>
.object-card {
	background: #ffffff;
	border: 1px solid lighten($medium-grey, 50%);
	padding: 0.5rem 1rem;

	.object-title {
		color: $green;
		font-weight: 500;
		padding: 0.5rem 0 1rem 0;
	}

	.footer {
		color: $dark-light-grey;
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