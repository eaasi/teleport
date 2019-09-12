<template>
	<div>
		<div class="divider-border"></div>
		<div class="base-env-heading">
			Select Hardware Template
		</div>

		<div class="hw-container">
			<div class="hw-templates-container">
				<descriptive-selector
					v-for="template in hardwareTemplates"
					:selectable-option="template"
					:key="template.id"
					:value="template.id"
					v-model="selectedHardware"
					class="col-4"
				/>
			</div>
			<base-environment-details-card
				:template-details="templateDetails"
			/>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
import DescriptiveSelector from '@/components/forms/DescriptiveSelector.vue';
import BaseEnvironmentDetailsCard from '@/components/global/BaseEnvironmentDetailsCard.vue';
import { IHardwareTemplateDetails } from '@/types/HardwareTemplateDetails';

@Component({
	name: 'HardwareTemplateSelection',
	components: {
		DescriptiveSelector,
		BaseEnvironmentDetailsCard
	}
})
export default class HardwareTemplateSelection extends Vue {

	/**
	 * Array of available hardware templates
	 */
	@Prop({ required: false, type: Object as () => IHardwareTemplateDetails[]})
	templates

	/**
	 * Data to be presented in the Hardware Template Details card
	 */
	templateDetails: IHardwareTemplateDetails;

	/**
	 * User-selected Hardware
	 */
	selectedHardware = null;

	// TODO
	getTemplateDetails() {
		this.templateDetails = {} as IHardwareTemplateDetails;
	}

	created() {
		this.getTemplateDetails();
	}
};
</script>

<style scoped>

</style>