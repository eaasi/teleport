<template>
	<info-modal
		v-if="isOpen"
		@close="$emit('close')"
		title="Create Base Environment"
		button-text="Cancel"
	>
		<div class="base-env-container">
			<div class="base-env-heading">
				Select Operating System
			</div>

			<!-- SELECT OS ROW -->
			<div class="section-os">
				<!-- LEFT COLUMN -->
				<div class="left">
					<select-list label="Operating System Type" v-model="selectedOsType">
						<option
							v-for="osType in osTypeOptions"
							:value="osType.name"
							:key="osType.id"
						>
							{{ osType.name }}
						</option>
					</select-list>

					<select-list label="Operating System Version" v-model="selectedOsVersion">
						<option
							v-for="osVersion in osVersionOptions"
							:value="osVersion.name"
							:key="osVersion.id"
						>
							{{ osVersion.name }}
						</option>
					</select-list>
				</div>
				<!-- LEFT COLUMN -->

				<!-- RIGHT COLUMN -->
				<div class="right">
					<div class="alert-container">
						<alert-card type="warning" display-modifier="transparent">
							<div>
								Operating system will be attached to your emulation project as a software resource.
							</div>
							<div>
								It will need to be installed manually while emulating.
							</div>
						</alert-card>
					</div>
				</div>
				<!-- END RIGHT COLUMN -->
			</div>
			<!-- END SELECT OS ROW -->

			<!-- HARDWARE TEMPLATES -->
			<div v-if="hardwareTemplates.length > 0">
				<hardware-template-selection :templates="hardwareTemplates" />
			</div>
			<!-- END HARDWARE TEMPLATES -->
		</div>
		<template v-slot:buttons>
			<div class="justify-end buttons-right">
				<ui-button @click="$emit('close')" secondary>Cancel</ui-button>
			</div>
			<div class="justify-end buttons-right">
				<ui-button @click="$emit('save')">Save</ui-button>
			</div>
		</template>
	</info-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import { UiButton } from '@/components/global';
import InfoModal from '@/components/global/Modal/InfoModal.vue';
import AlertCard from '@/components/global/AlertCard.vue';
import SelectList from '@/components/global/forms/SelectList.vue';
import HardwareTemplateSelection from '@/components/emulation-project/HardwareTemplateSelection.vue';
import {IHardwareTemplate} from '@/types/HardwareTemplate';

@Component({
	name: 'CreateBaseEnvModal',
	components: {
		HardwareTemplateSelection,
		AlertCard,
		InfoModal,
		UiButton,
		SelectList,
	}
})
export default class CreateBaseEnvModal extends Vue {
	isOpen = true;
	selectedOsType = null;
	selectedOsVersion = null;

	// TODO OS Type Interface
	/**
	 * Array of available OS Types
	 */
	osTypeOptions: object[] = [];

	// TODO OS Version Interface
	/**
	 * Array of available OS Versions
	 */
	osVersionOptions: object[] = [];

	/**
	 * Array of available Hardware Templates
	 */
	hardwareTemplates: IHardwareTemplate[];


	// TODO
	getOsTypes() {
		this.osTypeOptions = [];
	}

	// TODO
	getHardwareTemplates() {
		this.hardwareTemplates = [];
	}

	created() {
		this.getOsTypes();
		this.getHardwareTemplates();
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
			flex-grow: 1;
			padding-right: 3.6rem;
		}

		.right {

			.alert-container {
				padding: 1.1rem;
			}
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

</style>
