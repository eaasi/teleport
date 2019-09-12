<template>
	<form-modal
		class="emulator-modal"
		:title="title"
		:subtitle="subtitle"
		@close="$emit('close')"
		@save="save"
	>
		<div class="emulator-form" v-if="isNew">
			<text-input
				label="Emulator Name"
				v-model="emulator.name"
				rules="required"
				placeholder="Enter a name..."
			/>

			<text-input
				label="Emulator Tag"
				v-model="emulator.name"
				placeholder="Enter a tag..."
			/>

			<text-input
				label="Emulator Alias"
				v-model="emulator.name"
				placeholder="Enter an alias..."
			/>
		</div>

		<div class="emulator-images" v-if="!isNew">
			<table class="eaasi-table">
				<thead>
					<th>User Version</th>
					<th>OCI Source URL</th>
					<th>Docker Tag</th>
					<th></th>
					<th>Default</th>
				</thead>
				<tbody>
					<tr v-for="e in emulator.entries" :key="e.image.id">
						<td>{{ e.version }}</td>
						<td>{{ e.provenance.ociSourceUrl }}</td>
						<td>{{ e.provenance.versionTag }}</td>
						<td></td>
						<td>
							<checkbox />
						</td>
					</tr>
				</tbody>
			</table>
		</div>

	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiUser, IEaasiRole, IEmulator } from 'eaasi-admin';
import { Get } from 'vuex-pathify';

@Component({
	name: 'EmulatorModal'
})
export default class EmulatorModal extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IEmulator, required: true})
	readonly emulator: IEmulator

	get subtitle() {
		return this.isNew
			? 'Import emulator from a Docker container registry.'
			: 'Manage emulator images and view details';
	}

	get title() {
		return this.isNew
			? 'Import New Emulator'
			: `${this.emulator.name.toUpperCase()} Images`;
	}

	get isNew() {
		return !this.emulator.id;
	}

	/* Methods
	============================================*/

	async save() {
		// TODO
		this.$store.dispatch('admin/getEmulators');
		this.$emit('close');
	}

}

</script>

<style lang="scss">

.emulator-info {
	margin: 0 auto;
	max-width: 60rem;
	padding: 2rem 0 4rem;
}
</style>