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
			<select-list label="Media Type" v-model="drive.type">
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
import { Component, Prop } from 'vue-property-decorator';
import { IDrive } from '@/types/Resource';

@Component({
    name: 'DriveEditModal'
})
export default class DriveEditModal extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Object as () => IDrive })
    drive: IDrive;

    /* Methods
    ============================================*/
    save() {
        this.$emit('save', this.drive);
    }

}
</script>