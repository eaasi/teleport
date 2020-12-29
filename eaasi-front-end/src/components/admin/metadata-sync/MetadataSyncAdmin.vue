<template>
	<div id="harvesterManagement">
		<div class="harvester-search padded-xl">
			<div class="container-xs">
				<div class="flex-row justify-between">
					<h1>Node Endpoints</h1>
					<ui-button class="mb" @click="addHarvester">
						Add New Endpoint
					</ui-button>
				</div>
				<search-bar
					:border-color="$colors.lightNeutral"
					placeholder="Enter a Harvester name"
					:value="keyword"
					@input="search"
				/>
			</div>
			<div class="provider-info">
				<p v-if="providerUrl"><span class="medium">Provider URL:</span> {{ providerUrl }}</p>
				<p v-if="apiKey"><span class="medium">API Key:</span> {{ apiKey }}</p>
			</div>
		</div>
		<div class="padded-xl container-xs" v-if="list">
			<pagination
				:total-results="result.length"
				:results-per-page="result.length"
				:page-num="1"
				class="harvester-pagination"
			/>
			<harvester-list
				:list="result"
				v-if="result.length"
			/>
		</div>
		<add-harvester-modal
			v-if="showAddModal"
			@close="showAddModal = false"
		/>
	</div>
</template>

<script lang="ts">
import AdminScreen from '../AdminScreen.vue';
import { Component } from 'vue-property-decorator';
import HarvesterList from './HarvesterList.vue';
import AddHarvesterModal from './AddHarvesterModal.vue';
import { Get } from 'vuex-pathify';
import config from '@/config/index';

@Component({
	name: 'EmulatorManagement',
	components: {
		HarvesterList,
		AddHarvesterModal
	}
})
export default class EmulatorManagement extends AdminScreen {

	/* Computed
	============================================*/

	@Get('admin/harvesters')
	list: string[]

	@Get('admin/apiKey')
	readonly apiKey: string;

	get result() {
		if(!this.list || !this.list.length) return [];
		let q = this.keyword.toLowerCase();
		return this.list.filter(x => x.toLowerCase().indexOf(q) > -1);
	}

	/* Data
	============================================*/

	keyword: string = '';
	showAddModal: boolean = false;
	readonly providerUrl: string = `${config.BASE_URL}/oaipmh/providers`;


	/* Methods
	============================================*/

	addHarvester() {
		this.showAddModal = true;
	}

	search(keyword) {
		this.keyword = keyword;
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.$store.dispatch('admin/getHarvesters');
		this.$store.dispatch('admin/getApiKey');
	}
}
</script>

<style lang="scss">
.harvester-search {
	background-color: lighten($light-neutral, 60%);
	padding-bottom: 2.5rem;

	h1 {
		font-size: 1.8rem;
	}

	.provider-info {
		margin-top: 2rem;

		p {
			margin-top: 1rem;
			&:first-of-type {
				margin: 0;
			}
		}
	}
}
</style>