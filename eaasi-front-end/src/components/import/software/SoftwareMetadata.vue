<template>
	<div class="software-metadata">
		<div v-if="step > 1" class="sm-summary">
			<text-input
				readonly
				label="Name"
				v-model="title"
				rules="required"
			/>

			<select-list
				v-model="chosenTemplate"
				placholder="Choose a System"
				class="no-mb flex-adapt"
				label="Choose a System"
				rules="required"
			>
				<option
					v-for="template in availableTemplates"
					:key="template.id"
					:value="template.id"
				>
					{{ template.label }}
				</option>
			</select-list>

			<text-input
				v-if="chosenTemplate"
				readonly
				label="System Architecture"
				v-model="chosenTemplateArchitecture"
				rules="required"
			/>

			<text-input
				v-if="chosenTemplate"
				readonly
				label="Emulator"
				v-model="chosenTemplateEmulator"
				rules="required"
			/>

			<text-input
				v-if="chosenTemplate"
				readonly
				label="Config"
				v-model="chosenTemplateNativeConfig"
				rules="required"
			/>

			<ui-button
				secondary
				icon="chevron-left"
				@click="step = 1"
			>
				Back To Metadata
			</ui-button>
		</div>
		<div v-if="step === 1">
			<div v-if="importPath === 'Fast'">
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
			<div v-if="importPath === 'Detailed'">
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
							secondary
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
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ImportPathSelect from '../ImportPathSelect.vue';
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
	};

	/* Computed
	============================================*/
	@Sync('import/importPath')
	importPath: ResourceImportPath;

	@Sync('import/importStep')
	step: number;

	@Get('import/software@title')
	readonly title: string;

	@Sync('import/chosenTemplate')
	chosenTemplate: string;

	@Get('resource/availableTemplates')
	readonly availableTemplates: any[];

	@Sync('import/software@nativeConfig')
	nativeConfig: string;

	get chosenTemplateData() {
		return this.availableTemplates.filter(template => {
			return template['id'] === this.chosenTemplate;
		})[0];
	}

	// TODO: The structure and naming of the serialized data coming from the API is not ideal.
	/* ie:
    {
        id: "qemu-win98",
        label: "Windows 98 (USB pointer)",
        properties: [
            {
                name: "Architecture",            <-- why name keys "name" and "value"?
                value: "x86_64"
            },
            {
                name: "EmulatorContainer",
                value: "Qemu"
            }
        ]
    },

    // TODO: Suggestion - serialize to the interface that already seems to exist -
        properties: { architecture: 'foo', emulatorContainer: 'bar' }
    */

	get chosenTemplateEmulator() {
		return this.chosenTemplateData.properties.filter(obj => {
			return obj['name'] === 'EmulatorContainer';
		})[0]['value'];
	}

	get chosenTemplateArchitecture() {
		return this.chosenTemplateData.properties.filter(obj => {
			return obj['name'] === 'Architecture';
		})[0]['value'];
	}

	get chosenTemplateNativeConfig() {
		let config = this.chosenTemplateData['native_config'];
		this.nativeConfig = config;
		return config;
	}

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

	/* Lifecycle Hooks
	============================================*/
	created() {
		this.$store.dispatch('resource/getTemplates');
	}

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
	.eaasi-form-control {
		margin-bottom: 2rem;
	}
}

</style>