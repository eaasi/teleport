<template>
	<div>
		<numbered-steps :steps="numberedSteps1" />
		<numbered-steps :steps="numberedSteps2" class="darker" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NumberedSteps from '../global/NumberedSteps/NumberedSteps.vue';
@Component({
	components: {NumberedSteps}
})
export default class NumberedStepsTest extends Vue {

	// Mock Data for displaying different numbered steps examples
	numberedSteps1 = [
		{
			stepNumber: 1,
			description: 'METADATA',
			isComplete: true
		},
		{
			stepNumber: 2,
			description: 'FILES',
			isComplete: false
		},
		{
			stepNumber: 3,
			description: 'FINISH',
			isComplete: false
		},
	]

	numberedSteps2 = [
		{
			stepNumber: 1,
			description: 'ONE STEP',
			isComplete: true
		},
		{
			stepNumber: 2,
			description: 'ANOTHER STEP',
			isComplete: true
		},
		{
			stepNumber: 3,
			description: 'AND ANOTHER',
			isComplete: true
		},
		{
			stepNumber: 4,
			description: 'HERE WE GO',
			isComplete: false
		},
	]
}
</script>

<style lang="scss">
	.darker {
		background-color: #F9F3EE;
	}
</style>
