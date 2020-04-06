<template>
	<div class="flex flex-row">
		<div :class="['date-picker-wrapper', { active: isStartDateOpen }]">
			<div class="dp-inner">
				<date-picker
					v-model="value.startDate"
					:selectable-year-range="{from: 2019, to: 2020}"
					display-format="DD/MM/YYYY"
					@opened="onStartDateOpen"
				/>
			</div>
		</div>
		<div class="dp-divier">
			&mdash;
		</div>
		<div :class="['date-picker-wrapper', { active: isEndDateOpen }]">
			<div class="dp-inner">
				<date-picker
					v-model="value.endDate"
					:selectable-year-range="{from: 2019, to: 2020}"
					display-format="DD/MM/YYYY"
					@opened="onEndDateOpen"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
    name: 'DateRange'
})
export default class DateRange extends Vue {

    /* Props
	============================================*/
	@Prop({ type: Object as () => IDateRange, required: true })
	value: IDateRange;

    /* Computed
	============================================*/

    /* Data
	============================================*/
	isStartDateOpen: boolean = false;
	isEndDateOpen: boolean = false;

    /* Methods
	============================================*/
	onStartDateOpen(status: boolean) {
		this.isStartDateOpen = status;
	}

	onEndDateOpen(status: boolean) {
		this.isEndDateOpen = status;
	}

    /* Lifecycle Hooks
	============================================*/
	mounted() {

	}

}

export interface IDateRange {
	startDate: string;
	endDate: string;
}
</script>

<style lang='scss'>
.date-picker-wrapper {
	border-bottom: 2px solid $light-blue;
	padding: 0.5rem;

	.dp-inner {
		background: lighten($light-blue, 90%);
		border: 1px solid lighten($light-blue, 90%);
		border-radius: 6px;
		padding: 5px;

		input {
			background: lighten($light-blue, 90%);
			border: none;
			font-size: 14px;
			margin: 0;
			outline: none;
			padding: 0;
		}
	}

	&.active {
		border-bottom: 2px solid $dark-blue;

		.dp-inner {
			background: #ffffff;
			border: 1px solid $light-blue;
		}

		input {
			background: #ffffff;
		}
	}
}
.vdpFloating.vdpPositionTop {
	top: 150%;
}
</style>