<template>
	<form-modal
		class="emulator-modal"
		title="Import New Emulator"
		subtitle="Import emulator from a Docker container registry."
		save-text="Import"
		@close="cancel"
		@save="doImport"
	>
		<div class="emulator-form">
			<text-input
				label="Emulator Name"
				v-model="importRequest.urlString"
				rules="required"
				placeholder="Enter a name..."
			/>

			<text-input
				label="Emulator Tag"
				v-model="importRequest.tag"
				placeholder="Enter a tag..."
			/>

			<text-input
				label="Emulator Alias"
				v-model="importRequest.alias"
				placeholder="Enter an alias..."
			/>
		</div>
	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import { ITaskState } from '@/types/Task';

@Component({
	name: 'EmulatorModal'
})
export default class EmulatorImportModal extends Vue {

	/* Data
	============================================*/

	importRequest: EmulatorImportRequest = new EmulatorImportRequest();

	/* Methods
	============================================*/

	cancel() {
		this.$emit('close');
	}

	/**
	 * Sends initial import request and registers new task
	 */
	async doImport() {
		let task = await this.$store.dispatch('admin/importEmulator', this.importRequest) as ITaskState;
		if(!task) return;
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
}
</style>