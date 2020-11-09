<template>
	<info-modal
		@close="$emit('close')"
		title="Create Base Environment"
		button-text="Cancel"
	>
		<div class="base-env-container">
			<div class="base-env-heading">
				Select Operating System
			</div>

			<div class="section-os row">
				<div class="left col-md-7">
					<text-input
						v-model="environmentTitle"
						label="Environment Name"
						placeholder="Environment name"
						rules="required"
					/>
					<os-picker
						list
						:selected-os="selectedOs"
						@input="selectOs"
						:readonly="!!operatingSystemId"
					/>
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

				<div class="right col-md-5 flex flex-center">
					<div class="alert-container">
						<alert type="warning">
							Operating system will be attached to your emulation project as
							a software resource. It will need to be installed manually while
							emulating.
						</alert>
					</div>
				</div>
			</div>
			<div class="">
				<os-template-conig v-if="selectedOSTemplate" :os-template="selectedOSTemplate" />
			</div>
		</div>
		<template v-slot:buttons>
			<div class="justify-end buttons-right">
				<ui-button @click="$emit('close')" color-preset="light-blue">Cancel</ui-button>
			</div>
			<div class="justify-end buttons-right">
				<ui-button :disabled="!canSave" @click="$emit('save')">Save</ui-button>
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
import {IHardwareTemplate} from '@/types/HardwareTemplate';
import OsPicker from '../shared/OsPicker.vue';
import { ISoftwareObject, IDrive, IUIOsItem } from '@/types/Resource';
import { Sync } from 'vuex-pathify';
import { operatingSystems, ITemplateParams, IOsListItem } from '@/models/admin/OperatingSystems';
import { populateNativeConfig } from '@/helpers/NativeConfigHelper';
import { ITemplate, ICreateEnvironmentPayload } from '../../../types/Import';
import OsTemplateConig from '../shared/OsTemplateConig.vue';
import { defaultOsList } from '@/utils/constants';

@Component({
	name: 'CreateBaseEnvModal',
	components: {
		OsPicker,
		OsTemplateConig,
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
		padding: 1.2rem 3.4rem;
	}

	.section-os {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 1.2rem 0;

		.left {
			border-right: 2px solid $light-neutral;
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
			border: 2px solid lighten($light-blue, 40%);
			border-radius: 1rem;
			flex-grow: 1;
			margin: 0 1.1rem;
			padding: 2.4rem;

			.hw-template-title {
				color: $dark-blue;
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
		color: $light-neutral;
	}

</style>
