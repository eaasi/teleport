<template>
	<div id="runningTask">
		<div class="rtl-header padded-xl">
			<div class="container-xs">
				<div class="flex-row justify-between">
					<h1>Running Tasks</h1>
				</div>
			</div>
		</div>
		<div class="padded-xl container-xs">
			<running-task-list />
		</div>
	</div>
</template>


<script lang="ts">
import AdminScreen from '@/components/admin/AdminScreen.vue';
import RunningTaskList from '@/components/admin/running-tasks/RunningTaskList.vue';
import { Component } from 'vue-property-decorator';

@Component({
	name: 'RunningTaskManagement',
	components: { RunningTaskList }
})
export default class RunningTaskManagement extends AdminScreen {
	/* Computed
	============================================*/

	/* Data
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/
}

</script>
<style lang="scss">
	.rtl-header {
		background-color: lighten($light-neutral, 60%);
		padding-bottom: 2.5rem;

		h1 {
			font-size: 1.8rem;
		}
	}
</style>