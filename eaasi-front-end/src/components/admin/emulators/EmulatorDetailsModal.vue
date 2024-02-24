<template>
	<info-modal
		class="emulator-modal"
		:title="title"
		subtitle="Manage emulator images and view details"
		@close="$emit('close')"
	>
		<div class="emulator-images">
			<table class="eaasi-table">
				<caption>Available Emulators</caption>
				<thead>
					<tr>
						<th scope="col">Emulator Alias</th>
						<th scope="col">Emulator Source</th>
						<th scope="col" style="width: 95px;">Emulator Tag</th>
						<th scope="col" style="width: 220px;"></th>
						<th scope="col" style="width: 30px;" v-if="hasMultipleImages">Default</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="e in emulator.entries" :key="e.image.id">
						<td>{{ e.version }}</td>
						<td>{{ e.provenance.url }}</td>
						<td class="nb">
							<span v-if="isLatest(e)" class="e-latest">
								<span class="fas fa-check-circle"></span>
							</span>
							<span>{{ e.provenance.tag }}</span>
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
import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import EaasiTask from '@/models/task/EaasiTask';
import { ITaskState } from '../../../types/Task';

@Component({
	name: 'EmulatorDetailsModal'
})
export default class EmulatorModal extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IEmulator, required: true})
	readonly emulator: IEmulator;

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
			.filter(x => e.provenance.url === x.provenance.url);
		return !otherVersions.find(x => this.isLatest(x));
	}

	/**
	 * Determines if an emulator entry is the latest version
	 */
	isLatest(e: IEmulatorEntry) {
		return e.provenance.tag === 'latest';
	}

	/**
	 * Determines if an emulator entry is the default version
	 */
	isDefault(e: IEmulatorEntry) {
		return !!e.tags?.includes('default');
	}

	async makeDefault(entry: IEmulatorEntry) {
		// Assume this will succeed and update the checkbox immediately
		let previousDefault = this.setDefaultTagToEntry(entry.id);
		let success = await this.$store.dispatch('admin/setDefaultEmulatorVersion', entry.id);
		if(success) {
			// Refresh the latest emulator list
			this.$store.dispatch('admin/getEmulators');
		} else {
			// If first call failed, revert to previous version
			this.setDefaultTagToEntry(previousDefault);
		}
	}

	setDefaultTagToEntry(id) {
		let previousDefault;
		this.emulator.entries = this.emulator.entries.map(e => {
			let newTags = e.tags ? [...e.tags] : [];
			if (this.isDefault(e)) {
				previousDefault = e.id;
				newTags = newTags.filter(tag => tag !== 'default');
			}
			if (e.id === id) {
				newTags.push('default');
			}
			return {
				...e,
				tags: newTags
			};
		});
		return id;
	}

	async updateImage(entry: IEmulatorEntry) {
		let request = new EmulatorImportRequest();
		request.urlString = entry.provenance.url;
		request.tag = entry.provenance.tag;
		request.update = true;
		const task = await this.$store.dispatch('admin/importEmulator', request) as EaasiTask;
		if(!task) return;
		const taskWithDescription: ITaskState = {
			...task,
			description: `Import Emulator: ${entry.provenance.url}:${entry.provenance.tag}`
		};
		await this.$store.dispatch('task/addTaskToQueue', taskWithDescription);
		this.$store.commit('SET_ACTIVE_TASK', task);
		this.$emit('close');
	}

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

	.eaasi-form-control {
		margin-bottom: 0;
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