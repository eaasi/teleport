<template>
	<div class="db-links-container padded">
		<div class="row">
			<div class="col-md-4">
				<div class="db-links-column">
					<h2>My Node Activity</h2>
					<div class="db-links-subheading">
						New and updated resources from your Node
					</div>
					<div class="db-links-btn">
						<ui-button
							@click="$emit('click:node')"
							icon="chevron-right"
							icon-right
							secondary
							stretch
							size="md"
						>
							See ALL Node Resources
						</ui-button>
						<selectable-card :data="exampleResource" />
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="db-links-column">
					<h2>Network Activity</h2>
					<div class="db-links-subheading">
						Network Activity on your Node
					</div>
					<div class="db-links-btn">
						<ui-button
							@click="$emit('click:node')"
							icon="chevron-right"
							icon-right
							secondary
							stretch
							size="md"
						>
							See ALL Network Resources
						</ui-button>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="db-links-column">
					<h2>My Resources</h2>
					<div class="db-links-subheading">
						Resources available on your Node
					</div>
					<div class="db-links-btn">
						<ui-button
							@click="$emit('click:node')"
							icon="chevron-right"
							icon-right
							secondary
							stretch
							size="md"
						>
							See ALL My Resources
						</ui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IEaasiResourceSummary} from '@/types/Resource';

@Component({
	name: 'DashboardLinks'
})
export default class DashboardLinks extends Vue {
	exampleResource: IEaasiResourceSummary = {
		content: {OS: 'Windows 98 SE', SOFTWARE: 'Microsoft Word 97', MACHINE:'???' },
		subContent: {CREATED: '03-06-18', BY: 'Yale University Library'},
		tagGroup: [{icon: 'box', key: 1, value: 'ENVIRONMENT'}],
		id: 1,
		title: 'Windows 98 SE + Microsoft Office 97 (Placeholder)'
	}

	exampleNetworkActivity: IEaasiResourceSummary[] = [
		{
			content: {ACTIVITY: 'Lorem Ipsum', MACHINE:'???' },
			subContent: {CREATED: '03-06-18', BY: 'Yale University Library'},
			tagGroup: [],
			id: 1,
			title: 'Placholder'
		},
		{
			content: {ACTIVITY: 'Lorem Ipsum', MACHINE:'???' },
			subContent: {CREATED: '03-06-18', BY: 'Yale University Library'},
			tagGroup: [],
			id: 1,
			title: 'Placholder'
		},
		{
			content: {ACTIVITY: 'Lorem Ipsum', MACHINE:'???' },
			subContent: {CREATED: '03-06-18', BY: 'Yale University Library'},
			tagGroup: [],
			id: 1,
			title: 'Placholder'
		},
	]

	exampleMyResources: IEaasiResourceSummary[] = [
		{
			content: {ACTIVITY: 'Lorem Ipsum', MACHINE:'???' },
			subContent: {CREATED: '03-06-18', BY: 'Yale University Library'},
			tagGroup: [],
			id: 1,
			title: 'Placholder'
		},
		{
			content: {ACTIVITY: 'Lorem Ipsum', MACHINE:'???' },
			subContent: {CREATED: '03-06-18', BY: 'Yale University Library'},
			tagGroup: [],
			id: 1,
			title: 'Placholder'
		},
		{
			content: {ACTIVITY: 'Lorem Ipsum', MACHINE:'???' },
			subContent: {CREATED: '03-06-18', BY: 'Yale University Library'},
			tagGroup: [],
			id: 1,
			title: 'Placholder'
		},
	]
}
</script>

<style lang="scss">
	.db-links-container {
		background-color: lighten($light-neutral, 80%);

		.db-links-column {
			display: flex;
			flex-direction: column;
		}

		.db-links-subheading {
			background-color: lighten($light-neutral, 50%);
			border-top: 3px solid darken($light-neutral, 10%);
			font-size: 1.6rem;
			padding: 2.2rem 1.2rem;
		}

		.db-links-btn {
			margin: 1.2rem 0;
		}
	}

</style>