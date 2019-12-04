<template>
	<div class="software-requirements-form">
		<div class="row">
			<div class="col-md-12">
				<text-area-input
					label="Requirements Summary"
				/>
			</div>
			<div class="col-md-6">
				<text-area-input
					label="Required Software"
				/>
			</div>
			<div class="col-md-6">
				<text-area-input
					label="Required Operating System"
				/>
			</div>
			<div class="col-md-6">
				<text-area-input
					label="Required Machine Type"
				/>
			</div>
			<div class="col-md-6">
				<text-area-input
					label="Required Architecture"
				/>
			</div>
		</div>

		<div class="srf-divider">
			Hardware &amp; Peripherals
		</div>

		<div class="row">
			<div class="col-md-6">
				<select-list
					label="Required Pointer Device Type"
				/>
			</div>
			<div class="col-md-6">
				<select-list
					label="Required Storage Device Type"
				/>
			</div>
			<div class="col-md-6">
				<select-list
					label="Required Audio Device"
				/>
			</div>
			<div class="col-md-6">
				<select-list
					label="Required GPU Device"
				/>
			</div>
		</div>

		<div class="srf-divider">
			Hard Drive &amp; Memory
		</div>

		<div class="row">
			<div class="col-md-6">
				<text-input
					label="Minimum RAM"
				/>
			</div>
			<div class="col-md-6">
				<text-input
					label="Minimum Disk Space"
				/>
			</div>
		</div>

		<div class="srf-divider">
			Display
		</div>

		<div class="row">
			<div class="col-md-6">
				<text-input
					label="Display Color Depth"
				/>
			</div>
			<div class="col-md-6">
				<text-input
					label="Display Resolution"
				/>
			</div>
		</div>

		<div class="srf-divider">
			Internet
		</div>

		<div class="row">
			<div class="col-md-6">
				<checkbox
					label="Internet Access Required"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<text-input
					label="Display Resolution"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';


@Component({
	name: 'SoftwareRequirementsForm',
})
export default class SoftwareRequirementsForm extends Vue { }

</script>

<style lang="scss">
.srf-divider {
	border-top: solid 3px $light-neutral;
	margin: 3rem 0 2rem;
	padding-top: 1.5rem;
}
</style>