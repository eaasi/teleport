<template>
	<form-modal
		class="harvester-modal"
		:title="modalTitle"
		:save-text="saveText"
		:has-remove-button="hasRemoveButton"
		remove-text="Remove endpoint"
		v-if="showModal"
		@close="$emit('close')"
		@save="saveEndpoint"
		@remove="removeEndpoint"
	>
		<div class="harvester-form">
			<text-input
				label="Endpoint Name"
				v-model="endpointName"
				:rules="validateName"
				required
				placeholder="Enter a name..."
			/>
			<text-input
				label="API Key"
				v-model="secret"
				required
				placeholder="Enter API key"
			/>
			<text-input
				label="Host Location"
				v-model="endpointUrl"
				rules="required|url"
				required
				placeholder="Enter a URL..."
			/>
			<alert card class="ah-error" type="error" v-if="error">
				{{ error }}
			</alert>
		</div>
	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AddHarvesterRequest from '@/models/eaas/oaipmh/AddHarvesterRequest';
import { createJwt } from '@/utils/functions';
import { ACTION_TYPE } from '@/utils/constants';
import { uniq } from 'lodash';

@Component({
	name: 'HarvesterDetailsModal'
})
export default class HarvesterDetailsModal extends Vue {

	/* Props
	===========================================*/
	@Prop({type: String, required: true})
	actionType: string;

	@Prop({type: String, required: false})
	harvester: string;

	/* Data
	===========================================*/

	readonly regexpToValidateName: RegExp = /^[a-z0-9]+(-[a-z0-9]+)*$/;
	endpointName: string = '';
	endpointUrl: string = '';
	secret: string = '';
	error: string = null;
	loading: boolean = false;
	originalName: string = null;

	/* Methods
	============================================*/

	get modalTitle() {
		return `${this.actionType} OAI-PMH Endpoint`;
	}

	get saveText() {
		switch (this.actionType) {
			case ACTION_TYPE.EDIT:
				return 'Save Endpoint';
			case ACTION_TYPE.ADD:
				return 'Add Endpoint';
			default:
				return '';
		}
	}

	get hasRemoveButton() {
		return this.actionType === ACTION_TYPE.EDIT;
	}

	get showModal() {
		return !(this.actionType === ACTION_TYPE.EDIT && !this.endpointName);

	}

	validateName(value: string) {
		if (!value) {
			return 'This field is required.';
		}
		if (!this.regexpToValidateName.test(value)) {
			return 'Endpoint name is invalid.';
		}
		return null;
	}

	async saveEndpoint() {
		let vm = this;
		try {
			if(vm.endpointUrl.indexOf('://') === -1) {
				vm.endpointUrl = 'http://' + vm.endpointUrl;
			}
			const options: any = {};
			if (this.secret) {
				options.headers = {
					authorization: 'Bearer ' + createJwt(this.secret)
				};
			}
			let res = await fetch(vm.endpointUrl, options);
			if(!res.ok) {
				return;
			}
			let syncTypes = await res.json() as string[];
			if(!Array.isArray(syncTypes) || !syncTypes.length) {
				vm.error = 'Invalid endpoint URL. Please try again.';
				return;
			}
			let request = new AddHarvesterRequest(vm.endpointName, vm.endpointUrl, syncTypes, this.secret);
			let result = this.actionType === ACTION_TYPE.ADD ? await vm.$store.dispatch('admin/addHarvester', request) :
				await vm.$store.dispatch('admin/updateHarvester', { name: this.originalName, req: request });
			if(result) vm.$emit('close');
		} catch(e) {
			vm.error = `There was an error ${this.actionType === ACTION_TYPE.ADD ? 'adding' : 'updating'} this endpoint. Please check your URL and try again.`;
		}
	}

	async removeEndpoint() {
		await this.$store.dispatch('admin/deleteHarvester', this.endpointName);
		this.$emit('close');
	}

	/* Lifecycle Hooks
	============================================*/

	async created() {
		if (this.actionType === ACTION_TYPE.EDIT && this.harvester) {
			let result = await this.$store.dispatch('admin/getHarvester', this.harvester);
			this.originalName = result.name;
			this.endpointName = result.name;
			this.secret = result.streams[0].source.secret;
			let urls = result.streams.map(stream => stream.source.url);
			while (uniq(urls).length !== 1) {
				urls = urls.map(url => url.replace(/\/[^\/]*$/, ''));
			}
			this.endpointUrl = uniq(urls)[0] as string;
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