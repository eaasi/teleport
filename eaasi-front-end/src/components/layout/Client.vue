<template>
	<div class="client-wrapper">
		<h1>Information</h1>
		<div v-if="error">
			<p style="color: red;">Error: {{ error.message }}</p>
		</div>
		<div v-else-if="buildVersion">
			<p>build version: {{ buildVersion }}</p>
		</div>
		<div v-else>
			<p>loading...</p>
		</div>
	</div>
</template>

<script lang="ts">
import { createClientV1 } from 'eaasi-sdk-ts';

export default {
	name: 'ClientBuildInfo',
	data() {
		return {
			buildVersion: null,
			error: null,
		};
	},
	methods: {
		async fetchBuildInfo() {
			try {
				const client = createClientV1({ baseUrl: 'https://localhost:8080/api/v1' });
				console.log('client', client);
				const { data, error: apiError } = await client.GET('/admin/build-info');

				if (apiError) {
					console.log('apiError', apiError);
					this.error = new Error(apiError.message || 'apiError');
					return;
				}

				if (data) {
					console.log('data', data);
					this.buildVersion = data.build?.version || 'no version';
				}
			} catch (err) {
				this.error = err;
			}
		},
	},
	mounted() {
		this.fetchBuildInfo();
	},
};
</script>

<style lang="scss">
.client-wrapper {

}
</style>