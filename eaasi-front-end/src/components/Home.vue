<template>
	<div class="home">
		<h1>(Eaasi Goes Here)</h1>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IEaasiTab } from '@/types/Navigation';

@Component({
	components: {

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
