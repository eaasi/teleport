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
					placeholder="Enter a name or email address"
					v-model="query.keyword"
				/>
			</div>
		</div>
		<div class="padded-xl container-xs" v-if="result">
			<pagination
				:total-results="result.totalResults"
				:results-per-page="query.limit"
				:page-num="query.page"
				@paginate="paginate"
				class="user-pagination"
			/>
			<emulator-list
				:list="result.result"
				:query="query"
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

	@Get('admin/emulatorsResult')
	result: IEaasiSearchResponse<IEmulator>

	@Sync('admin/emulatorsQuery')
	query: IEaasiSearchQuery

	/* Methods
	============================================*/

	addEmulator() {
		this.activeEmulator = new Emulator();
	}

	paginate(page) {
		this.query.page = page;
	}

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		if(!this.result) {
			this.$store.dispatch('admin/getEmulators');
		}
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