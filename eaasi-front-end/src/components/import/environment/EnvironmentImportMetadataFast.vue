<template>
	<div class="environment-import-metadata-fast">
		<div class="row">
			<div class="computer-image-form-input">
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
import { Get, Sync } from 'vuex-pathify';
import { ITemplate } from '../../../types/Import';

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

	@Sync('import/environment@chosenTemplateId')
	chosenTemplateId: string;

	@Sync('import/environment@nativeConfig')
	nativeConfig: string;

	@Sync('resource/availableTemplates')
	availableTemplates: ITemplate[];

	@Sync('import/filesToUpload')
	filesToUpload: any[];

	get activeTemplate(): ITemplate {
		return this.availableTemplates.find(template => template.id === this.chosenTemplateId);
	}

	get chosenTemplateEmulator(): string {
		return this.activeTemplate.emulator.bean;
	}

	get chosenTemplateArchitecture(): string {
		return this.activeTemplate.arch;
	}

	/* Lifecycle Hooks
	============================================*/
	async created() {
		await this.$store.dispatch('resource/getTemplates');
	}

	@Watch('activeTemplate')
	onActiveTemplate(nextTemplate: ITemplate, prevTemplate: ITemplate) {
		if (!prevTemplate || (nextTemplate && nextTemplate.id !== prevTemplate.id)) {
			this.nativeConfig = this.activeTemplate.nativeConfig?.value;
		}
	}
}

</script>

<style lang="scss">
.environment-import-metadata-fast {
	.row {
		margin: 0;
		width: -webkit-fill-available;

		.computer-image-form-input {
			width: -webkit-fill-available;
		}
	}
}
</style>