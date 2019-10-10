<template>
	<div class="environment-import-metadata-fast">
		<div class="row">
			<div class="col-md-12">
				<text-input
					label="Name"
					placeholder="Enter a name or title for this resource"
					:readonly="readonly"
					v-model="title"
				/>
			</div>
			<div class="col-md-6">
				<select-list
					label="Operating System Type"
					placeholder="Select OS Type..."
					:readonly="readonly"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<select-list
					label="Operating System Version"
					placeholder="Select OS Version..."
					:readonly="readonly"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';

@Component({
	name: 'EnvironmentImportMetadataFast',
})
export default class EnvironmentImportMetadataFast extends Vue {

	/* Props
	============================================*/

	/**
	 * Pass-through as readonly attribute to all form fields
	 */
	@Prop({type: Boolean, required: false})
	readonly readonly: boolean

	/* Computed
	============================================*/

	@Sync('import/environment@title')
	readonly title: string

}

</script>

<style lang="scss"></style>