<template>
	<div class="software-form">
		<div class="row">
			<div class="col-md-12">
				<text-input
					label="Software Name"
					placeholder="Enter a name or title for this resource..."
					rules="required"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<text-input
					label="Local Identifier"
					placeholder="Entar an identifier..."
				/>
			</div>
			<div class="col-md-6">
				<text-input
					label="Local Identifier Source"
					placeholder="Entar source..."
				/>
			</div>
			<div class="col-md-6">
				<text-input
					label="Version"
					placeholder="Entar the software version..."
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'SoftwareForm',
})
export default class SoftwareForm extends Vue {

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