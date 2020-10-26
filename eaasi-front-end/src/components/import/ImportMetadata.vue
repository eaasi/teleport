<template>
	<div class="import-metadata padded">
		<content-import-metadata v-if="isContentImport" />
		<div v-if="path !== 'Unselected'">
			<software-metadata v-if="isSoftwareImport" />
			<environment-import-metadata v-if="isImageImport" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ContentImportMetadata from '@/components/import/content/ContentImportMetadata.vue';
import EnvironmentImportMetadata from '@/components/import/environment/EnvironmentImportMetadata.vue';
import ImportPathSelect from './ImportPathSelect.vue';
import SoftwareMetadata from '@/components/import/software/SoftwareMetadata.vue';
import { Get, Sync } from 'vuex-pathify';
import { ResourceImportPath, ImportType } from '@/types/Import';

@Component({
	name: 'ImportMetadata',
	components: {
		ContentImportMetadata,
		EnvironmentImportMetadata,
		ImportPathSelect,
		SoftwareMetadata
	}
})
export default class ImportMetadata extends Vue {

	/* Computed
	============================================*/
	@Get('import/isImageImport')
	isImageImport: boolean;

	@Get('import/isContentImport')
	isContentImport: boolean;

	@Get('import/isSoftwareImport')
	isSoftwareImport: boolean;

	@Sync('import/importPath')
	readonly path: ResourceImportPath;
}

</script>

<style lang="scss">
.import-metadata {
	border-bottom: solid 2px darken($light-neutral, 10%);
}
</style>