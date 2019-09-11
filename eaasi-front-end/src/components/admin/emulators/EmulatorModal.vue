<template>
	<form-modal
		class="emulator-modal"
		title="Add New Emulator"
		subtitle="Import emulator from a Docker container registry."
		@close="$emit('close')"
		@save="save"
	>
		<div class="emulator-info">
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