<template>
	<div id="emulatorManagement">
		<div class="emulator-search padded-xl">
			<div class="container-xs">
				<div class="flex-row justify-between">
					<h1>Emulators</h1>
					<ui-button class="mb" @click="addEmulator">
						Import Emulator
					</ui-button>
				</div>
				<search-bar
					:border-color="$colors.lightNeutral"
					placeholder="Enter an emulator name..."
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
				class="user-pagination"
			/>
			<emulator-list
				:list="result"
				v-if="result.length"
				@click:row="showDetails"
			/>
		</div>
		<emulator-modal
			:emulator="activeEmulator"
			v-if="activeEmulator"
			@close="activeEmulator = null"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminScreen from '../AdminScreen.vue';
import { Component, Prop } from 'vue-property-decorator';
import Emulator from '@/models/admin/Emulator';
import EmulatorList from './EmulatorList.vue';
import EmulatorModal from './EmulatorModal.vue';
import { Get, Sync } from 'vuex-pathify';
import { IEmulator } from 'eaasi-admin';
import { IEaasiSearchResponse, IEaasiSearchQuery } from 'eaasi-http';

@Component({
	name: 'EmulatorManagement',
	components: {
		EmulatorList,
		EmulatorModal
	}
})
export default class EmulatorManagement extends AdminScreen {

	/* Computed
	============================================*/

	@Sync('admin/activeEmulator')
	activeEmulator: IEmulator

	@Get('admin/emulators')
	list: IEmulator[]

	get result() {
		if(!this.list || !this.list.length) return [];
		return this.list.filter(x => x.name.indexOf(this.keyword) > -1);
	}

	/* Data
	============================================*/

	keyword: string = '';


	/* Methods
	============================================*/

	addEmulator() {
		this.activeEmulator = new Emulator();
	}

	search(keyword) {
		this.keyword = keyword;
	}

	showDetails(emulator) {
		this.activeEmulator = emulator;
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.$store.dispatch('admin/getEmulators');
	}

}

</script>

<style lang="scss">
.emulator-search {
	background-color: lighten($light-neutral, 60%);
	padding-bottom: 2.5rem;

	h1 {
		font-size: 1.8rem;
	}
}
</style>