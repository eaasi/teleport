<template>
	<div class="home">
		<h1>(Eaasi Goes Here)</h1>
		<eaasi-button @click="showModal = true">
			Show Modal
		</eaasi-button>
		<eaasi-button secondary icon="home" @click="clickedButton">
			Button Text
		</eaasi-button>
		<options-box header="Optional Header">
			Hello! I am options box
		</options-box>
		<eaasi-tabs
			:tabs="tabs"
			v-model="activeTab"
		/>
		<eaasi-loader v-model="toggleOn" v-if="false" />
		<pagination
			:total-results="200"
			:page-num="pageNum"
			@paginate="(p) => pageNum = p"
		/>
		<modal size="md" @close="showModal = false" :show="showModal">
			<h3>Testing!</h3>
		</modal>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IEaasiTab } from '@/types/Navigation';
import Modal from '@/components/global/Modal.vue';
import EaasiButton from '@/components/global/EaasiButton.vue';
import EaasiTabs from '@/components/global/EaasiTabs.vue';
import EaasiLoader from '@/components/global/EaasiLoader.vue';
import OptionsBox from '@/components/global/OptionsBox.vue';
import Pagination from '@/components/global/Pagination.vue';
@Component({
	components: {
		EaasiButton,
		EaasiLoader,
		EaasiTabs,
		OptionsBox,
		Pagination,
		Modal
	}
})
export default class Home extends Vue {
	clickedButton() : void {
		console.log('Button was clicked!');
	}

	activeTab: string = 'Tab Option 1';
	toggleOn: boolean = false;
	pageNum: number = 1;
	showModal: boolean = false;

	tabs: Array<IEaasiTab> = [
		{
			label: 'Tab Option 1',
			icon: null
		},
		{
			label: 'Tab Option 2',
			icon: null
		},
		{
			label: 'Tab Option 3',
			icon: null
		}
	]
}
</script>

<style>
.home {
	padding: 2rem;
}
</style>
