<template>
	<div>
		<div v-if="drivesWithIds.length > 0" class="lil-container">
			<div v-for="drive in drivesWithIds" :key="drive.uid">
				<div class="li-container">
					<div class="li-label">
						{{ drive.type }}
					</div>
					<p class="li-value flex-row justify-between">
						<span style="display: block; max-width: 24.5rem;">
							Filesystem: {{ drive.filesystem ? drive.filesystem : 'Not specified' }}
						</span>
						<span v-if="!readonly" class="icon-wrapper flex-row">
							<span
								class="fas fa-edit dark-blue"
								style="margin-right: 0.5rem;"
								@click="edit(drive)"
							></span>
							<span
								class="fas fa-times red"
								@click="remove(drive)"
							>
							</span>
						</span>
					</p>
				</div>
			</div>
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
		<div v-else class="lil-container">
			<span class="lil-no-data">No Data</span>
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
import { IDrive, IEditableDrive } from '@/types/Resource';
import DriveEditModal from './DriveEditModal.vue';
import { generateId, jsonCopy } from '@/utils/functions';

@Component({
	name: 'ConfiguredDrives',
	components: { DriveEditModal }
})
export default class ConfiguredDrives extends Vue {

    /* Props
    ============================================*/
	@Prop({ type: Array as () => IDrive[], required: true })
	drives: IDrive[]

    @Prop({ type: Boolean })
    readonly: Boolean;

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
    remove(drive: IEditableDrive) {
		const updatedDrives = this.drivesWithIds.filter(d => d.uid != drive.uid);
		this.$emit('update-drives', updatedDrives);
    }

    add() {
		this.activeDrive = {
			uid: generateId(),
			data: '',
			iface: '',
			filesystem: '',
			bus: '',
			unit: '',
			type: 'floppy',
			boot: false,
			plugged: false,
		} as IEditableDrive;
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

	edit(drive: IEditableDrive) {
		this.activeDrive = jsonCopy(drive);
	}

}
</script>

<style lang='scss' scoped>
.lil-container {
	position: relative;
	.changed {
		background: lighten($yellow, 60%);
	}

	.fas {
		cursor: pointer;
		display: block;
		font-size: 2rem;
	}
	.dark-blue {
		color: $dark-blue;
	}
	.red {
		color: $red;
	}

	.icon-wrapper {
		> span {
			margin-left: 2.4rem;
		}
	}
}
</style>