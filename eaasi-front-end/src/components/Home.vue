<template>
	<div class="home padded">
		<h1>My Dashboard</h1>
		<button @click="makeError">Make Error</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BigButton from '@/components/global/BigButton.vue';

@Component({
	components: {BigButton}
})
export default class Home extends Vue {
	makeError() {
		foo = 'bar';
	}
}
</script>

<style>
.home {
	padding: 2rem;
}
</style>