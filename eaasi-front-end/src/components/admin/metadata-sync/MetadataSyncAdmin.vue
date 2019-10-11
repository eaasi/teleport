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
					placeholder="Enter an harvester name..."
					:value="keyword"
					@input="search"
				/>
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
import Vue from 'vue';
import AdminScreen from '../AdminScreen.vue';
import { Component, Prop } from 'vue-property-decorator';
import Emulator from '@/models/admin/Emulator';
import HarvesterList from './HarvesterList.vue';
import AddHarvesterModal from './AddHarvesterModal.vue';
import EmulatorImportModal from './EmulatorImportModal.vue';
import { Get, Sync } from 'vuex-pathify';
import { IEmulator } from 'eaasi-admin';
import { IEaasiSearchResponse, IEaasiSearchQuery } from '@/types/Search';

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

	get result() {
		if(!this.list || !this.list.length) return [];
		let q = this.keyword.toLowerCase();
		return this.list.filter(x => x.toLowerCase().indexOf(q) > -1);
	}

	/* Data
	============================================*/

	keyword: string = '';
	showAddModal: boolean = true;


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
}
</style>