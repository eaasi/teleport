<template>
	<section id="edHistory">
		<div class="padded">
			<resource-details-revision-list
				:revisions="revisions"
				@rowClick="openRevisionDetails"
			/>
		</div>
	</section>
</template>

<script lang="ts">
import ResourceDetailsRevisionList
	from '@/components/resources/view-details/history/ResourceDetailsRevisionList.vue';
import {IEnvironmentRevision} from '@/types/Resource';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component({
	name: 'ResourceDetailsHistory',
	components: {
		ResourceDetailsRevisionList
	}
})
export default class ResourceDetailsHistory extends Vue {
	/* Data
    ============================================*/

	/* Props
    ============================================*/
	@Prop({ required: false })
	revisions?: IEnvironmentRevision[];

	/* Computed
    ============================================*/

	/* Methods
    ============================================*/
	openRevisionDetails() {
		console.log('todo: open revision details');
	}

	/* Lifecycle Hooks
    ============================================*/
}
</script>

<style lang="scss">
</style>
