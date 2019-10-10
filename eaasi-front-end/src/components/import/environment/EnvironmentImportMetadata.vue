<template>
	<div class="environment-import-metadata padded">
		<eaasi-form ref="_form" @submit="step++" v-if="step == 1">
			<div v-if="importPath === 'Fast'">
				<metadata-fast />
			</div>
			<div v-else>
				<collapsable title="General" class="mb-lg">
					<general-metadata />
				</collapsable>

				<collapsable title="Operating System" class="mb-lg">
					<os-metadata />
				</collapsable>

				<collapsable title="Software Version Metadata" class="mb-lg">
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

				<collapsable title="Software Product" class="mb-lg">
					<software-product-form />
				</collapsable>
			</div>

			<ui-button
				@click="$refs._form.submit()"
				icon-right
				icon="chevron-right"
			>
				Continue
			</ui-button>
		</eaasi-form>
		<div v-if="step > 1">
			<metadata-fast readonly class="mb-lg" />
			<ui-button
				secondary
				icon="chevron-left"
				@click="step = 1"
			>
				Back To Metadata
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ResourceImportPath } from '@/types/Import';
import { Get, Sync } from 'vuex-pathify';
import GeneralMetadata from './EnvironmentImportGeneralMetadata.vue';
import MetadataFast from './EnvironmentImportMetadataFast.vue';
import OsMetadata from './EnvironmentImportOSMetadata.vue';
import SoftwareProductForm from '@/components/import/software/SoftwareProductMetadataForm.vue';
import SoftwareVersionForm from '@/components/import/software/SoftwareVersionForm.vue';

@Component({
	name: 'EnvironmentImportMetadata',
	components: {
		GeneralMetadata,
		MetadataFast,
		OsMetadata,
		SoftwareProductForm,
		SoftwareVersionForm
	}
})
export default class EnvironmentImportMetadata extends Vue {

	/* Computed
	============================================*/

	@Get('import/importPath')
	readonly importPath: ResourceImportPath

	@Sync('import/importStep')
	step: number

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