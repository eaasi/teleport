<template>
	<div class="env-import-os-netadata">
		<div class="row">
			<div class="col-md-6">
				<select-list
					label="Operating System Type"
				>
					<option></option>
				</select-list>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<select-list
					label="Operating System Version"
				>
					<option></option>
				</select-list>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<text-area-input
					label="Operating System Description"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<text-input
					label="Version Number"
				/>
			</div>
			<div class="col-md-6">
				<text-input
					label="Is Version Of"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<text-input
					label="Alternate Identifier"
				/>
			</div>
			<div class="col-md-6">
				<text-input
					label="Alternate Identifier Source"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<select-list
					label="Date Published"
				>
					<option></option>
				</select-list>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<text-input
					label="License"
				/>
			</div>
			<div class="col-md-12">
				<text-input
					label="Programming Language"
				/>
			</div>
			<div class="col-md-12">
				<text-input
					label="Developer"
				/>
			</div>
			<div class="col-md-12">
				<text-input
					label="Includes (Native or Available Versions)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'EnvironmentImportOSMetadata',
})
export default class EnvironmentImportOSMetadata extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>