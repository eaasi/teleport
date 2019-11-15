<template>
	<div class="software-form">
		<div class="row">
			<div class="col-md-12">
				<text-input
					label="Software Name"
					placeholder="Enter a name or title for this resource..."
					rules="required"
					v-model="title"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<text-input
					label="Local Identifier"
					placeholder="Enter an identifier..."
					v-model="localIdentifier"
				/>
			</div>
			<div class="col-md-6">
				<text-input
					label="Local Identifier Source"
					placeholder="Enter source..."
					v-model="localIdentifierSource"
				/>
			</div>
			<div class="col-md-6">
				<text-input
					label="Version"
					placeholder="Enter the software version..."
					v-model="version"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { Sync } from 'vuex-pathify';

@Component({
	name: 'SoftwareGeneralInfoForm',
})
export default class SoftwareGeneralInfoForm extends Vue {

	/* Computed
	============================================*/

	@Sync('import/software@title')
	title: string;

	@Sync('import/software@localIdentifier')
	localIdentifier: string;

	@Sync('import/software@localIdentifierSource')
	localIdentifierSource: string;

	@Sync('import/software@version')
	version: string;
}

</script>

<style lang="scss"></style>