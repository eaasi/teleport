<template>
	<div class="software-metadata">
		<!-- User has completed Step 1 -->
		<div v-if="step > 1" class="sm-summary">
			<text-input
				readonly
				label="Name"
				v-model="title"
				rules="required"
				required
			/>

			<ui-button
				color-preset="white"
				icon="chevron-left"
				@click="step = 1"
			>
				Back To Metadata
			</ui-button>
		</div>

		<!-- User is on Step 1 -->
		<div v-if="step === 1">
			<div>
				<eaasi-form ref="_form" @submit="goToNextStep()">
					<software-general-info-form />
					<ui-button
						@click="submitForm()"
						icon-right
						icon="chevron-right"
					>
						Continue
					</ui-button>
				</eaasi-form>
			</div>

			<!-- <div v-if="importPath === 'Detailed'">
				<eaasi-form ref="_form" @submit="goToNextStep()">
					<collapsable title="General" class="mb-lg white-bg">
						<software-general-info-form />
					</collapsable>

					<collapsable title="Versions" class="white-bg">
						<div v-for="(v, i) in versions" :key="v.id">
							<h4>Version {{ i + 1 }}</h4>
							<software-version-form :version="v" />
						</div>
						<ui-button
							block
							color-preset="white"
							icon="plus"
							@click="addSoftwareVersion"
						>
							Add Version
						</ui-button>
					</collapsable>

					<collapsable title="System Requirements" class="white-bg">
						<software-requirements-form />
					</collapsable>

					<collapsable title="Software Product Metadata" class="white-bg">
						<software-product-metadata-form />
					</collapsable>

					<ui-button
						@click="submitForm()"
						icon-right
						icon="chevron-right"
					>
						Continue
					</ui-button>
				</eaasi-form>
			</div> -->
		</div>
	</div>
</template>

<script lang="ts">
import EnvironmentImportResource from '@/models/import/EnvironmentImportResource';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ImportPathSelect from '../ImportPathSelect.vue';
import { ResourceImportPath } from '@/types/Import';
import SoftwareGeneralInfoForm from '@/components/import/software/SoftwareGeneralInfoForm.vue';
import SoftwareProductMetadataForm from '@/components/import/software/SoftwareProductMetadataForm.vue';
import SoftwareRequirementsForm from '@/components/import/software/SoftwareRequirementsForm.vue';
import SoftwareVersionForm from '@/components/import/software/SoftwareVersionForm.vue';
import EaasiForm from '@/components/global/forms/EaasiForm.vue';
import { Get, Sync } from 'vuex-pathify';

@Component({
	name: 'SoftwareMetadata',
	components: {
		ImportPathSelect,
		SoftwareGeneralInfoForm,
		SoftwareProductMetadataForm,
		SoftwareRequirementsForm,
		SoftwareVersionForm
	}
})
export default class SoftwareMetadata extends Vue {

	$refs!: {
		_form: EaasiForm
	};

	/* Computed
	============================================*/
	@Sync('import/importPath')
	importPath: ResourceImportPath;

	@Sync('import/importStep')
	step: number;

	@Get('import/software@title')
	readonly title: string;

	@Sync('import/software')
	software: EnvironmentImportResource;

	/* Data
	============================================*/

	versions: any[] = [{id: 1}]; // TODO

	/* Methods
	============================================*/

	addSoftwareVersion() {
		// TODO:
		let id = Math.max.apply(null, this.versions.map(x => x.id)) + 1;
		this.versions.push({id});
	}

	goToNextStep() {
		this.step++;
	}

	submitForm() {
		// Workaround vue/typescript bug where _form type is 'Vue' rather than 'EaasiForm'
		let form: any = this.$refs._form;
		form.submit();
	}
}

</script>

<style lang="scss">
.software-metadata {
	.collapsable {
		margin-bottom: 2rem;
	}
}

.sm-summary {
	.eaasi-form-control {
		margin-bottom: 2rem;
	}
}

</style>