<template>
	<div>
		<div></div>
		<div>
			Select Hardware Template
		</div>

		<div>
			<descriptive-radios
				:options="templates"
				v-model="selectedHardware"
			/>
			<base-environment-details-card
				:template-details="templateDetails"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import BaseEnvironmentDetailsCard from '@/components/emulation-project/BaseEnvironmentDetailsCard.vue';
import { IHardwareTemplateDetails } from '@/types/HardwareTemplateDetails';

@Component({
	name: 'HardwareTemplateSelection',
	components: {
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

	getTemplateDetails() {
		this.templateDetails = {} as IHardwareTemplateDetails;
	}

	created() {
		this.getTemplateDetails();
	}
};
</script>
