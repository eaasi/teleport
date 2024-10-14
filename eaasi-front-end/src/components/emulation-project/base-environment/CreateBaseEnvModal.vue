<template>
	<info-modal
		@close="$emit('close')"
		title="Create Base Environment"
		button-text="Cancel"
		class="create-env-modal"
	>
		<div class="base-env-container">
			<div class="base-env-heading">
				Select Operating System
			</div>

			<div class="section-os row">
				<div class="left col-md-7">
					<div class="modal-input-wrapper">
						<text-input
							v-model="environmentTitle"
							label="Environment Name"
							placeholder="Environment Name"
							rules="required"
						/>
					</div>

					<div class="modal-input-wrapper">
						<os-picker
							list
							:selected-os="selectedOs"
							@input="selectOs"
							placeholder="Selected Operating System Version"
							:readonly="!!operatingSystemId"
						/>
					</div>

					<div class="modal-input-wrapper">
						<search-select-list
							v-model="operatingSystemId"
							label="Choose a System"
							option-label="label"
							anchor="id"
							placeholder="Please select a System Template"
							:data="osTemplates"
							rules="required"
						/>
					</div>
				</div>

				<div class="right col-md-5 flex flex-center">
					<div class="alert-container">
						<alert type="warning">
							Select the type of operating system that you intend to install.
							You will need to attach an appropriate Software resource to your
							emulation project and run the installation manually while emulating.
						</alert>
					</div>
				</div>
			</div>
			<div class="">
				<os-template-config v-if="selectedOSTemplate" :os-template="selectedOSTemplate" />
			</div>
		</div>
		<template #buttons>
			<div class="justify-end buttons-right">
				<ui-button @click="$emit('close')" color-preset="white">Cancel</ui-button>
			</div>
			<div class="justify-end buttons-right">
				<ui-button :disabled="!canSave" @click="$emit('save')">Next</ui-button>
			</div>
		</template>
	</info-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import { UiButton } from '@/components/global';
import InfoModal from '@/components/global/Modal/InfoModal.vue';
import SelectList from '@/components/global/forms/SelectList.vue';
import OsPicker from '../shared/OsPicker.vue';
import { IDrive, IUIOsItem } from '@/types/Resource';
import { Sync } from 'vuex-pathify';
import { operatingSystems, IOsListItem } from '@/models/admin/OperatingSystems';
import { populateNativeConfig } from '@/helpers/NativeConfigHelper';
import { ICreateEnvironmentPayload } from '@/types/Import';
import OsTemplateConfig from '../shared/OsTemplateConfig.vue';
import { defaultOsList } from '@/utils/constants';

@Component({
	name: 'CreateBaseEnvModal',
	components: {
		OsPicker,
		OsTemplateConfig,
		InfoModal,
		UiButton,
		SelectList,
	}
})
export default class CreateBaseEnvModal extends Vue {

	/* Computed
	============================================*/
	@Sync('emulationProject/createEnvironmentPayload@label')
	environmentTitle: string;

	@Sync('emulationProject/createEnvironmentPayload@driveSettings')
	drives: IDrive[];

	@Sync('emulationProject/createEnvironmentPayload@operatingSystemId')
	operatingSystemId: string;

	@Sync('emulationProject/createEnvironmentPayload@templateId')
	templateId: string;

	@Sync('emulationProject/createEnvironmentPayload@nativeConfig')
	nativeConfig: string;

	@Sync('emulationProject/createEnvironmentPayload')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	get canSave(): boolean {
		return !!this.templateId && !!this.operatingSystemId && !!this.environmentTitle;
	}

	get osTemplates(): IOsListItem[] {
		if (!this.selectedOs) return this.operatingSystems;
		return this.operatingSystems.filter(os => os.id.indexOf(this.selectedOs.value) >= 0);
	}

	get selectedOSTemplate(): IOsListItem {
		return this.operatingSystems.find(os => os.id === this.operatingSystemId);
	}

	/* Data
	============================================*/
	readonly operatingSystems = operatingSystems;
	selectedOs: IUIOsItem = null;

	reset() {
		const currentEnvTitle = this.environmentTitle;
		this.$store.commit('emulationProject/RESET');
		this.environmentTitle = currentEnvTitle;
	}

	selectOs(os: IUIOsItem) {
		this.selectedOs = os;
	}

	selectOsForTemplate(template: string) {
		const templateVal = template.split(':')[1];
		const os: IUIOsItem = defaultOsList.find(os => os.value.indexOf(templateVal) >= 0);
		if (!os) return;
		this.selectedOs = os;
	}

	beforeDestroy() {
		this.environmentTitle = null;
		this.drives = [];
		this.operatingSystemId = null;
		this.templateId = null;
		this.nativeConfig = null;
	}

	@Watch('operatingSystemId')
	onActiveTemplate(template) {
		if (!template) this.reset();
		const chosenOS = this.operatingSystems.find(os => os.id === template);
		if (!chosenOS) return;
		this.selectOsForTemplate(template);
		this.nativeConfig = populateNativeConfig(chosenOS.template_params);
		this.templateId = chosenOS.template;
	}

}

</script>

<style lang="scss">
	.base-env-container {
		padding: 1.2rem 1.4rem;
		.modal-input-wrapper {
			padding-bottom: 2.4rem;
		}
	}
	.create-env-modal {
		.eaasi-modal-content {
			min-height: 50vh;
		}
	}
	.section-os {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 1.2rem 0;

		.left {
			border-right: 2px solid $light-grey;
		}
	}

	.base-env-heading {
		padding-bottom: 1.2rem;
	}

	.hw-templates-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 2.4rem 0;

		.hw-template-container {
			border: 2px solid $light-grey;
			border-radius: 1rem;
			flex-grow: 1;
			margin: 0 1.1rem;
			padding: 2.4rem;

			.hw-template-title {
				color: $dark-light-grey;
				font-size: 1.5rem;
				font-weight: bold;
				text-align: center;
			}

			.hw-template-desc {
				color: #333333;
			}
		}
	}

	.base-env-alert-text {
		color: $light-grey;
	}

</style>
