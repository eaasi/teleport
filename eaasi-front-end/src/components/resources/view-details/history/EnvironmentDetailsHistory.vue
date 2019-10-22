<template>
	<section id="edHistory">
		<div class="padded">
			<environment-details-revision-list
				:revisions="revisions"
				@rowClick="openRevisionDetails"
			/>
		</div>
	</section>
</template>

<script lang="ts">
import EnvironmentDetailsRevisionList
	from '@/components/resources/view-details/history/EnvironmentDetailsRevisionList.vue';
import {IEnvironmentRevision} from '@/types/Resource';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component({
	name: 'EnvironmentDetailsHistory',
	components: {
		EnvironmentDetailsRevisionList
	}
})
export default class EnvironmentDetailsHistory extends Vue {
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
