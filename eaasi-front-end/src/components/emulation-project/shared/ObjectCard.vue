<template>
	<div class="object-card">
		<h4>{{ title }}</h4>
		<div class="flex flex-row">
			<tag-group position="left" :tags="objectTags" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import LabeledItem from '@/components/global/LabeledItem/LabeledItem.vue';
import { ITag } from '@/types/Tag';

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
			icon: 'fa-file',
			color: 'white'
		});
		tagGroup.push({
			text: this.archiveLabel,
			icon: 'fa-file',
			color: 'white'
		});
		return tagGroup;
	}

	/* Data
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/
}
</script>

<style lang='scss'>
.object-card {
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