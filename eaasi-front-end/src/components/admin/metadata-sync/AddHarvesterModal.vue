<template>
	<form-modal
		class="harvester-modal"
		title="Add OAI-PMH Endpoint"
		save-text="Add Endpoint"
		@close="$emit('close')"
		@save="addEndpoint"
	>
		<div class="harvester-form">
			<text-input
				label="Endpoint Name"
				v-model="endpointName"
				rules="required"
				placeholder="Enter a name..."
			/>

			<text-input
				label="Host Location"
				v-model="endpointUrl"
				rules="required|url"
				placeholder="Enter a URL..."
			/>
			<alert-card class="ah-error" type="error" v-if="error">
				{{ error }}
			</alert-card>
		</div>
	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AddHarvesterRequest from '@/models/eaas/oaipmh/AddHarvesterRequest';

@Component({
	name: 'AddHarvesterModal'
})
export default class AddHarvesterModal extends Vue {

	/* Data
	===========================================*/

	endpointName: string = '';
	endpointUrl: string = '';
	error: string = null;
	loading: boolean = false;

	/* Methods
	============================================*/

	async addEndpoint() {
		let vm = this;
		try {
			if(vm.endpointUrl.indexOf('://') === -1) {
				vm.endpointUrl = 'http://' + vm.endpointUrl;
			}
			let res = await fetch(vm.endpointUrl);
			if(!res.ok) return false;
			let syncTypes = await res.json() as string[];
			if(!Array.isArray(syncTypes) || !syncTypes.length) {
				vm.error = 'Invalid endpoint URL. Please try again.';
				return;
			}
			let request = new AddHarvesterRequest(vm.endpointName, vm.endpointUrl, syncTypes);
			let result = await vm.$store.dispatch('admin/addHarvester', request);
			if(result) vm.$emit('close');
		} catch(e) {
			vm.error = 'There was an error adding this endpoint. Please check your URL and try again.';
		}
	}

}

</script>

<style lang="scss">
.harvester-form {
	margin: 0 auto 2rem;
	max-width: 70rem;
	padding: 3rem 0 0rem;

	.ei-importing {
		font-size: 10rem;
		text-align: center;

		span {
			display: block;
			font-size: 3rem;
		}
	}

	.card-container {
		max-width: none;
		width: 100%;
	}
}
</style>