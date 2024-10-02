<template>
	<div>
		<div v-if="drivesWithIds.length > 0">
			<drive-card v-for="drive in drivesWithIds" :key="drive.uid" :label="drive.type">
				<div class="flex flex-row justify-between" style="width: 100%;">
					<p>
						Filesystem: {{ drive.filesystem ? drive.filesystem : 'Not specified' }}
					</p>
					<div v-if="!readonly" class="icon-wrapper flex flex-row">
						<span
							class="fas fa-edit dark-blue"
							style="margin-right: 1rem;"
							@click="edit(drive)"
						></span>
						<span class="fas fa-times red" @click="remove(drive)"></span>
					</div>
				</div>
			</drive-card>
			<ui-button
				v-if="!readonly"
				size="sm"
				color-preset="white"
				icon="plus"
				@click="add"
			>
				Add Drive
			</ui-button>
		</div>
		<div v-else>
			<span class="lil-no-data">No Drives</span>
			<ui-button
				v-if="!readonly"
				size="sm"
				color-preset="white"
				icon="plus"
				@click="add"
			>
				Add Drive
			</ui-button>
		</div>
		<drive-edit-modal
			v-if="activeDrive"
			:drive="activeDrive"
			@cancel="closeModal"
			@save="save"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IDrive, IEditableDrive, IResourceDrive, IEaasiResource } from '@/types/Resource';
import DriveEditModal from './DriveEditModal.vue';
import { generateId, jsonCopy } from '@/utils/functions';
import DriveCard from './DriveCard.vue';
import EditableDrive from '@/models/emulation-project/EditableDrive';
import { Sync, Get } from 'vuex-pathify';

@Component({
	name: 'DriveSettings',
	components: {
		DriveEditModal,
		DriveCard
	}
})
export default class DriveSettings extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Boolean })
	readonly: Boolean;

	@Prop({ type: Array as () => IDrive[], required: true })
	drives: IDrive[]

    /* Computed
    ============================================*/
	get drivesWithIds(): IEditableDrive[] {
		return this.drives.map(d => {
			return {...d, uid: generateId()};
		});
	}

    /* Data
    ============================================*/
	activeDrive: IEditableDrive = null;

    /* Methods
    ============================================*/
    generateDrive(type: string = 'floppy', boot = false) {
		return new EditableDrive();
	}

	save(drive: IEditableDrive) {
		let updatedDrives: IEditableDrive[] = this.drivesWithIds;
		this.drivesWithIds.some(d => d.uid === drive.uid)
			? updatedDrives = this.drivesWithIds.map(d => d.uid === drive.uid ? drive : d)
			: updatedDrives.push(drive);

		this.$emit('update-drives', updatedDrives);
		this.closeModal();
	}

	closeModal() {
		this.activeDrive = null;
	}

	add() {
		this.activeDrive = this.generateDrive('');
	}

	edit(drive: IEditableDrive) {
		this.activeDrive = jsonCopy(drive);
	}

    remove(drive: IEditableDrive) {
		const updatedDrives = this.drivesWithIds.filter(d => d.uid != drive.uid);
		this.$emit('update-drives', updatedDrives);
    }

}
</script>

<style lang='scss'>
.icon-wrapper {
	.fas {
		color: $dark-blue;
		font-size: 1.6rem;
	}
}
</style>