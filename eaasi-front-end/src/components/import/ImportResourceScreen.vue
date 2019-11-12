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
			<div class="import-tip-lane"></div>
		</section>
	</div>
</template>

<script lang="ts">
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

	get showConfigureHardware() {
		return this.type === 'environment' && this.step >= 3;
	}

	get showPathSelect() {
		return this.step >= 1 && (
			this.type === 'environment' ||
			this.type === 'software'
		);
	}
}

</script>

<style lang="scss">

#importResource {
	background-color: lighten($light-neutral, 80%);
}

.import-content {
	flex: 1 1 auto;
}

.import-tip-lane {
	flex: 0 0 $tipLaneWidth;
}
</style>