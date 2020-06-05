<template>
	<div class="environment-import-metadata-fast">
		<div class="row">
			<div class="col-md-12">
				<text-input
					label="Name"
					rules="required"
					placeholder="Enter a name or title for this resource"
					:readonly="readonly"
					v-model="title"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
@Component({
	name: 'EnvironmentImportMetadataFast',
})
export default class EnvironmentImportMetadataFast extends Vue {

	/* Props
	============================================*/
	/**
	 * Pass-through as readonly attribute to all form fields
	 */
	@Prop({ type: Boolean, required: false })
	readonly readonly: boolean;

	/* Computed
	============================================*/
	@Sync('import/environment@title')
	title: string;

}

</script>

<style lang="scss"></style>