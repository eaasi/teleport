<template>
	<div class="software-version-form">
		<div class="row">
			<div class="col-md-12">
				<text-input
					label="Version Name"
				/>
			</div>
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
			<div class="col-md-6">
				<select-list
					label="Date Published"
				/>
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
					label="Includes (native or available versions)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';


@Component({
	name: 'SoftwareVersionForm',
})
export default class SoftwareVersionForm extends Vue { }

</script>

<style lang="scss"></style>