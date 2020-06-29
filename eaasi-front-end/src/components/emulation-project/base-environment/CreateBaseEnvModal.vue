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

				<div class="right col-md-5">
					<div class="alert-container">
						<alert type="warning">
							Operating system will be attached to your emulation project as
							a software resource. It will need to be installed manually while
							emulating.
						</alert>
					</div>
				</div>
			</div>

			<!-- <div v-if="hardwareTemplates.length > 0">
				<hardware-template-selection :templates="hardwareTemplates" />
			</div> -->
		</div>
		<template v-slot:buttons>
			<div class="justify-end buttons-right">
				<ui-button @click="$emit('close')" color-preset="light-blue">Cancel</ui-button>
			</div>
			<div class="justify-end buttons-right">
				<ui-button @click="$emit('save')">Save</ui-button>
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
import HardwareTemplateSelection from '@/components/emulation-project/HardwareTemplateSelection.vue';
import {IHardwareTemplate} from '@/types/HardwareTemplate';
import {IOsVersionOptions} from '@/types/IOsVersionOptions';
import {IOsTypeOptions} from '@/types/IOsTypeOptions';
import OsPicker, { IOsItem } from '../shared/OsPicker.vue';
import { ISoftwareObject, IDrive } from '@/types/Resource';
import { Sync } from 'vuex-pathify';
import { operatingSystems, ITemplateParams, IOsListItem } from '@/models/admin/OperatingSystems';
import { populateNativeConfig } from '@/helpers/NativeConfigHelper';

@Component({
	name: 'CreateBaseEnvModal',
	components: {
		HardwareTemplateSelection,
		OsPicker,
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


	/* Data
	============================================*/
	readonly operatingSystems = operatingSystems;
	kvmFlag: string = '-enable-kvm';
	softwareOpertaingSystems: ISoftwareObject[] = [];
	showAdvancedOptions: boolean = false;
	selectedOs: IOsItem = null;

	/**
	 * Array of available OS Types
	 */
	osTypeOptions: IOsTypeOptions[] = [];

	/**
	 * Array of available OS Versions
	 */
	osVersionOptions: IOsVersionOptions[] = [];

	/**
	 * Array of available Hardware Templates
	 */
	hardwareTemplates: IHardwareTemplate[];

	get osTemplates(): IOsListItem[] {
		if (!this.selectedOs) return this.operatingSystems;
		return this.operatingSystems.filter(os => os.id.indexOf(this.selectedOs.value) >= 0);
	}

	reset() {
		const currentEnvTitle = this.environmentTitle;
		this.$store.commit('emulationProject/RESET');
		this.environmentTitle = currentEnvTitle;
	}

	selectOs(os: IOsItem) {
		this.selectedOs = os;
	}

	@Watch('operatingSystemId')
	onActiveTemplate(template) {
		console.log(template);
		if (!template) this.reset();
		const chosenOS = this.operatingSystems.find(os => os.id === template);
		if (!chosenOS) return;
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
