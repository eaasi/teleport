<template>
	<div>
		<h1>EaaSI Components Sandbox</h1>
		<p>This view displays all EaaSI UI components.</p>
		<div class="section">
			<div class="section">
				<h3>
					Selectable Card
				</h3>
				<hr />
				<div class="content">
					<selectable-card-test />
				</div>
			</div>
			<h3>
				Small Bookmark
			</h3>
			<hr />
			<div class="content">
				<small-bookmark-test style="display: inline-block" />
			</div>
		</div>
		<div class="section">
			<h3>
				Tags
			</h3>
			<hr />
			<div class="content">
				<tags-test />
			</div>
		</div>
		<div class="section">
			<h3>
				Numbered Steps
			</h3>
			<hr />
			<div class="content">
				<numbered-steps-test />
			</div>
		</div>
		<div class="section">
			<h3>
				Alert Cards
			</h3>
			<hr />
			<div class="content">
				<alert-card-test />
			</div>
		</div>
		<div class="section">
			<h3>
				Forms
			</h3>
			<hr />
			<div class="content">
				<form-test />
			</div>
		</div>
		<div class="section">
			<h3>
				Section Headings
			</h3>
			<hr />
			<div class="content">
				<headings-test />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SmallBookmarkTest from './SmallBookmarkTest.vue';
import NumberedStepsTest from './NumberedStepsTest.vue';
import SelectableCardTest from './SelectableCardTest.vue';
import AlertCardTest from './AlertCardTest.vue';
import FormTest from './FormTest.vue';
import HeadingsTest from './SectionHeadingsTest.vue';
import TagsTest from './TagsTest.vue';

@Component({
	components: {
		HeadingsTest,
		SelectableCardTest,
		NumberedStepsTest,
		SmallBookmarkTest,
		AlertCardTest,
		FormTest,
		TagsTest
	}
})
export default class AllComponents extends Vue { }
</script>

<style lang="scss">
	.section {
		padding: 12px;

		.content {
			padding: 12px;
		}
	}
</style>
