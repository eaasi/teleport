<template>
	<div class="environment-import-metadata padded">
		<eaasi-form ref="_form">
			<div v-if="importPath === 'Fast'">
				<metadata-fast />
			</div>
			<div v-else>
				<collapsable title="General">
					<general-metadata />
				</collapsable>

				<collapseable title="Operating System">
					<os-metadata />
				</collapseable>

				<collapsable title="Software Version Metadata">
					<div v-for="(v, i) in versions" :key="v.id">
						<h4>Version {{ i + 1 }}</h4>
						<software-version-form :version="v" />
					</div>
					<ui-button
						block
						secondary
						icon="plus"
						@click="addSoftwareVersion"
					>
						Add Version
					</ui-button>
				</collapsable>

				<collapsable title="Software Product">
					<software-product-form />
				</collapsable>
			</div>
		</eaasi-form>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ResourceImportPath } from '@/types/Import';
import { Get, Sync } from 'vuex-pathify';
import MetadataFast from './EnvironmentImportMetadataFast.vue';
import GeneralMetadata from './EnvironmentImportGeneralMetadata,vue';
import OsMetadata from './EnironmentImportOSMetadata.vue';
import SoftwareVersionForm from '@/components/import/software/SoftwareVersionForm.vue';
import SoftwareProductForm from '@/components/import/software/SoftwareProductMetadataForm.vue';

@Component({
	name: 'EnvironmentImportMetadata',
	components: {
		MetadataFast
	}
})
export default class EnvironmentImportMetadata extends Vue {

	/* Computed
	============================================*/

	@Get('import/importPath')
	readonly importPath: ResourceImportPath

	/* Data
	============================================*/

	versions: any[] = [{id: 1}] // TODO:


	/* Methods
	============================================*/

	addSoftwareVersion() {
		// TODO:
		let id = Math.max.apply(null, this.versions.map(x => x.id)) + 1;
		this.versions.push({id});
	}

}

</script>

<style lang="scss"></style>