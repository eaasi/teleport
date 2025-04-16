<template>
	<div v-if="template" class="template-metadata-table">
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
import EditableTextItem from '@/components/resources/view-details/shared/EditableTextItem.vue';
import TextItem from '@/components/emulation-project/shared/TextItem.vue';
import {ITemplate} from '@/types/Import';

@Component({
	name: 'EmulationProjectHardwareMetadata',
	components: {TextItem, EditableTextItem},
})
export default class EmulationProjectHardwareMetadata extends Vue {

	@Prop()
	template: ITemplate;

	get devicesMetadata() {
		return [
			{
				label: 'Emulator Configuration',
				value: this.template?.nativeConfig?.value || '-',
				property: 'audioDevice',
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
				value: this.template.emulator?.bean || '-',
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

.template-metadata-table {
	background: $medium-grey;
	padding: 2rem;
}

</style>