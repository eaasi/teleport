<template>
	<div v-if="environment" class="environment-metadata-table">
		<div class="row">
			<div class="col-sm">
				<div v-for="data in devicesMetadata" :key="data.label">
					<text-item :item="data" readonly />
				</div>
			</div>
			<div class="col-sm">
				<div v-for="data in environmentMetadata" :key="data.label">
					<text-item :item="data" readonly />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import EditableTextItem from '@/components/resources/view-details/shared/EditableTextItem.vue';
import TextItem from '@/components/emulation-project/shared/TextItem.vue';

@Component({
	name: 'EmulationProjectEnvironmentMetadata',
	components: {TextItem, EditableTextItem},
})
export default class EmulationProjectEnvironmentMetadata extends Vue {

	@Prop()
	environment: EmulationProjectEnvironment;

	get devicesMetadata() {
		return [
			{
				label: 'Emulator Configuration',
				value: this.environment.nativeConfig || '-',
				property: 'audioDevice',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Operating System',
				value: this.environment.os || '-',
				property: 'id',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
		];
	}

	get environmentMetadata() {
		return [
			{
				label: 'Emulator',
				value: this.environment.emulator || '-',
				property: 'id',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'CPU Cores',
				value: this.environment.cpus || '-',
				property: 'id',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Memory',
				value: this.environment.size ? this.environment.size + ' MB' : '-',
				property: 'id',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Configured Software',
				value: this.environment.installedSoftwareIds?.map((software) => software.label).join(', ') || '-',
				property: 'id',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
		];
	}



}
</script>

<style lang="scss">

.environment-metadata-table {
	background: lighten($light-neutral, 80%);
	padding: 2rem;
}

</style>