<template>
	<div class="new-base-environment-wizzard">
		<div class="emulator-picker-wrapper">
			<div class="row">
				<div class="col-md-6">
					<select-list
						v-model="chosenTemplateId"
						class="no-mb flex-adapt"
						label="Choose a System"
						rules="required"
					>
						<option value="" selected disabled>Select Template type...</option>
						<option
							v-for="template in availableTemplates"
							:key="template.id"
							:value="template.id"
						>
							{{ template.label }}
						</option>
					</select-list>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<select-list
						class="no-mb flex-adapt"
						label="Template Version"
						disabled
						value=""
					>
						<option value="" selected disabled>Select Template version...</option>
					</select-list>
				</div>
			</div>
		</div>

		<div>
			<div class="row">
				<div class="col-md-8">
					<text-input
						label="Disk Size (MB)"
						rules="required|numeric|min:0|max:10000"
						placeholder="1024"
						value="1024"
						v-model="diskSize"
					/>
				</div>
			</div>
			<div class="row">
				<div class="col-md-8">
					<search-select-list
						v-model="selectedSoftwareId"
						label="Install from Object"
						option-label="label"
						anchor="id"
						placeholder="Object"
						:data="softwareOpertaingSystems"
					/>
				</div>
			</div>
			<div class="row">
				<div class="col-md-8">
					<div id="kvm">
						<checkbox
							label="Enable KVM (Kernel-based Virtual Machine)"
							v-model="isKvmEnabled"
						/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-8">
					<text-input
						label="Config"
						v-model="nativeConfig"
					/>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-8">
				<system-template-details
					v-if="activeTemplate"
					:template="activeTemplate"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import { operatingSystems } from '@/models/admin/OperatingSystems';
import { ITemplate, ICreateEnvironmentPayload } from '../../../types/Import';
import { ROUTES } from '../../../router/routes.const';
import { IResourceSearchQuery } from '../../../types/Search';
import { resourceTypes, archiveTypes } from '../../../utils/constants';
import { ISoftwareObject } from '../../../types/Resource';
import SystemTemplateDetails from '../shared/SystemTemplateDetails.vue';

@Component({
	name: 'NewBaseEnvironmentWizard',
	components: {
		SystemTemplateDetails
	}
})
export default class NewBaseEnvironmentWizard extends Vue {

	/* Computed
	============================================*/

	@Sync('emulationProject/environment@title')
	title: string;

	@Sync('emulationProject/createEnvironmentPayload@templateId')
	chosenTemplateId: string;

	@Sync('resource/availableTemplates')
	availableTemplates: ITemplate[];

	@Sync('import/environment@size')
	diskSize: string;

	@Sync('import/environment@nativeFMTs')
	nativeFMTs: string[];

	@Sync('resource/query')
	searchQuery: IResourceSearchQuery;

	@Sync('emulationProject/createEnvironmentPayload@nativeConfig')
	nativeConfig: string;

	@Sync('emulationProject/selectedSoftwareId')
	selectedSoftwareId: string;

	get activeTemplate(): ITemplate {
		return this.availableTemplates.find(template => template.id === this.chosenTemplateId);
	}

	get isKvmEnabled(): boolean {
		return this.nativeConfig.indexOf(this.kvmFlag) >= 0;
	}

	set isKvmEnabled(value) {
		if (value) {
			this.nativeConfig += this.kvmFlag;
		} else {
			this.nativeConfig = this.nativeConfig.replace(this.kvmFlag, '');
		}
	}

	/* Data
	============================================*/
	
	readonly operatingSystems = operatingSystems;
	kvmFlag: string = '-enable-kvm';
	softwareOpertaingSystems: ISoftwareObject[] = [];

	/* Methods
	============================================*/

	async init() {
		await this.$store.dispatch('resource/getTemplates');
		this.$store.dispatch('resource/clearSearchQuery');
		const query: IResourceSearchQuery = {
			...this.searchQuery, 
			types: [resourceTypes.SOFTWARE], 
			archives: ['zero conf'],
			limit: 10000
		};
		this.searchQuery = query;
		const { software } = await this.$store.dispatch('resource/searchResources');
		this.softwareOpertaingSystems = software.result.filter((resource: ISoftwareObject) => resource.isOperatingSystem);

		this.$store.dispatch('resource/clearSearchQuery');
	}
	
	/* Lifecycle Hooks
	============================================*/
	async created() {
		await this.init();
	}

	@Watch('activeTemplate')
	onActiveTemplate(nextTemplate: ITemplate, prevTemplate: ITemplate) {
		if (!prevTemplate || (nextTemplate && nextTemplate.id !== prevTemplate.id)) {
			this.nativeConfig = nextTemplate.nativeConfig.value;
		}
	}

}

</script>

<style lang="scss">
.emulator-picker-wrapper {
	margin-bottom: 5rem;
}

.new-base-environment-wizzard {
	.row {
		margin-bottom: 1rem;
	}
}
</style>