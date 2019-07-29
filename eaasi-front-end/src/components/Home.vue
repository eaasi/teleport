<template>
	<div class="home">
		<h1>(Eaasi Goes Here)</h1>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IEaasiTab } from '@/types/Navigation';

@Component
export default class Home extends Vue {}
</script>

<style>
.home {
	padding: 2rem;
}
</style>
