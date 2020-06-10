<template>
	<form-modal
		class="drive-edit-modal"
		title="Configure Drive"
		save-text="Save"
		@close="$emit('cancel')"
		@save="save"
		size="sm"
	>
		<div class="cd-form">
			<select-list label="Media Type" v-model="drive.type" placeholder="Please select a type of drive">
				<option selected disabled>Please select a type of drive</option>
				<option value="floppy">Floppy</option>
				<option value="cdrom">Optical (CDROM)</option>
				<option value="disk">Disk</option>
			</select-list>

			<text-input
				label="Data Binding"
				v-model="drive.data"
				readonly
			/>
			<text-input
				label="Interface"
				v-model="drive.iface"
				placeholder="ide"
			/>
			<text-input
				label="Bus"
				v-model="drive.bus"
				placeholder="0"
			/>
			<text-input
				label="Unit"
				v-model="drive.unit"
				placeholder="0"
			/>
			<text-input
				label="Filesystem"
				v-model="drive.filesystem"
				placeholder="ISO"
			/>
		</div>
	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import { IDrive } from '@/types/Resource';

@Component({
    name: 'DriveSettingsModal'
})
export default class DriveSettingsModal extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Object as () => IDrive })
    drive: IDrive;

    /* Methods
    ============================================*/
    save() {
        this.$emit('save', this.drive);
    }

    /* Watchers
    ============================================*/
    @Watch('drive.type')
	onDriveTypeChange(updated, _) {
    	if (updated === 'floppy') {
    		this.drive.bus = '0';
			this.drive.unit = '0';
			this.drive.filesystem ='fat12';
			this.drive.iface = 'floppy';
		}
	}
}
</script>