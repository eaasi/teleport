<template>
	<info-modal
		class="emulator-modal"
		:title="title"
		subtitle="Manage emulator images and view details"
		@close="$emit('close')"
	>
		<div class="emulator-images">
			<table class="eaasi-table">
				<thead>
					<th>User Version</th>
					<th>OCI Source URL</th>
					<th style="width: 95px;">Docker Tag</th>
					<th style="width: 220px;"></th>
					<th style="width: 30px;" v-if="hasMultipleImages">Default</th>
				</thead>
				<tbody>
					<tr v-for="e in emulator.entries" :key="e.image.id">
						<td>{{ e.version }}</td>
						<td>{{ e.provenance.ociSourceUrl }}</td>
						<td class="nb">
							<span v-if="isLatest(e)" class="e-latest">
								<i class="fas fa-check-circle"></i>
							</span>
							<span>{{ e.provenance.versionTag }}</span>
						</td>
						<td :class="['btn-cell nb text-right', {'text-center': hasMultipleImages}]">
							<span v-if="canUpdate(e)" @click="updateImage(e)">Update</span>
						</td>
						<td class="text-center" v-if="hasMultipleImages">
							<checkbox class="no-mb" :value="isDefault(e)" @change="makeDefault(e)" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</info-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEmulator, IEmulatorEntry } from 'eaasi-admin';
import { Get } from 'vuex-pathify';
import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import { ITaskState } from '../../../types/Task';
import EaasiTask from '@/models/task/EaasiTask';

@Component({
	name: 'EmulatorDetailsModal'
})
export default class EmulatorModal extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IEmulator, required: true})
	readonly emulator: IEmulator

	get title() {
		return `${this.emulator.name.toUpperCase()} Images`;
	}

	get hasMultipleImages() {
		return this.emulator.entries.length > 1;
	}

	/* Methods
	============================================*/

	canUpdate(e: IEmulatorEntry) {
		if(this.isLatest(e)) return false;
		let otherVersions = this.emulator.entries
			.filter(x => e.provenance.ociSourceUrl === x.provenance.ociSourceUrl);
		return !otherVersions.find(x => this.isLatest(x));
	}

	/**
	 * Determines if an emulator entry is the latest version
	 */
	isLatest(e: IEmulatorEntry) {
		return e.provenance.versionTag === 'latest';
	}

	/**
	 * Determines if an emulator entry is the default version
	 */
	isDefault(e: IEmulatorEntry) {
		return e.version === this.emulator.latestVersion;
	}

	async makeDefault(entry: IEmulatorEntry) {
		let previousVersion = this.emulator.latestVersion;
		// Assume this will succeed and update the checkbox immediately
		this.emulator.latestVersion = entry.version;
		let success = await this.$store.dispatch('admin/setDefaultEmulatorVersion', entry);
		if(success) {
			// Refresh the latest emulator list
			this.$store.dispatch('admin/getEmulators');
		} else {
			// If first call failed, revert to previous version
			this.emulator.latestVersion = previousVersion;
		}
	}

	async updateImage(entry: IEmulatorEntry) {
		let request = new EmulatorImportRequest();
		request.urlString = entry.provenance.ociSourceUrl;
		request.tag = entry.provenance.versionTag;
		request.update = true;
		let task = await this.$store.dispatch('admin/importEmulator', request) as EaasiTask;
		if(!task) return;
		this.$store.commit('SET_ACTIVE_TASK', task);
		this.$emit('close');
	};

}

</script>

<style lang="scss">

.emulator-form {
	margin: 0 auto;
	max-width: 60rem;
	padding: 2rem 0 4rem;

	.ei-importing {
		font-size: 10rem;
		text-align: center;

		span {
			display: block;
			font-size: 3rem;
		}
	}

	.card-container {
		width: 100%;
	}
}

.emulator-images {
	margin: 0 auto;
	padding: 0 2rem 4rem;

	.e-latest {
		color: $green;
		margin-right: 4px;
	}
}
</style>