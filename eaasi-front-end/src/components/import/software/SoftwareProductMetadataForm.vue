<template>
	<div class="software-product-metadata-form">
		<text-input
			label="Software Product Name"
		/>
		<text-area-input
			label="Software Product Description"
		/>
		<text-input
			label="Alternate Name"
		/>
		<text-input
			label="Software Type"
		/>
		<text-area-input
			label="Includes"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';


@Component({
	name: 'SoftwareProductMetadataForm',
})
export default class SoftwareProductMetadataForm extends Vue { }

</script>

<style lang="scss"></style>