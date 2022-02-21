<template>
	<div class="emulation-project-advanced-mode-screen">
		<div class="emu-project-content padded">
			<h2 class="hardware-select-header">Hardware</h2>
			<div class="hardware-select-container row">
				<div class="col-sm-5">
					<div class="txt-sm">System Template</div>
					<select-list :value="selectedTemplateId" @input="selectTemplate">
						<option :value="null" selected disabled>
							Choose a system template...
						</option>
						<option v-for="template in availableTemplates" :key="template.id" :value="template.id">
							{{ template.description.title }}
						</option>
					</select-list>
				</div>
				<div class="col-sm">
					<tips-for-success>
						Make sure that your operating system matches any software resources you plan to install.
					</tips-for-success>
				</div>
			</div>
			<emulation-project-hardware-metadata :template="selectedTemplate" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {Sync} from 'vuex-pathify';
import {ITemplate} from '@/types/Import';
import EmulationProjectHardwareMetadata
	from '@/components/emulation-project/metadata/EmulationProjectHardwareMetadata.vue';

@Component({
	name: 'EmulationProjectAdvancedModeScreen',
	components: {
		EmulationProjectHardwareMetadata

	}
})
export default class EmulationProjectAdvancedModeScreen extends Vue {

	selectedTemplateId: string = null;

	@Sync('resource/availableTemplates')
	availableTemplates: ITemplate[];

	get selectedTemplate() {
		return this.availableTemplates.find(template => template.id === this.selectedTemplateId);
	}

	selectTemplate(template: string) {
		this.selectedTemplateId = template;
	}

	async init() {
		await this.$store.dispatch('resource/getTemplates');
	}

	async created() {
		await this.init();
	}

}
</script>

<style lang="scss">

.hardware-select-container {
	margin-bottom: 1rem;
}

.hardware-select-header {
	margin-bottom: 2rem;
}

</style>