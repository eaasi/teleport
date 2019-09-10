<template>
	<info-modal
		v-if="isOpen"
		@close="$emit('close')"
		title="Create Base Environment"
	>
		<div class="base-env-container">
			<div class="base-env-heading">
				Select Operating System
			</div>
			<div class="section-os">
				<div class="left">
					<select-list label="Operating System Type" v-model="selectedOsType">
						<option
							v-for="osType in osTypeOptions"
							:value="osType.value"
							:key="osType.value"
						>
							{{ osType.name }}
						</option>
					</select-list>
					<select-list label="Operating System Version" v-model="selectedOsVersion">
						<option
							v-for="osVersion in osVersionOptions"
							:value="osVersion.value"
							:key="osVersion.value"
						>
							{{ osVersion.name }}
						</option>
					</select-list>
				</div>

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
			</div>

			<div class="divider-border"></div>

			<div>
				Select Hardware Template
			</div>

			<div class="hw-templates-container">
				<descriptive-selector
					v-for="template in hardwareTemplates"
					:selectable-option="template"
					:key="template.id"
					v-model="template.id"
					class="col-4"
				/>
			</div>
			<div>
				Template Details
			</div>
		</div>
	</info-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import { UiButton } from '@/components/global';
import InfoModal from '@/components/global/Modal/InfoModal.vue';
import AlertCard from '@/components/global/AlertCard.vue';
import SelectList from '@/components/forms/SelectList.vue';
import RadioButtons from '@/components/forms/RadioButtons.vue';
import DescriptiveSelector from '@/components/forms/DescriptiveSelector.vue';

@Component({
	name: 'CreateBaseEnvModal',
	components: {
		RadioButtons,
		AlertCard,
		InfoModal,
		UiButton,
		SelectList,
		DescriptiveSelector
	}
})
export default class CreateBaseEnvModal extends Vue {
	isOpen = true;
	selectedOsType = null;
	selectedOsVersion = null;
	selectedHardware = null;

	// TODO OS Type Interface
	@Prop({ type: Array, required: true })
	osTypeOptions: object[] = [];

	// TODO OS Version Interface
	@Prop({ type: Array, required: true })
	osVersionOptions: object[] = [];

	hardwareTemplates = [
		{
			id: 1,
			title: 'Foo',
			description: 'There is something here.'
		},
		{
			id: 2,
			title: 'Bar',
			description: 'There is something here.'
		},
		{
			id: 3,
			title: 'Baz',
			description: 'There is something here.'
		},
	];
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
				padding: 1.2rem;
			}
		}
	}

	.divider-border {
		border-bottom: solid 3px $light-neutral;
		margin-bottom: 1.8rem;
		padding: 0.5rem;
	}

	.base-env-heading {
		padding-bottom: 3rem;
	}

	.hw-templates-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 2.4rem;

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
