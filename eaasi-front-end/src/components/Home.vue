<template>
	<div class="home padded">
		<h1>My Dashboard</h1>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
	name: 'Home'
})
export default class Home extends Vue {
}
</script>

<style>
.home {
	padding: 2rem;
}
</style>