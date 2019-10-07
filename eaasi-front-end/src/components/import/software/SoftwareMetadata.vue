<template>
	<div class="software-metadata">
		<import-path-select v-model="importPath" />
		<div v-if="step > 1" class="sm-summary padded">
			<text-input
				readonly
				label="Name"
				v-model="title"
			/>
			<ui-button
				secondary
				icon="chevron-left"
				@click="step = 1"
			>
				Back To Metadata
			</ui-button>
		</div>
		<div v-if="step == 1">
			<div v-if="importPath === 'Fast'" class="im-fast padded">
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
			<div v-if="importPath === 'Detailed'" class="im-fast padded">
				<eaasi-form ref="_form" @submit="goToNextStep()">
					<collapsable title="General" class="mb-lg">
						<software-general-info-form />
					</collapsable>

					<collapsable title="Versions">
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

					<collapsable title="System Requirements">
						<software-requirements-form />
					</collapsable>

					<collapsable title="Software Product Metadata">
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
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ImportPathSelect from '../ImportPathSelect.vue';
import { IEaasiResource } from '@/types/Resource';
import { ResourceImportPath } from '@/types/Import';
import SoftwareGeneralInfoForm from '@/components/import/software/SoftwareGeneralInfoForm.vue';
import SoftwareProductMetadataForm from '@/components/import/software/SoftwareProductMetadataForm.vue';
import SoftwareRequirementsForm from '@/components/import/software/SoftwareRequirementsForm.vue';
import SoftwareVersionForm from '@/components/import/software/SoftwareVersionForm.vue';
import EaasiForm from '@/components/global/software/EaasiForm.vue';
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
	}

	/* Props
	============================================*/

	/* Computed
	============================================*/

	@Sync('import/importStep')
	step: number

	@Get('import/software@title')
	readonly title: string

	@Sync('import/importPath')
	importPath: ResourceImportPath

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

	goToNextStep() {
		this.step++;
	}

	submitForm() {
		// Workaround vue/typescript bug where _form type is 'Vue' rather than 'EaasiForm'
		// It seems to only be an issue in this specific class for some reason
		let form: any = this.$refs._form;
		if(!form) return;
		form.submit();
	}

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss">
.software-metadata {
	.collapsable {
		margin-bottom: 2rem;
	}
}

.sm-summary {
	border-bottom: solid 2px darken($light-neutral, 10%);
	.eaasi-form-control {
		margin-bottom: 2rem;
	}
}

</style>