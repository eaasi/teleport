<template>
	<div id="importResource" class="width-lg">
		<h1 class="padded no-mb">Import Resource</h1>
		<import-progress />
		<section class="import-wrapper flex">
			<div class="import-content">
				<import-select v-if="step >= 0" />
				<import-metadata v-if="step >= 1" />
				<import-files v-if="step >= 2" />
				<configure-hardware
					class="padded"
					v-if="showConfigureHardware"
				/>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import ContentImportResource from '@/models/import/ContentImportResource';
import EnvironmentImportResource from '@/models/import/EnvironmentImportResource';
import SoftwareImportResource from '@/models/import/SoftwareImportResource';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import { ResourceImportPath, ImportType } from '@/types/Import';
import ConfigureHardware from './environment/EnvironmentConfigureHardware.vue';
import ImportFiles from './ImportFiles.vue';
import ImportMetadata from './ImportMetadata.vue';
import ImportProgress from './ImportProgress.vue';
import ImportSelect from './ImportSelect.vue';

@Component({
	name: 'ImportResourceScreen',
	components: {
		ConfigureHardware,
		ImportFiles,
		ImportMetadata,
		ImportProgress,
		ImportSelect
	}
})
export default class ImportResourceScreen extends Vue {

	/* Computed
	============================================*/

	@Sync('import/importStep')
	step: number;

	@Sync('import/importPath')
	importPath: ResourceImportPath;

	@Sync('import/importType')
	type: ImportType;

	@Sync('import/environment')
	environmentImport: EnvironmentImportResource;

	@Sync('import/software')
	softwareImport: SoftwareImportResource;

	@Sync('import/content')
	contentImport: ContentImportResource;

	get showConfigureHardware() {
		return false;
		// TODO: When metadata integration is enabled
		//  return this.type === 'environment' && this.step >= 3;
	}

	beforeDestroy() {
		this.step = 0;
		this.importPath = 'Unselected';
		this.type = null;
		this.softwareImport = new SoftwareImportResource();
		this.contentImport = new ContentImportResource();
	}
}

</script>

<style lang="scss">

.import-content {
	flex: 1 1 auto;
}

</style>