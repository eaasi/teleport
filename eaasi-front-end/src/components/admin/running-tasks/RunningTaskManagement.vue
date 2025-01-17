<!--
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
			<div class="running-task-list">
				<task-list />
			</div>
		</div>
	</div>
</template>


<script lang="ts">
import AdminScreen from '@/components/admin/AdminScreen.vue';
import { Component } from 'vue-property-decorator';
import TaskList from './TaskList.vue';

@Component({
	name: 'RunningTaskManagement',
	components: {
		TaskList
	}
})
export default class RunningTaskManagement extends AdminScreen {}

</script>
<style lang="scss">
	.rtl-header {
		background-color: #c0c2c3;
		display: block;
		font-weight: 300;
		margin-bottom: 0;
		padding: 3rem 3rem 1rem;
	}

	.running-task-list {
		.task-list-wrapper .task-list {
			max-height: 50rem;
		}
	}
</style>
-->